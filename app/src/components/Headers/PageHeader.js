import React from "react";
import theme from "../../styles/theme.styles";

const PageHeader = ({ text }) => {
  return (
    <label className="text-xl font-bold" htmlFor="email">
      {text}
    </label>
  );
};

export default PageHeader;
