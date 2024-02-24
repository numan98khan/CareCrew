import React, { useState } from "react";

function TimePickerCustom({ time, onChange, disabled }) {
  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    // convert to "HH:mm:ss.sssZ" format
    const awsTime = `${timeValue}:00.000Z`;
    onChange(awsTime);
  };

  const formattedTime = time
    ? `${time.split(":")[0]}:${time.split(":")[1]}`
    : "";

  return (
    <div className="flex items-center justify-center flex-1">
      <input
        className="bg-PRIMARY_NEUTRAL_COLOR border-2 border-PRIMARY_NEUTRAL_COLOR rounded-full w-full py-3 px-4 text-xs text-grey leading-tight focus:outline-none focus:shadow-outline"
        type="time"
        value={formattedTime ? formattedTime : null} // If time is null or undefined, this will be an empty string
        onChange={handleTimeChange}
        style={{ backgroundColor: "#F3FAFD" }}
        disabled={disabled}
      />
    </div>
  );
}

export default TimePickerCustom;

// import React, { useState } from "react";

// function TimePickerCustom({ time, onChange }) {
//   const handleTimeChange = (e) => {
//     const timeValue = e.target.value;
//     // convert to "HH:mm:ss.sssZ" format
//     const awsTime = `${timeValue}:00.000Z`;
//     onChange(awsTime);
//   };

//   return (
//     <div className="flex items-center justify-center flex-1">
//       <input
//         className={`"bg-PRIMARY_NEUTRAL_COLOR border-2 border-PRIMARY_NEUTRAL_COLOR rounded-full w-full py-3 px-4 text-xs text-grey leading-tight focus:outline-none focus:shadow-outline `}
//         type="time"
//         // value={time ? time.split(":")[0] + ":" + time.split(":")[1] : null} // Return just the "HH:mm" part for display
//         value={time} // Return just the "HH:mm" part for display
//         onChange={handleTimeChange}
//         style={{ backgroundColor: "#F3FAFD" }}
//       />
//     </div>
//   );
// }

// export default TimePickerCustom;
