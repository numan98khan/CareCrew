import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.2 : 12;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#clip0_3164_25533)"
        stroke={props.color ? props.color : themeStyles?.SECONDARY_COLOR}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.898 1v2M6.898 9v2M3.363 2.465L4.778 3.88M9.019 8.12l1.415 1.415M1.898 6h2M9.898 6h2M3.363 9.535L4.778 8.12M9.019 3.88l1.415-1.415" />
      </g>
      <defs>
        <clipPath id="clip0_3164_25533">
          <path fill={"#fff"} transform="translate(.898)" d="M0 0H12V12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
