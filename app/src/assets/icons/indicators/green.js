import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.6 : 16;
  return (
    <svg
      // className="bg-black"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="12" r="4" fill="#7EE69B" />
    </svg>
  );
}

export default SvgComponent;
