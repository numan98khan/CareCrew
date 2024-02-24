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
        clipPath="url(#clip0_697_6574)"
        stroke={themeStyles?.PRIMARY_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 14.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5z" />
        <path d="M9 6.75V9l1.125 1.125M12.383 13.012l-.263 2.873a1.5 1.5 0 01-1.5 1.365H7.372a1.5 1.5 0 01-1.5-1.365l-.262-2.873m.007-8.024l.263-2.873A1.5 1.5 0 017.372.75h3.263a1.5 1.5 0 011.5 1.365l.263 2.873" />
      </g>
      <defs>
        <clipPath id="clip0_697_6574">
          <path fill="#fff" d="M0 0H18V18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
