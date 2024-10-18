import * as React from "react";
import themeStyles from "../../../styles/theme.styles";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50 * (props?.size || 1)}
      height={50 * (props?.size || 1)}
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"

      stroke={props?.color || themeStyles?.PRIMARY_COLOR}
      strokeOpacity={0.4}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-clock"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M12 6L12 12 16 14" />
    </svg>
  );
}

export default SvgComponent;
