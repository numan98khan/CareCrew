import * as React from "react";
import theme from "../../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 25;
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="white" />
      <path
        d="M27 20H13"
        stroke="#7ED1E6"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 27L13 20L20 13"
        stroke="#7ED1E6"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
