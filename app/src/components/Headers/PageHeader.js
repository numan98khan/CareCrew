import React from "react";
import theme from "../../styles/theme.styles";

const PageHeader = ({ text }) => {
  return (
    <label className="text-lg font-bold text-PRIMARY_COLOR" htmlFor="email">
      {text}
    </label>
  );
};

export default PageHeader;
