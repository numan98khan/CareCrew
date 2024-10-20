import React, { useEffect, useRef, useState } from "react";
import themeStyles from "../../styles/theme.styles";
import { displayTime } from "../../services/micro";

// Utility function to convert Date object to decimal hours (e.g., 14.5 for 2:30 PM)
const timeToDecimal = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours + minutes / 60;
};

const WhosOnComponent = ({ shifts }) => {
  const [timelineWidth, setTimelineWidth] = useState(0);
  const timelineRef = useRef(null);

  // Update timeline width on mount and when window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth);
      }
    };

    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth); // Clean up
  }, []);

  // Generate array for 24-hour schedule
  const hours = Array.from({ length: 25 }, (_, index) => `${index}:00`);

  const now = new Date();
  const nowDecimal = timeToDecimal(now);
  const hourlyWidth = timelineWidth / 25;
  const currentTimePosition = (nowDecimal + 0.5) * hourlyWidth;

  // Helper function to process shift data
  const processShift = (shift) => {
    const shiftStartDT = new Date(shift?.shift?.shiftStartDT);
    const shiftEndDT = new Date(shift?.shift?.shiftEndDT);

    const startTimeDecimal = timeToDecimal(shiftStartDT);
    const endTimeDecimal = timeToDecimal(shiftEndDT);

    const desiredClockInDT = new Date(shift.desiredClockInTime);
    const desiredClockOutDT = new Date(shift.desiredClockOutTime);
    const desiredClockInDecimal = timeToDecimal(desiredClockInDT);
    const desiredClockOutDecimal = timeToDecimal(desiredClockOutDT);

    const shiftStartPosition = (startTimeDecimal + 0.5) * hourlyWidth;
    const idealDuration = desiredClockOutDecimal - desiredClockInDecimal;
    const idealShiftWidth = hourlyWidth * idealDuration;

    const shiftData = {
      ...shift,
      startTimeDecimal,
      endTimeDecimal,
      shiftStartPosition,
      desiredClockInDecimal,
      desiredClockOutDecimal,
      idealShiftWidth,
    };

    if (shift.clockInTime) {
      const clockInDT = new Date(shift.clockInTime);
      const clockOutDT = shift.clockOutTime
        ? new Date(shift.clockOutTime)
        : now;
      const clockInDecimal = timeToDecimal(clockInDT);
      const clockOutDecimal = timeToDecimal(clockOutDT);

      const shiftWidth =
        shift.clockOutTime == null
          ? idealShiftWidth
          : hourlyWidth * (clockOutDecimal - startTimeDecimal);

      // const shiftWidth = hourlyWidth * 2;

      const greenWidth =
        hourlyWidth *
        (Math.min(clockOutDecimal, desiredClockOutDecimal) - clockInDecimal);
      const redWidth =
        clockInDecimal > desiredClockInDecimal
          ? hourlyWidth * (clockInDecimal - desiredClockInDecimal)
          : 0;
      const overtimeWidth =
        clockOutDecimal > desiredClockOutDecimal
          ? hourlyWidth * (clockOutDecimal - desiredClockOutDecimal)
          : 0;

      const shiftClockInPosition = (clockInDecimal + 0.5) * hourlyWidth;

      console.log(
        "🚀 ~ processShift ~ idealShiftWidth:",
        desiredClockInDecimal,
        desiredClockOutDecimal,
        idealShiftWidth,
        shiftWidth,
        shift.clockOutTime == null,
        shift
      );

      return {
        ...shiftData,
        clockInDecimal,
        clockOutDecimal,
        shiftWidth,
        greenWidth,
        redWidth,
        overtimeWidth,
        shiftClockInPosition,
      };
    }

    return shiftData;
  };

  // Process shifts data
  const processedShifts = shifts?.map(processShift);

  // Render functions
  const renderClockedInShift = (shiftData) => {
    const {
      id,
      shiftStartPosition,
      shiftWidth,
      greenWidth,
      redWidth,
      overtimeWidth,
      clockInTime,
      clockOutTime,
      desiredClockInTime,
      desiredClockOutTime,
      idealShiftWidth,
    } = shiftData;
    // console.log("🚀 ~ renderClockedInShift ~ shiftData:", shiftData);

    const shiftStyle = {
      width: `${shiftWidth}px`,
      // width: `${shiftWidth || shiftData.idealShiftWidth}px`,
      marginLeft: `${shiftStartPosition}px`,
      textAlign: "center",
      // backgroundColor: `${themeStyles?.PRIMARY_LIGHT_COLOR}51`,
    };

    return (
      <div
        key={id}
        className="flex flex-row text-SECONDARY_COLOR bg-[#FBC02D] text-[9px] m-1 py-0"
        style={shiftStyle}
      >
        {redWidth > 0 && (
          <div
            style={{
              width: `${redWidth}px`,
              backgroundColor: "#D32F2F", // RED
            }}
          />
        )}
        <div
          className="py-[1.3vh] m-0 h-full text-center font-medium leading-none text-white truncate"
          style={{
            width: `${greenWidth}px`,
            backgroundColor: "#388E3C", // GREEN
            // fontSize: 4,
          }}
        >
          {displayTime(
            clockInTime > desiredClockInTime ? clockInTime : desiredClockInTime
          )}
          {clockOutTime == null
            ? " - on going"
            : clockOutTime > desiredClockOutTime
            ? ` - ${displayTime(desiredClockOutTime)}`
            : clockOutTime && ` - ${displayTime(clockOutTime)}`}
        </div>

        {overtimeWidth > 0 && (
          <div
            className="py-[1.3vh] m-0 h-full text-center font-medium leading-none text-white truncate"
            style={{
              width: `${overtimeWidth}px`,
              backgroundColor: themeStyles?.SECONDARY_COLOR, // Overtime
            }}
          >
            {displayTime(clockInTime)}
            {clockOutTime && ` - ${displayTime(clockOutTime)}`}
          </div>
        )}
      </div>
    );
  };

  const renderScheduledShift = (shiftData) => {
    const {
      id,
      shiftStartPosition,
      idealShiftWidth,
      shift,
      desiredClockInTime,
      desiredClockOutTime,
    } = shiftData;
    const now = new Date();

    // console.log(
    //   "🚀 ~ renderScheduledShift ~ desiredClockInTime:",
    //   new Date(desiredClockInTime),
    //   now
    // );

    const shiftStyle = {
      left: `${shiftStartPosition}px`,
      width: `${idealShiftWidth}px`,
      marginLeft: `${shiftStartPosition}px`,
      textAlign: "center",
      backgroundColor:
        now > new Date(desiredClockInTime) ? "#D32F2F" : "#757575", // Gray
    };

    return (
      <div
        key={id}
        className="text-white text-[9px] m-1 py-2"
        style={shiftStyle}
      >
        <div className="relative rounded-full z-50 truncate">
          {now > new Date(desiredClockInTime)
            ? "Shift Not Started!"
            : `${displayTime(shift?.shiftStartDT)} - ${displayTime(
                shift?.shiftEndDT
              )}`}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Time Headers */}
      <div className="flex flex-row">
        <div className="flex flex-col w-[20%]" />
        <div className="flex flex-col w-[80%]">
          <div ref={timelineRef} className="flex overflow-x-auto">
            {hours.map((hour, index) => (
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

      {/* Shifts */}
      <div className="flex flex-row">
        {/* Employee Names */}
        <div className="flex flex-col w-[20%]">
          {shifts?.map((shift) => (
            <div
              key={shift.id}
              className="text-black text-[9px] m-[1.5px] py-2 rounded-full border text-center"
            >
              <div className="text-gray-500">
                {shift?.person?.firstName} {shift?.person?.lastName}
              </div>
            </div>
          ))}
        </div>

        {/* Shift Timelines */}
        <div className="relative flex flex-col w-[80%]">
          {/* Current Time Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: `${currentTimePosition}px`,
              width: "2px",
              borderLeft: "2px dashed",
              borderColor: themeStyles?.SECONDARY_COLOR,
              height: "100%",
              zIndex: 10,
            }}
          />

          {/* Render Shifts */}
          <div>
            {processedShifts.map((shiftData) =>
              shiftData.clockInTime
                ? renderClockedInShift(shiftData)
                : renderScheduledShift(shiftData)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhosOnComponent;
