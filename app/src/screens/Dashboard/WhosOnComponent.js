import React, { useEffect, useRef, useState } from "react";
import themeStyles from "../../styles/theme.styles";
import { displayTime } from "../../services/micro";
import Avatar from "../../components/Avatar";
// import themeStyles from "../../styles/theme.styles";

// Utility function to convert time (HH:MM) to a decimal hour (HH.MM)
const timeToDecimal = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours + minutes / 60;
};

const WhosOnComponent = ({ shifts }) => {
  console.log("🚀 ~ WhosOnComponent ~ shifts:", shifts);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const timelineRef = useRef(null); // Ref for the timeline container

  // Update timeline width on mount and when window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth);
      }
    };

    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth); // Adjust on resize

    return () => window.removeEventListener("resize", updateWidth); // Clean up
  }, []);

  // 24 hours in the schedule
  const hours = Array.from(new Array(24), (_, index) => `${index}:00`);

  // const now = new Date("2024-03-25T23:13:30.173Z"); // Current time
  const now = new Date(); // Current time

  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%]"></div>
        <div className="flex flex-col w-[80%]">
          <div ref={timelineRef} className="flex overflow-x-auto">
            {hours?.map((hour, index) => (
              <div
                key={index}
                className="flex-1 text-center"
                style={{ fontSize: 10 }}
              >
                {hour}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row ">
        <div className="flex flex-col w-[20%]">
          {shifts?.map((shift, index) => {
            return (
              <div
                key={shift.id}
                className=" text-black  text-[9px] m-[1.5px] py-2  rounded-full border"
                style={{
                  textAlign: "center",
                }}
              >
                {/* <Avatar /> */}
                <div className="text-gray-500">
                  {shift?.person?.firstName + " " + shift?.person?.lastName}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col w-[80%]">
          <div>
            {shifts?.map((shift, index) => {
              const startTimeDecimal = timeToDecimal(
                new Date(shift?.shift?.shiftStartDT)
              );
              const endTimeDecimal = timeToDecimal(
                new Date(shift?.shift?.shiftEndDT)
              );

              const clockInTimeDecimal = timeToDecimal(
                new Date(shift?.clockInTime)
              );
              const clockOutTimeDecimal = timeToDecimal(
                new Date(shift?.clockOutTime)
              );

              const nowDecimal = timeToDecimal(now);
              const duration = endTimeDecimal - startTimeDecimal;
              const overlayWidth =
                (shift?.clockOutTime ? clockOutTimeDecimal : nowDecimal) -
                clockInTimeDecimal;
              const shiftWidth = (duration / 24) * timelineWidth;
              const shiftStart =
                (startTimeDecimal + 0.5) * (timelineWidth / 24);

              const shiftClockInStart =
                (clockInTimeDecimal + 0.5) * (timelineWidth / 24);

              return shift?.clockInTime ? (
                <div
                  key={shift.id}
                  className=" text-white rounded-full text-[9px] m-1 py-0"
                  style={{
                    left: `${shiftStart}px`,
                    width: `${shiftWidth}px`,
                    marginLeft: `${shiftStart}px`,
                    textAlign: "center",
                    // height: "40px",
                    // opacity
                    backgroundColor: themeStyles?.PRIMARY_LIGHT_COLOR + "51",
                  }}
                >
                  <div
                    className="rounded-full py-[1.3vh] m-0 h-full text-center text-[9px] font-medium leading-none text-white truncate"
                    style={{
                      width: `${(overlayWidth / duration) * 100}%`,
                      marginLeft: `${shiftClockInStart - shiftStart}px`,
                      backgroundColor: themeStyles?.GREEN,
                      // opacity: 0.4
                      color: themeStyles?.PRIMARY_COLOR + "91",
                    }}
                  >
                    {/* {(overlayWidth / duration) * 100}% */}
                    {displayTime(shift?.clockInTime)}
                  </div>
                </div>
              ) : (
                <div
                  key={shift.id}
                  className=" text-white rounded-full text-[9px] m-1 py-2"
                  style={{
                    left: `${shiftStart}px`,
                    width: `${shiftWidth}px`,
                    marginLeft: `${shiftStart}px`,

                    textAlign: "center",

                    // height: "40px",
                    // opacity
                    backgroundColor: themeStyles?.PRIMARY_LIGHT_COLOR + "51",
                  }}
                >
                  <div
                    className="relative rounded-full z-50"
                    style={{
                      // opacity: 0.4
                      color: themeStyles?.PRIMARY_COLOR + "91",
                    }}
                  >
                    {displayTime(shift?.shift?.shiftStartDT)} -{" "}
                    {displayTime(shift?.shift?.shiftEndDT)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhosOnComponent;
