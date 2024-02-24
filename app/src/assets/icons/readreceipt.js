import * as React from "react";

function SvgComponent(props) {
  const sizex = props.size ? props.size * 2.0 : 20;
  const sizey = props.size ? props.size * 1.1 : 1;
  return (
    <svg
      width={sizex}
      height={sizey}
      viewBox="0 0 20 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 6.4l4.743 3.62 7.616-8.704L10.853 0 4.469 7.296 1.212 4.81 0 6.4zm19.359-5.084L17.853 0l-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798 7.631-8.721z"
        fill="#21D0B3"
      />
    </svg>
  );
}

export default SvgComponent;
