import * as React from "react";
import theme from "../../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.4 : 24;

  const color = props.color ? props.color : theme.PRIMARY_LIGHT_COLOR;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.isSelected ? theme.SECONDARY_COLOR : color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-zap"
      {...props}
    >
      <path d="M13 2L3 14 12 14 11 22 21 10 12 10 13 2z" />
    </svg>
  );
}

export default SvgComponent;
