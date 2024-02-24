import * as React from "react";
// import Svg, { Path } from "react-native-svg";
import themeStyles from "../../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 25;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke={themeStyles?.PRIMARY_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
