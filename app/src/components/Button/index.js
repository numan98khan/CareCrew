import React from "react";
import theme from "../../styles/theme.styles";

import { MainHover } from "../../styles/animations";

const Button = ({ type, children, onClick, color, disabled }) => {
  return (
    <button
      className={`font-bold rounded-full w-full py-2 px-6 items-center justify-center ${MainHover} ${
        disabled ? "opacity-50" : ""
      }`}
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: disabled
          ? "#ccc"
          : color
          ? color
          : theme.PRIMARY_LIGHT_COLOR,
        color: "#fff",
        userSelect: "none",
        fontSize: "12px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      disabled={disabled}
    >
      {/* <div></> */}
      {children}
    </button>
  );
};

export default Button;
