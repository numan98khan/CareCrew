import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  const color = props.color || themeStyles.SECONDARY_COLOR;
  const size = props.size ? props.size * 1.8 : "18";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="18" fill="" />
      <path
        d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.765L9 13.3275L4.365 15.765L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
