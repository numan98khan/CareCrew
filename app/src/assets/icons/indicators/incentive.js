import * as React from "react";
import themeStyles from "../../../styles/theme.styles";

// function SvgComponent(props) {
//   const size = props.size ? props.size * 1.6 : 16;
//   const color = props.color ? props.color : themeStyles.SECONDARY_COLOR;
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 16 16"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <g clipPath="url(#clip0_4758_11382)">
//         <path
//           d="M4.064 1.59a1 1 0 00-1.397.918V14A.667.667 0 104 14v-2.895l8.893-3.854c.803-.348.803-1.487 0-1.835L4.064 1.59z"
//           fill={color}
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_4758_11382">
//           <path fill="#fff" d="M0 0H16V16H0z" />
//         </clipPath>
//       </defs>
//     </svg>
//   );
// }

function SvgComponent(props) {
  const size = props.size ? props.size * 2.0 : 20;
  const color = props.color ? props.color : themeStyles.SECONDARY_COLOR;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-flag"
      {...props}
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22L4 15" />
    </svg>
  );
}

export default SvgComponent;

// import * as React from "react";

// function SvgComponent(props) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
//       {/* <path
//         d="M2600 5595c0-237-3-305-12-305-7 0-63-5-125-10-140-12-299-49-398-91-11-4-49-20-85-35-304-124-635-421-789-706-33-63-80-169-88-202-35-143-41-258-23-421 37-323 180-591 420-785 77-62 83-66 116-87 28-18 244-126 279-140 27-10 103-36 115-38 19-5 100-27 120-35 59-20 254-55 418-75l52-7V1627l-82 6c-76 5-198 30-223 45-5 4-12 7-15 8-71 14-269 163-285 215-4 11-10 19-14 19-12 0-75 133-95 200l-17 55-410-3-410-2 6-63c17-165 65-343 132-487 26-54 99-185 115-205 4-5 27-35 51-65 72-93 202-215 327-306 60-44 244-154 257-154 5 0 25-9 44-19 34-18 167-63 264-90 62-17 188-31 276-31h79V100h750l2 332 3 333 85 6c121 9 341 58 430 96 8 3 18 7 22 7 3 1 10 4 14 8 4 5 13 8 20 8 16 0 162 70 249 119 39 22 77 44 85 48s20 12 27 17c7 6 36 27 64 46 70 47 221 181 267 237 20 24 47 57 60 71 36 42 132 200 162 267 104 232 133 496 79 720-11 44-21 89-24 100-7 28-110 235-132 264-193 254-402 410-708 524-138 51-348 95-495 102-58 3-129 8-158 11l-52 5 2 502 3 502 58-2c154-5 367-94 455-188 66-71 103-148 110-230l5-65h863l-4 38c-4 47-29 151-52 222-141 430-441 791-800 962-133 63-169 78-235 94-5 2-44 12-86 23s-123 25-180 31-112 13-121 16c-17 5-18 28-18 290v284h-750v-305zm0-1585v-450h-57c-52 1-84 6-159 23-30 7-158 59-164 66-3 3-18 13-35 21-54 28-151 128-186 192-32 59-34 69-34 158 0 69 6 111 20 154 56 167 269 281 528 285l87 1v-450zm975-1485c219-17 399-118 472-266 46-93 48-281 3-367-80-153-329-259-612-261l-88-1v448c0 247 3 452 7 456s37 4 73 2c36-3 101-8 145-11z"
//         transform="matrix(.039 0 0 -.039 0 16)"
//       /> */}
//     </svg>
//   );
// }

// export default SvgComponent;
