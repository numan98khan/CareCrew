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
  const hours = Array.from(new Array(25), (_, index) => `${index}:00`);

  // const now = new Date("2024-03-25T23:13:30.173Z"); // Current time
  const now = new Date(); // Current time

  const nowDecimal = timeToDecimal(now);
  // Calculate current time indicator position
  const currentTimePosition =
    (nowDecimal + 0.5) * (timelineWidth / hours.length);

  return (
    <div className=" flex flex-col bg-white ">
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%]"></div>
        <div className="flex flex-col w-[80%]">
          <div ref={timelineRef} className="flex overflow-x-auto">
            {hours?.map((hour, index) => (
              <div
                key={index}
                className="flex-1 text-center text-gray-400"
                style={{ fontSize: 8 }}
              >
                {hour}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" flex flex-row ">
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
        <div className=" relative flex flex-col w-[80%]">
          {/* Adjusting the top value of the Current Time Indicator to start under the hours indicators */}
          <div
            style={{
              position: "absolute",
              // top: hoursIndicatorHeight, // Position the line under the hours indicators
              bottom: 0,
              left: `${currentTimePosition}px`,
              width: "2px",
              borderLeft: "2px dashed", // Customize as needed
              borderColor: themeStyles?.SECONDARY_COLOR,
              height: "100%",
              zIndex: 10,
            }}
          ></div>
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

              const duration = endTimeDecimal - startTimeDecimal;
              const overlayWidth =
                (shift?.clockOutTime ? clockOutTimeDecimal : nowDecimal) -
                clockInTimeDecimal;
              const shiftWidth = (duration / hours.length) * timelineWidth;

              const widthMulitplier = timelineWidth / hours.length;

              const shiftStart = (startTimeDecimal + 0.5) * widthMulitplier;

              const shiftClockInStart =
                (clockInTimeDecimal + 0.5) * widthMulitplier;

              const shiftClockOutStart = clockOutTimeDecimal * widthMulitplier;

              console.log(
                "🚀 ~ INFO: ",
                shift?.person?.firstName,
                shift?.person?.lastName,
                now > new Date(shift?.shift?.shiftStartDT)
              );

              return shift?.clockInTime ? (
                <div
                  key={shift.id}
                  className="flex flex-row text-white text-[9px] m-1 py-0 "
                  style={{
                    left: `${shiftStart}px`,
                    width: `${shiftWidth}px`,
                    marginLeft: `${shiftStart}px`,
                    textAlign: "center",
                    backgroundColor: themeStyles?.PRIMARY_LIGHT_COLOR + "51",
                  }}
                >
                  {now > new Date(shift?.shift?.shiftStartDT) ? (
                    shift?.clockInTime ? (
                      <div
                        style={{
                          // width: `${(overlayWidth / duration) * 100}%`,
                          width: `${shiftClockInStart - shiftStart}px`,
                          backgroundColor: "#da1e28",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          // width: `${(overlayWidth / duration) * 100}%`,
                          height: "100%",
                          width: `${10}px`,
                          backgroundColor: "#da1e28",
                        }}
                      />
                    )
                  ) : null}
                  <div
                    className="py-[1.3vh] m-0 h-full text-center text-[9px] font-medium leading-none text-white truncate"
                    style={{
                      width: `${(overlayWidth / duration) * 100}%`,
                      // marginLeft: `${shiftClockInStart - shiftStart}px`,
                      // marginLeft: `${shiftClockInStart - shiftStart}px`,
                      backgroundColor: "#198038",

                      color: "#FFF",
                    }}
                  >
                    {displayTime(shift?.clockInTime)}{" "}
                    {shift?.clockOutTime
                      ? " - " + displayTime(shift?.clockInTime)
                      : null}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#f1c21b",
                    }}
                  />
                </div>
              ) : (
                <div
                  key={shift.id}
                  className=" text-white  text-[9px] m-1 py-2"
                  style={{
                    left: `${shiftStart}px`,
                    width: `${shiftWidth}px`,
                    marginLeft: `${shiftStart}px`,
                    textAlign: "center",
                    backgroundColor: themeStyles?.PRIMARY_LIGHT_COLOR + "51",
                  }}
                >
                  <div
                    className="relative rounded-full z-50 truncate"
                    style={{
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
