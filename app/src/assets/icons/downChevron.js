import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.4 : 24;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 9.632l6 6 6-6"
        stroke={props?.color ? props?.color : "#7ED1E6"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
