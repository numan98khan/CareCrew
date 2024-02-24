import React from "react";
import theme from "../../styles/theme.styles";

import { MainHover } from "../../styles/animations";

const Button = ({
  type,
  text,
  onClick,
  color,
  icon,
  height,
  width,
  fontSize,
}) => {
  return (
    <button
      // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      className={`flex rounded-full w-full py-2 px-4 items-center justify-center text-xs font-semibold ${MainHover}`}
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: color ? color : theme.PRIMARY_LIGHT_COLOR,
        height,
        width,
        color: "#fff",
        fontSize,
      }}
    >
      {icon}

      {icon ? <div className="mx-1" /> : null}
      {text}
    </button>
  );
};

export default Button;
