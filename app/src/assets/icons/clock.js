import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_861_13534)">
        <path
          d="M8.00001 14.6668C11.6819 14.6668 14.6667 11.6821 14.6667 8.00016C14.6667 4.31826 11.6819 1.3335 8.00001 1.3335C4.31811 1.3335 1.33334 4.31826 1.33334 8.00016C1.33334 11.6821 4.31811 14.6668 8.00001 14.6668Z"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 4V8L10.6667 9.33333"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_861_13534">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
