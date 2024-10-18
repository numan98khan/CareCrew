import * as React from "react";

// function SvgComponent(props) {
//   const size = props.size ? props.size * 1.6 : 16;
//   return (
//     <svg
//       // className="bg-black"
//       height={size}
//       width={size}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <circle cx="7" cy="12" r="4" fill="#7EE69B" />
//     </svg>
//   );
// }

function SvgComponent(props) {
  const size = props.size ? props.size * 2.0 : 20;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      // stroke={props?.color || themeStyles?.PRIMARY_COLOR}
      // strokeOpacity={0.4}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7EE69B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-check-square"
      {...props}
    >
      <path d="M9 11L12 14 22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

export default SvgComponent;
