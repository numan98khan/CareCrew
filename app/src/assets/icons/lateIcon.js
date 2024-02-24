import React from "react";
import themeStyles from "../../styles/theme.styles";

function LateIcon(props) {
  const size = props.size ? props.size * 1.6 : 16;
  const color = props.color ? props.color : themeStyles?.PRIMARY_COLOR;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1091_8870)">
        <path
          d="M7.99992 12.6668C10.5772 12.6668 12.6666 10.5775 12.6666 8.00016C12.6666 5.42283 10.5772 3.3335 7.99992 3.3335C5.42259 3.3335 3.33325 5.42283 3.33325 8.00016C3.33325 10.5775 5.42259 12.6668 7.99992 12.6668Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 6V8L9 9"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.0066 11.5665L10.7732 14.1198C10.7432 14.4523 10.5896 14.7614 10.3427 14.986C10.0958 15.2107 9.77369 15.3345 9.43991 15.3332H6.55324C6.21946 15.3345 5.89731 15.2107 5.65044 14.986C5.40357 14.7614 5.24994 14.4523 5.21991 14.1198L4.98657 11.5665M4.99324 4.43318L5.22657 1.87985C5.25651 1.54857 5.40919 1.24044 5.65465 1.01595C5.90011 0.791462 6.22061 0.666828 6.55324 0.666515H9.45324C9.78702 0.665161 10.1092 0.789047 10.356 1.0137C10.6029 1.23835 10.7565 1.54742 10.7866 1.87985L11.0199 4.43318"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1091_8870">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LateIcon;
