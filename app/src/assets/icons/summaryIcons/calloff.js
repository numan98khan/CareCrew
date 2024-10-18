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
//         d="M31.25 27.083h3.125v5.875l5.083 2.938-1.562 2.708-6.646-3.833v-7.688zm8.333-10.416H10.417v22.916h9.729a14.611 14.611 0 01-1.396-6.25A14.583 14.583 0 0133.333 18.75c2.23 0 4.355.5 6.25 1.396v-3.48zM10.417 43.75a4.167 4.167 0 01-4.167-4.167V10.417a4.152 4.152 0 014.167-4.167H12.5V2.083h4.167V6.25h16.666V2.083H37.5V6.25h2.083a4.167 4.167 0 014.167 4.167v12.708a14.497 14.497 0 014.167 10.208 14.583 14.583 0 01-14.584 14.584c-3.979 0-7.583-1.584-10.208-4.167H10.417zm22.916-20.52A10.104 10.104 0 0023.23 33.332 10.1 10.1 0 0037.2 42.668a10.106 10.106 0 006.237-9.335A10.1 10.1 0 0033.334 23.23z"
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
      className="feather feather-x-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M15 9L9 15" />
      <path d="M9 9L15 15" />
    </svg>
  );
}

export default SvgComponent;
