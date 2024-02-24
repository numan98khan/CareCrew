import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function BookedCalendarIcon(props) {
  const size = props.size ? props.size * 6.0 : 60;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M47.5 47.5h-35V20h35m0-12.5H45v-5h-5v5H20v-5h-5v5h-2.5a5 5 0 00-5 5v35a5 5 0 005 5h35a5 5 0 005-5v-35a5 5 0 00-5-5zm-6.175 20.15L38.675 25l-12.2 12.2-5.3-5.3-2.65 2.65 7.95 7.95 14.85-14.85z"
        fill={themeStyles?.SECONDARY_COLOR}
      />
    </svg>
  );
}

export default BookedCalendarIcon;
