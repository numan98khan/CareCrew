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
//         d="M36 27l2 1.5-3 4 4.458 3.395L38 38.5 33 34l-3.5 4.604-2-1.404 3.5-4.7-4-3.5 1.5-2 4.5 4 3-4zm3.583-10.334H10.417v22.917h9.729a14.61 14.61 0 01-1.396-6.25A14.584 14.584 0 0133.333 18.75c2.23 0 4.355.5 6.25 1.395v-3.479zM10.417 43.75a4.167 4.167 0 01-4.167-4.167V10.416a4.152 4.152 0 014.167-4.166H12.5V2.083h4.167V6.25h16.666V2.083H37.5V6.25h2.083a4.167 4.167 0 014.167 4.166v12.709a14.497 14.497 0 014.167 10.208 14.583 14.583 0 01-14.584 14.583c-3.979 0-7.583-1.583-10.208-4.166H10.417zm22.916-20.521A10.104 10.104 0 0023.23 33.333 10.1 10.1 0 0037.2 42.668a10.103 10.103 0 006.237-9.335 10.1 10.1 0 00-10.104-10.104z"
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
      stroke={props?.color || themeStyles?.PRIMARY_COLOR}
      strokeOpacity={0.4}
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-alert-triangle"
      {...props}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9L12 13" />
      <path d="M12 17L12.01 17" />
    </svg>
  );
}

export default SvgComponent;
