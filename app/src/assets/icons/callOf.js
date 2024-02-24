import React from "react";
import themeStyles from "../../styles/theme.styles";

function CallOff(props) {
  const size = props.size ? props.size * 1.6 : 16;
  const color = props.color ? props.color : themeStyles?.PRIMARY_COLOR;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1091_8878)">
        <path
          d="M10.6667 14V12.6667C10.6667 11.9594 10.3858 11.2811 9.8857 10.781C9.3856 10.281 8.70733 10 8.00008 10H3.33341C2.62617 10 1.94789 10.281 1.4478 10.781C0.9477 11.2811 0.666748 11.9594 0.666748 12.6667V14"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.66667 7.33333C7.13943 7.33333 8.33333 6.13943 8.33333 4.66667C8.33333 3.19391 7.13943 2 5.66667 2C4.19391 2 3 3.19391 3 4.66667C3 6.13943 4.19391 7.33333 5.66667 7.33333Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 5.3335L15.3333 8.66683"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.3333 5.3335L12 8.66683"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1091_8878">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CallOff;
