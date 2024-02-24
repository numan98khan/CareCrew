import React, { useState } from "react";

const Toggle = ({ label, isChecked, onToggle }) => {
  const [initialChecked, setIsChecked] = useState(isChecked);

  const toggle = () => {
    if (onToggle) {
      const newCheckedState = !initialChecked;
      setIsChecked(newCheckedState);

      onToggle(newCheckedState);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={initialChecked}
          onChange={toggle}
        />
        <div
          className={`w-9 h-4 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors ${
            isChecked ? "bg-green" : ""
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 h-3 w-3 bg-white rounded-full transform transition-transform ${
            isChecked ? "translate-x-5" : ""
          }`}
        />
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
};

export default Toggle;
