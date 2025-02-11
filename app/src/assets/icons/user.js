import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.6666 43.75V39.5833C41.6666 37.3732 40.7887 35.2536 39.2259 33.6908C37.6631 32.128 35.5434 31.25 33.3333 31.25H16.6666C14.4565 31.25 12.3369 32.128 10.7741 33.6908C9.21129 35.2536 8.33331 37.3732 8.33331 39.5833V43.75"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25 22.9167C29.6024 22.9167 33.3334 19.1857 33.3334 14.5833C33.3334 9.98096 29.6024 6.25 25 6.25C20.3976 6.25 16.6667 9.98096 16.6667 14.5833C16.6667 19.1857 20.3976 22.9167 25 22.9167Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
