import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9401 3H5.94006C4.83549 3 3.94006 3.89543 3.94006 5V19C3.94006 20.1046 4.83549 21 5.94006 21H19.9401C21.0446 21 21.9401 20.1046 21.9401 19V5C21.9401 3.89543 21.0446 3 19.9401 3Z"
        stroke="#7ED1E6"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.44006 10C10.2685 10 10.9401 9.32843 10.9401 8.5C10.9401 7.67157 10.2685 7 9.44006 7C8.61164 7 7.94006 7.67157 7.94006 8.5C7.94006 9.32843 8.61164 10 9.44006 10Z"
        stroke="#7ED1E6"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.9401 15L16.9401 10L5.94006 21"
        stroke="#7ED1E6"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
