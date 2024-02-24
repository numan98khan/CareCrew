import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 3.2 : 32;
  const color = props.color ? props.color : "#fff";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27.71 4.29a1 1 0 00-1.05-.23l-22 8a1 1 0 000 1.87l8.59 3.43L19.59 11 21 12.41l-6.37 6.37 3.44 8.59A1 1 0 0019 28a1 1 0 00.92-.66l8-22a1 1 0 00-.21-1.05z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
