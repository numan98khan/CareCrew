import React from "react";
import themeStyles from "../../styles/theme.styles";

function AssignedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" fill={themeStyles?.GREEN} />
    </svg>
  );
}

export default AssignedIcon;
