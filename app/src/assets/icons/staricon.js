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
      <g clip-path="url(#clip0_861_13540)">
        <path
          d="M7.99999 1.3335L10.06 5.50683L14.6667 6.18016L11.3333 9.42683L12.12 14.0135L7.99999 11.8468L3.87999 14.0135L4.66666 9.42683L1.33333 6.18016L5.93999 5.50683L7.99999 1.3335Z"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_861_13540">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
