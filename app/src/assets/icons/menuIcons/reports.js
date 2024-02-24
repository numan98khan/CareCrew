import * as React from "react";
import theme from "../../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 25;

  const color = props.color ? props.color : theme.PRIMARY_LIGHT_COLOR;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.14 2h-8a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        // stroke="#7ED1E6"
        stroke={props.isSelected ? theme.SECONDARY_COLOR : color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.14 2v6h6M16.14 13h-8M16.14 17h-8M10.14 9h-2"
        // stroke="#7ED1E6"
        stroke={props.isSelected ? theme.SECONDARY_COLOR : color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
