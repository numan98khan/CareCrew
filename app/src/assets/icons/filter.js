import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.6 : 16;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#clip0_701_9497)"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 15.75V10.5M3 7.5V2.25M9 15.75V9M9 6V2.25M15 15.75V12M15 9V2.25M.75 10.5h4.5M6.75 6h4.5M12.75 12h4.5" />
      </g>
      <defs>
        <clipPath id="clip0_701_9497">
          <path fill="#fff" d="M0 0H18V18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
