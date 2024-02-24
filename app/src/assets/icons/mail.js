import * as React from "react";

function SvgComponent(props) {
  const color = props?.color || "white";
  const size = props?.size ? props?.size * 2.4 : 24;
  return (
    <div className="flex justify-center items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 6L12 13L2 6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default SvgComponent;
