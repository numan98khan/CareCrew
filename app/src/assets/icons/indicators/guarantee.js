import * as React from "react";

function SvgComponent(props) {
  const size = props.size ? props.size * 1.6 : 16;
  const color = props.color || "#21D0B3";

  return (
    <svg
      width={size}
      height={size}
      // className="bg-black"
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#clip0_4758_11386${size})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={`M${size * (7.532 / 16)} ${size * (1.463 / 16)}c${
            size * (0.263 / 16)
          } ${size * (-0.098 / 16)} ${size * (0.55 / 16)} ${
            size * (-0.11 / 16)
          } ${size * (0.821 / 16)} ${size * (-0.036 / 16)}l${
            size * (0.115 / 16)
          } ${size * (0.036 / 16)} ${size * (4.667 / 16)} ${
            size * (1.75 / 16)
          }a${size * (1.333 / 16)} ${size * (1.333 / 16)} 0 01${
            size * (0.86 / 16)
          } ${size * (1.14 / 16)}l${size * (0.005 / 16)} ${
            size * (0.11 / 16)
          }v${size * (3.574 / 16)}a${size * (5.999 / 16)} ${
            size * (5.999 / 16)
          } 0 01-${size * (3.14 / 16)} ${size * (5.274 / 16)}l-${
            size * (0.177 / 16)
          } ${size * (0.093 / 16)}-${size * (2.236 / 16)} ${
            size * (1.118 / 16)
          }a${size * (1 / 16)} ${size * (1 / 16)} 0 01-${size * (0.798 / 16)} ${
            size * (0.041 / 16)
          }l-${size * (0.096 / 16)}-${size * (0.04 / 16)}-${
            size * (2.236 / 16)
          }-${size * (1.119 / 16)}a${size * (6 / 16)} ${size * (6 / 16)} 0 01-${
            size * (3.314 / 16)
          }-${size * (5.167 / 16)}L${size * (2 / 16)} ${size * (8.037 / 16)}V${
            size * (4.462 / 16)
          }a${size * (1.333 / 16)} ${size * (1.333 / 16)} 0 01${
            size * (0.763 / 16)
          }-${size * (1.205 / 16)}l${size * (0.102 / 16)}-${
            size * (0.044 / 16)
          } ${size * (4.667 / 16)}-${size * (1.75 / 16)}zm${
            size * (2.757 / 16)
          } ${size * (4.29 / 16)}L${size * (7.223 / 16)} ${
            size * (8.818 / 16)
          } ${size * (6.045 / 16)} ${size * (7.64 / 16)}a${
            size * (0.667 / 16)
          } ${size * (0.667 / 16)} 0 00-${size * (0.943 / 16)} ${
            size * (0.944 / 16)
          }l${size * (1.603 / 16)} ${size * (1.602 / 16)}a${
            size * (0.734 / 16)
          } ${size * (0.734 / 16)} 0 00${size * (1.037 / 16)} 0l${
            size * (3.49 / 16)
          }-${size * (3.49 / 16)}a${size * (0.666 / 16)} ${
            size * (0.666 / 16)
          } 0 10-${size * (0.943 / 16)}-${size * (0.942 / 16)}z`}
          fill={color}
        />
      </g>
      <defs>
        <clipPath id={`clip0_4758_11386${size}`}>
          <path fill="#fff" d={`M0 0H${size}V${size}H0z`} />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgComponent;
