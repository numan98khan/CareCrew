import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.6 : 16;
  return (
    <>
      {props.isOpen ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          className="bg-black"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path fill="#7EE69B" d="M0 0H16V16H0z" />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            fill="#fff"
            stroke="#F33047"
            strokeWidth={3}
            d="M1.5 1.5H14.5V14.5H1.5z"
          />
        </svg>
      )}
    </>
  );
}

export default SvgComponent;
