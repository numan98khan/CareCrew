import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.4 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.04 12c0-5.523-4.477-10-10-10-5.522 0-10 4.477-10 10s4.478 10 10 10c5.523 0 10-4.477 10-10z"
        stroke="#02050A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.04 16l4-4-4-4M8.04 12h8"
        stroke="#02050A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
