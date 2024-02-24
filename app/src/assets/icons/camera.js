import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2297_39449)">
        <path
          d="M23.9401 19C23.9401 19.5304 23.7293 20.0391 23.3543 20.4142C22.9792 20.7893 22.4705 21 21.9401 21H3.94006C3.40963 21 2.90092 20.7893 2.52585 20.4142C2.15078 20.0391 1.94006 19.5304 1.94006 19V8C1.94006 7.46957 2.15078 6.96086 2.52585 6.58579C2.90092 6.21071 3.40963 6 3.94006 6H7.94006L9.94006 3H15.9401L17.9401 6H21.9401C22.4705 6 22.9792 6.21071 23.3543 6.58579C23.7293 6.96086 23.9401 7.46957 23.9401 8V19Z"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.9401 17C15.1492 17 16.9401 15.2091 16.9401 13C16.9401 10.7909 15.1492 9 12.9401 9C10.7309 9 8.94006 10.7909 8.94006 13C8.94006 15.2091 10.7309 17 12.9401 17Z"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2297_39449">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.940063)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
