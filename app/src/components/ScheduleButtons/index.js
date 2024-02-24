import React, { useRef } from "react";
import themeStyles from "../../styles/theme.styles";
import { ScaleHover } from "../../styles/animations";

function ScheduleButtons({
  label,
  active,
  setSelectedShiftTimings,
  value,
  setShift,
  id,
}) {
  const buttonRef = useRef(null);

  return (
    <div
      style={{
        height: "43.2px",
        backgroundColor: active
          ? themeStyles.PRIMARY_NEUTRAL_COLOR
          : themeStyles.PRIMARY_LIGHT_COLOR,
        transition: "ease-out 200ms",
        border: `1px solid ${themeStyles.PRIMARY_LIGHT_COLOR}`,
      }}
      className={`relative rounded-full w-full py-3 px-4 text-xs text-gray-700  flex justify-between items-center ${ScaleHover}`}
      ref={buttonRef}
      onClick={() => {
        setSelectedShiftTimings(value);
        setShift(id);
      }}
    >
      <p
        style={{
          color: active ? themeStyles.PRIMARY_LIGHT_COLOR : "white",
          textAlign: "center",
          width: "100%",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default ScheduleButtons;
