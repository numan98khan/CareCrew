import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.6 : 16;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <g clip-path="url(#clip0_2318_33200)">
        <path
          d="M3 15.75V10.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 7.5V2.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 15.75V9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 6V2.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 15.75V12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 9V2.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.75 10.5H5.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.75 6H11.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.75 12H17.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2318_33200">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
