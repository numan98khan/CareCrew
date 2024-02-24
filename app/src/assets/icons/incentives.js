import React from "react";
import themeStyles from "../../styles/theme.styles";

function IncentivesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1091_8851)">
        <path
          d="M4.06408 1.59014C3.91191 1.52425 3.74574 1.49724 3.58053 1.51154C3.41532 1.52583 3.25627 1.58099 3.11767 1.67204C2.97908 1.76309 2.86531 1.88718 2.78659 2.03313C2.70788 2.17908 2.66669 2.34231 2.66675 2.50814V14.0001C2.66675 14.177 2.73699 14.3465 2.86201 14.4715C2.98703 14.5966 3.1566 14.6668 3.33341 14.6668C3.51023 14.6668 3.6798 14.5966 3.80482 14.4715C3.92984 14.3465 4.00008 14.177 4.00008 14.0001V11.1048L12.8927 7.25147C13.6961 6.90281 13.6961 5.76414 12.8927 5.41614L4.06408 1.59014Z"
          fill={themeStyles?.SECONDARY_COLOR}
        />
      </g>
      <defs>
        <clipPath id="clip0_1091_8851">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IncentivesIcon;
