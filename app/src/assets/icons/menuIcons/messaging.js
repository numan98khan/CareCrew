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
        d="M12 14.64a2 2 0 100-4 2 2 0 000 4zM16.24 8.4a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14"
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
