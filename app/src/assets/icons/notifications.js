import * as React from "react";
import themeStyles from "../../styles/theme.styles";

function SvgComponent(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4758_17058)">
        <path
          d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a1.999 1.999 0 01-3.46 0"
          stroke="#02050A"
          strokeOpacity={0.5}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {props.isBadge ? (
          <g filter="url(#filter0_d_4758_17058)">
            <circle
              cx={17.5}
              cy={3.5}
              r={3.5}
              fill={themeStyles?.SECONDARY_COLOR}
            />
            <circle cx={17.5} cy={3.5} r={4} stroke="#fff" />
          </g>
        ) : null}
      </g>
      <defs>
        <filter
          id="filter0_d_4758_17058"
          x={9}
          y={-1}
          width={17}
          height={17}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.686275 0 0 0 0 0.196078 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4758_17058"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4758_17058"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_4758_17058">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
