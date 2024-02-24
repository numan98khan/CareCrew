import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.4 : 14;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#clip0_3228_50115)"
        stroke="#B467C0"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.003 9.916a2.917 2.917 0 100-5.833 2.917 2.917 0 000 5.833zM7 .583V1.75M7 12.25v1.167M2.46 2.462l.83.828M10.71 10.71l.83.828M.586 7h1.167M12.25 7h1.167M2.46 11.538l.83-.828M10.71 3.29l.83-.828" />
      </g>
      <defs>
        <clipPath id="clip0_3228_50115">
          <path fill="#fff" d="M0 0H14V14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
