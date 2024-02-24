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
      <g clipPath="url(#clip0_2839_25013)">
        <path
          d="M21.75 12a9.75 9.75 0 10-19.5 0 9.75 9.75 0 0019.5 0zM0 12a12 12 0 1124 0 12 12 0 01-24 0zm8.325 2.91A4.938 4.938 0 0012 16.5c1.744 0 2.963-.82 3.675-1.59a1.126 1.126 0 011.655 1.524 7.179 7.179 0 01-5.325 2.316 7.153 7.153 0 01-5.325-2.316 1.121 1.121 0 01.065-1.589 1.121 1.121 0 011.59.066h-.01zM6.769 9.75a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm9-1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
          fill="#02050A"
          fillOpacity={0.5}
        />
      </g>
      <defs>
        <clipPath id="clip0_2839_25013">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
