import React, { useState, useEffect } from "react";

function DatePickerCustom({ startDate, endDate, onChange }) {
  const handleDateChange = (startOrEnd) => (e) => {
    onChange(startOrEnd, e.target.value);
  };

  return (
    <div className="flex items-center justify-center space-x-4 border-2 border-PRIMARY_NEUTRAL_COLOR p-2 rounded">
      <input
        className={`bg-PRIMARY_NEUTEAL_COLOR rounded-full w-full text-xs text-grey leading-tight focus:outline-none focus:shadow-outline`}
        type="date"
        value={startDate}
        onChange={handleDateChange("start")}
        max={endDate} // Ensure start date is not after end date
      />
      <span>-</span>
      <input
        className={`bg-PRIMARY_NEUTEAL_COLOR rounded-full w-full text-xs text-grey leading-tight focus:outline-none focus:shadow-outline`}
        type="date"
        value={endDate}
        onChange={handleDateChange("end")}
        min={startDate} // Ensure end date is not before start date
      />
    </div>
  );
}

export default DatePickerCustom;
