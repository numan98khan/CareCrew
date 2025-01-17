import React from "react";
import theme from "../../styles/theme.styles";

const PageHeader = ({ text, color }) => {
  return (
    <label
      className={`text-lg font-bold ${color ? color : "text-PRIMARY_COLOR"}`}
      htmlFor="email"
    >
      {text}
    </label>
  );
};

export default PageHeader;
