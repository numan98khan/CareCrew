import * as React from "react";
import themeStyles from "../../../styles/theme.styles";

function SvgComponent(props) {
  return (
    <svg
      width={50 * (props?.size || 1)}
      height={50 * (props?.size || 1)}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25 18.75c4.167 0 6.25 5.042 3.313 8-2.959 2.958-8 .854-8-3.313A4.668 4.668 0 0125 18.75zm9.375 18.75h-18.75v-2.333c0-2.605 4.167-4.688 9.375-4.688s9.375 2.083 9.375 4.688m5.208 4.416H10.417V16.667h29.166m-6.25-14.584V6.25H16.667V2.083H12.5V6.25h-2.083a4.179 4.179 0 00-4.167 4.167v29.166a4.167 4.167 0 004.167 4.167h29.166a4.152 4.152 0 004.167-4.167V10.417a4.167 4.167 0 00-4.167-4.167H37.5V2.083h-4.167z"
        fill={props?.color || themeStyles?.PRIMARY_COLOR}
        fillOpacity={0.2}
      />
    </svg>
  );
}

export default SvgComponent;
