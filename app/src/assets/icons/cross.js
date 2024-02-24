import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.4 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="#02050A"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
