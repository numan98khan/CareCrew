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
        d="M17 21.64v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11.64a4 4 0 100-8 4 4 0 000 8zM23 21.64v-2a4 4 0 00-3-3.87M16 3.77a4 4 0 010 7.75"
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
