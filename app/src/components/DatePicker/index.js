import React, { useRef, useEffect } from "react";

function DatePickerCustom({ date, onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (date === null || date === undefined) {
      inputRef.current.value = ""; // directly reset the input value
    }
  }, [date]);

  const handleDateChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        ref={inputRef}
        className={`bg-PRIMARY_NEUTEAL_COLOR border-2 border-PRIMARY_NEUTRAL_COLOR rounded-full w-full py-3 px-4 text-xs text-grey leading-tight focus:outline-none focus:shadow-outline`}
        type="date"
        style={{ backgroundColor: "#F3FAFD" }}
        value={date || ""}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DatePickerCustom;
