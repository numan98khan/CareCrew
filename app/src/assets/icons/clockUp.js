import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.7 : 17;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.488 8.536a6.75 6.75 0 10-6.353 6.328M7.75 4.375v3.75l2.25 2.25m3 5.25v-4.5m0 0l2.25 2.25M13 11.125l-2.25 2.25"
        stroke={props.color ? props.color : themeStyles?.RED_LIGHT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
