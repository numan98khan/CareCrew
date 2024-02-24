import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.4 : 24;
  const color = props.color || "#02050A";
  const opacity = props.opacity || 0.5;
  const stroke = props.stroke || 2;

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
        d="M6 7.91V16a6 6 0 1012 0V6a4 4 0 10-8 0v9.182a2 2 0 104 0V8"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
