import * as React from "react";
import themeStyles from "../../styles/theme.styles";

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
      <g
        clipPath="url(#clip0_697_6579)"
        stroke={themeStyles?.PRIMARY_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 15.75v-1.5a3 3 0 00-3-3H3.75a3 3 0 00-3 3v1.5M6.375 8.25a3 3 0 100-6 3 3 0 000 6zM13.5 6l3.75 3.75M17.25 6L13.5 9.75" />
      </g>
      <defs>
        <clipPath id="clip0_697_6579">
          <path fill="#fff" d="M0 0H18V18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
