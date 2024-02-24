import * as React from "react";
import themeStyles from "../../styles/theme.styles";

// import theme from "../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 25;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="trash-2">
        <path
          id="Vector"
          d="M3.29688 6.19116H5.29688H21.2969"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M19.2969 6.19116V20.1912C19.2969 20.7216 19.0862 21.2303 18.7111 21.6054C18.336 21.9804 17.8273 22.1912 17.2969 22.1912H7.29688C6.76644 22.1912 6.25773 21.9804 5.88266 21.6054C5.50759 21.2303 5.29688 20.7216 5.29688 20.1912V6.19116M8.29688 6.19116V4.19116C8.29688 3.66073 8.50759 3.15202 8.88266 2.77695C9.25773 2.40188 9.76644 2.19116 10.2969 2.19116H14.2969C14.8273 2.19116 15.336 2.40188 15.7111 2.77695C16.0862 3.15202 16.2969 3.66073 16.2969 4.19116V6.19116"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_3"
          d="M10.2969 11.1912V17.1912"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_4"
          d="M14.2969 11.1912V17.1912"
          stroke={themeStyles?.PRIMARY_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
