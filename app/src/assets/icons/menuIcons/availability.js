import * as React from "react";
// import Svg, { Path } from "react-native-svg";
import theme from "../../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 25;
  const color = props.color ? props.color : theme.PRIMARY_LIGHT_COLOR;
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
        d="M16 21.64v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11.64a4 4 0 100-8 4 4 0 000 8zM17 11.64l2 2 4-4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
