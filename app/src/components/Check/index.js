import React from "react";
import theme from "../../styles/theme.styles";
import CheckIcon from "../../assets/icons/check";

const CheckBox = ({ id, label, value, onChange, color }) => {
  return (
    <label
      className={`flex items-center ${!label && "justify-center"}`}
      // onClick={(e) => {
      //   // e.stopPropagation();
      //   onChange(!value);
      // }}
    >
      <input
        type="checkbox"
        // id={id}
        // checked={value}
        // onChange={(val, e) => {
        //   onChange(val, e);
        // }}

        onChange={(e) => {
          // const isChecked = e.target.checked;
          onChange(e);
        }}
        className="hidden" // Hide the default checkbox
      />
      <div
        className={`flex rounded-full w-5 h-5 border border-PRIMARY_LIGHT_COLOR justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`}
        style={{
          backgroundColor: color
            ? color
            : value
            ? theme.PRIMARY_LIGHT_COLOR
            : theme.PRIMARY_NEUTRAL_COLOR,
          borderColor: color,
        }}
      >
        {value ? <CheckIcon className="self-center" /> : null}
      </div>

      {label ? <div className="m-1" /> : null}
      <span className={`text-sm text-gray-500 ${label && "ml-2"}`}>
        {label}
      </span>
    </label>
  );
};

export default CheckBox;
