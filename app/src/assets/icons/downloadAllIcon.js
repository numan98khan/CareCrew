import React from "react";
import themeStyles from "../../styles/theme.styles";

function DownloadAllIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_2318_35450)">
        <path
          d="M7.99805 16.9995L11.998 20.9995L15.998 16.9995"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 12V21"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.8792 18.0899C21.7486 17.4786 22.4006 16.6061 22.7405 15.5991C23.0804 14.5921 23.0906 13.503 22.7696 12.4898C22.4486 11.4766 21.8131 10.592 20.9553 9.96449C20.0975 9.33697 19.062 8.9991 17.9992 8.99993H16.7392C16.4384 7.82781 15.8757 6.73918 15.0933 5.81601C14.3109 4.89285 13.3293 4.15919 12.2224 3.67029C11.1155 3.18138 9.91204 2.94996 8.70273 2.99345C7.49341 3.03694 6.30971 3.3542 5.24075 3.92136C4.17179 4.48851 3.24543 5.29078 2.53139 6.26776C1.81735 7.24474 1.33425 8.37098 1.11846 9.56168C0.902671 10.7524 0.959811 11.9765 1.28558 13.142C1.61135 14.3074 2.19726 15.3837 2.9992 16.2899"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2318_35450">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default DownloadAllIcon;
