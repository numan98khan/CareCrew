import React from "react";
import theme from "../../styles/theme.styles";

const InfoBox = ({ children, isDynamic }) => {
  return (
    <div
      className="flex flex-col flex-grow py-1"
      style={{ minWidth: isDynamic ? "0" : "50%" }}
    >
      {children}
    </div>
  );
};

export default InfoBox;
