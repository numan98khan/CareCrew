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
  const widthMultiplier = timelineWidth / hours.length;
  const currentTimePosition = (nowDecimal + 0.5) * widthMultiplier;

  // Process shifts data to compute necessary values for rendering
  const processedShifts = shifts?.map((shift) => {
    const shiftStartDT = new Date(shift?.shift?.shiftStartDT);
    const shiftEndDT = new Date(shift?.shift?.shiftEndDT);

    const startTimeDecimal = timeToDecimal(shiftStartDT);
    const endTimeDecimal = timeToDecimal(shiftEndDT);
    const duration = endTimeDecimal - startTimeDecimal;

    const shiftStartPosition = (startTimeDecimal + 0.5) * widthMultiplier;
    const shiftWidth = (duration / hours.length) * timelineWidth;

    const shiftData = {
      ...shift,
      startTimeDecimal,
      endTimeDecimal,
      duration,
      shiftWidth,
      shiftStartPosition,
    };

    if (shift.clockInTime) {
      const clockInDT = new Date(shift.clockInTime);
      const clockOutDT = shift.clockOutTime
        ? new Date(shift.clockOutTime)
        : now;
      const clockInTimeDecimal = timeToDecimal(clockInDT);
      const clockOutTimeDecimal = timeToDecimal(clockOutDT);
      const overlayWidth = clockOutTimeDecimal - clockInTimeDecimal;
      const shiftClockInStart = (clockInTimeDecimal + 0.5) * widthMultiplier;

      return {
        ...shiftData,
        clockInTimeDecimal,
        clockOutTimeDecimal,
        overlayWidth,
        shiftClockInStart,
      };
    }

    return shiftData;
  });

  const renderClockedInShift = (shiftData) => {
    const {
      id,
      shiftStartPosition,
      shiftWidth,
      overlayWidth,
      shiftClockInStart,
      duration,
    } = shiftData;

    const shiftStyle = {
      left: `${shiftStartPosition}px`,
      width: `${shiftWidth}px`,
      marginLeft: `${shiftStartPosition}px`,
      textAlign: "center",
      backgroundColor: `${themeStyles?.PRIMARY_LIGHT_COLOR}51`,
    };

    const redBlockWidth = `${shiftClockInStart - shiftStartPosition}px`;
    const greenBlockWidth = `${(overlayWidth / duration) * 100}%`;

    return (
      <div
        key={id}
        className="flex flex-row text-white text-[9px] m-1 py-0"
        style={shiftStyle}
      >
        {now > new Date(shiftData?.shift?.shiftStartDT) && (
          <div
            style={{
              width: redBlockWidth,
              backgroundColor: "#D32F2F", // RED
            }}
          />
        )}
        <div
          className="py-[1.3vh] m-0 h-full text-center font-medium leading-none text-white truncate"
          style={{
            width: greenBlockWidth,
            backgroundColor: "#388E3C", // GREEN
          }}
        >
          {displayTime(shiftData?.clockInTime)}
          {shiftData?.clockOutTime &&
            ` - ${displayTime(shiftData?.clockOutTime)}`}
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#FBC02D", // YELLOW
          }}
        />
      </div>
    );
  };

  const renderScheduledShift = (shiftData) => {
    const { id, shiftStartPosition, shiftWidth } = shiftData;

    const shiftStyle = {
      left: `${shiftStartPosition}px`,
      width: `${shiftWidth}px`,
      marginLeft: `${shiftStartPosition}px`,
      textAlign: "center",
      backgroundColor: "#757575", // Gray
    };

    return (
      <div
        key={id}
        className="text-white text-[9px] m-1 py-2"
        style={shiftStyle}
      >
        <div className="relative rounded-full z-50 truncate">
          {displayTime(shiftData?.shift?.shiftStartDT)} -{" "}
          {displayTime(shiftData?.shift?.shiftEndDT)}
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
