import React from "react";

import theme from "../../styles/theme.styles";

import ProcessIcon from "../../assets/icons/process";

const InputField = ({ id, label, value, setValue, color }) => {
  return (
    <div className={`flex items-center ${!label && "justify-center"}`}>
      <div
        className="flex rounded-full w-5 h-5 border justify-center items-center"
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          backgroundColor: color
            ? color
            : value
            ? theme.PRIMARY_LIGHT_COLOR
            : theme.PRIMARY_NEUTRAL_COLOR,
          borderColor: color,
        }}
      >
        {value ? <ProcessIcon color={"#FFF"} className="self-center" /> : null}
      </div>

      {label ? <div className="m-1" /> : null}
      <label
        className={`text-sm text-gray-500 ${label && "ml-2"}`}
        htmlFor="password"
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
