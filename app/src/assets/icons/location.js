import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.4 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.006 1a5.506 5.506 0 00-5.5 5.5c0 4.706 5 8.262 5.213 8.412a.519.519 0 00.575 0c.212-.15 5.212-3.706 5.212-8.412a5.506 5.506 0 00-5.5-5.5zm0 3.5a2 2 0 110 4 2 2 0 010-4z"
        fill={themeStyles?.SECONDARY_COLOR}
      />
    </svg>
  );
}

export default SvgComponent;
