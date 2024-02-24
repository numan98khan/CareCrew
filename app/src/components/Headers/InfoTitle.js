import React from "react";

const PageHeader = ({ text, color }) => {
  return (
    <label
      className={`text-xs font-bold ${!color ? "text-PRIMARY_COLOR" : color}`}
    >
      {text}
    </label>
  );
};

export default PageHeader;
