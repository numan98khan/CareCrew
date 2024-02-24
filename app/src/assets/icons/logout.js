import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.77 4.98a6.75 6.75 0 11-9.548 0M9 1.5V9"
        stroke={themeStyles?.PRIMARY_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
