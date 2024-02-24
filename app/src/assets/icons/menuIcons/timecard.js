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
        d="M12 22.64c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
        // stroke="#7ED1E6"
        stroke={
          props.isSelected ? theme.SECONDARY_COLOR : theme.PRIMARY_LIGHT_COLOR
        }
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.64v6l4 2"
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
