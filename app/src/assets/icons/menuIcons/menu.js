import * as React from "react";

function MenuIconComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size ? 2.4 * props?.size : 24}
      height={props?.size ? 2.4 * props?.size : 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#02050A"
      strokeOpacity={0.5}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-menu"
      {...props}
    >
      <path d="M3 12L21 12" />
      <path d="M3 6L21 6" />
      <path d="M3 18L21 18" />
    </svg>
  );
}

export default MenuIconComponent;
