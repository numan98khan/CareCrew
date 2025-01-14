import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.0 : 20;
  return (
    <>
      {props.isOpen ? (
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
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width={24}
          // height={24}

          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          // stroke="currentColor"
          stroke="#F33047"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-square"
          {...props}
        >
          <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
        </svg>
      )}
    </>
  );
}

// function SvgComponent(props) {
//   const size = props.size ? props.size * 2.0 : 20;
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       // width={24}
//       // height={24}

//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       // stroke="currentColor"
//       stroke="#F33047"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="feather feather-square"
//       {...props}
//     >
//       <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
//     </svg>
//   );
// }

export default SvgComponent;
