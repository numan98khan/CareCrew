import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M39.583 39.583H10.417V16.667h29.166m-6.25-14.584V6.25H16.667V2.083H12.5V6.25h-2.083a4.152 4.152 0 00-4.167 4.167v29.166a4.167 4.167 0 004.167 4.167h29.166a4.167 4.167 0 004.167-4.167V10.417a4.167 4.167 0 00-4.167-4.167H37.5V2.083M35.417 25H25v10.417h10.417V25z"
        fill="#fff"
        fillOpacity={0.2}
      />
    </svg>
  );
}

export default SvgComponent;
