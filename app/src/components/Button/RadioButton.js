import React from "react";
import theme from "../../styles/theme.styles";

const RadioButton = ({ children, checked, onChange, value, disabled }) => {
  return (
    <label
      className={`flex items-center cursor-pointer ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <div className="relative">
        <input
          type="radio"
          className="sr-only"
          name="yes-no"
          checked={checked}
          onChange={disabled ? null : onChange} // Disable onChange if the RadioButton is disabled
          value={value}
          disabled={disabled} // Set the disabled attribute on the input element
        />
        <div
          className={`w-6 h-6 border ${
            disabled ? "border-GRAY_COLOR" : "border-PRIMARY_LIGHT_COLOR"
          } bg-transparent rounded-full shadow-inner items-center flex flex-col justify-center`}
        >
          <div
            className={`absolute w-3 h-3 bg-PRIMARY_LIGHT_COLOR rounded-full shadow scale-0 ${
              checked ? "scale-100  " : ""
            } transition-transform duration-200 ease-out`}
          ></div>
        </div>
      </div>
      <span className="text-xs ml-2 text-RADIO_LABEL_COLOR">{children}</span>
    </label>
  );
};

export default RadioButton;
