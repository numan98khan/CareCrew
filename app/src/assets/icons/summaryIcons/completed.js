import * as React from "react";
import themeStyles from "../../../styles/theme.styles";

// function SvgComponent(props) {
//   return (
//     <svg
//       width={50 * (props?.size || 1)}
//       height={50 * (props?.size || 1)}
//       viewBox="0 0 50 50"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <path
//         d="M39.583 39.583H10.417V16.667h29.166m-6.25-14.584V6.25H16.667V2.083H12.5V6.25h-2.083a4.152 4.152 0 00-4.167 4.167v29.166a4.167 4.167 0 004.167 4.167h29.166a4.167 4.167 0 004.167-4.167V10.417a4.167 4.167 0 00-4.167-4.167H37.5V2.083M35.417 25H25v10.417h10.417V25z"
//         fill={props?.color || themeStyles?.PRIMARY_COLOR}
//         fillOpacity={0.2}
//       />
//     </svg>
//   );
// }

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={24}
      // height={24}

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
      className="feather feather-check-circle"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path d="M22 4L12 14.01 9 11.01" />
    </svg>
  );
}

export default SvgComponent;
