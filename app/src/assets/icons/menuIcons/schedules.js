import * as React from "react";
import theme from "../../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 25;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 4.64H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-14a2 2 0 00-2-2zM16 2.64v4M8 2.64v4M3 10.64h18"
        // stroke="#7ED1E6"
        stroke={
          props.isSelected ? theme.SECONDARY_COLOR : theme.PRIMARY_LIGHT_COLOR
        }
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
