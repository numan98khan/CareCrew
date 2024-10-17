import * as React from "react";

// function SvgComponent(props) {
//   const size = props.size ? props.size * 1.6 : 16;
//   return (
//     <>
//       {props.isOpen ? (
//         <svg
//           width={size}
//           height={size}
//           viewBox="0 0 16 16"
//           className="bg-black"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//         >
//           <path fill="#7EE69B" d="M0 0H16V16H0z" />
//         </svg>
//       ) : (
//         <svg
//           width={size}
//           height={size}
//           viewBox="0 0 16 16"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//         >
//           <path
//             fill="#fff"
//             stroke="#F33047"
//             strokeWidth={3}
//             d="M1.5 1.5H14.5V14.5H1.5z"
//           />
//         </svg>
//       )}
//     </>
//   );
// }

function SvgComponent(props) {
  const size = props.size ? props.size * 2.0 : 20;
  return (
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
  );
}

export default SvgComponent;
