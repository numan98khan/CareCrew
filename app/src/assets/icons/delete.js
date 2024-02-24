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
      <path
        d="M2.88 4.92h12.24M13.76 4.92v9.52a1.36 1.36 0 01-1.36 1.36H5.6a1.36 1.36 0 01-1.36-1.36V4.92m2.04 0V3.56A1.36 1.36 0 017.64 2.2h2.72a1.36 1.36 0 011.36 1.36v1.36M7.64 8.32v4.08M10.36 8.32v4.08"
        stroke={props.color ? props.color : "#F33047"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
