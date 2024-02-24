import React from "react";
import theme from "../../styles/theme.styles";
import CheckIcon from "../../assets/icons/check";
import { MainHover } from "../../styles/animations";

const InputField = ({ id, text, isSelected, onClick, disabled, color }) => {
  return (
    <div className="flex items-center ">
      <div
        className={`flex rounded-full w-5 h-5 justify-center items-center ${MainHover}
        ${
          isSelected ? "bg-PRIMARY_LIGHT_COLOR" : color ? color : "bg-lightGrey"
        }
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${disabled ? "opacity-30" : ""}`}
        id={id}
        style={{ margin: 2 }}
        onClick={!disabled ? onClick : null}
      >
        <div className={`${isSelected || color ? "text-white" : ""} text-xxs`}>
          {text}
        </div>
        {/* {value ? <CheckIcon className="self-center" /> : null} */}
      </div>
    </div>
  );
};

export default InputField;
