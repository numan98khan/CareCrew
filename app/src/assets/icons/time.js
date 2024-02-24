import * as React from "react";

import themeStyles from "../../styles/theme.styles";
function SvgComponent(props) {
  const size = props.size ? props.size * 1.4 : 14;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#clip0_697_6566)"
        stroke={themeStyles?.PRIMARY_COLOR}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 12.834A5.833 5.833 0 107 1.167a5.833 5.833 0 000 11.667z" />
        <path d="M7 3.5V7l2.333 1.167" />
      </g>
      <defs>
        <clipPath id="clip0_697_6566">
          <path fill="#fff" d="M0 0H14V14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
