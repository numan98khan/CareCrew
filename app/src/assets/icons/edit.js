import * as React from "react";

import theme from "../../styles/theme.styles";

function SvgComponent(props) {
  const size = props.size ? props.size * 2.5 : 25;
  const color = props.color || theme?.PRIMARY_COLOR;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="edit">
        <path
          id="Vector"
          d="M11.2969 4.19116H4.29688C3.76644 4.19116 3.25773 4.40188 2.88266 4.77695C2.50759 5.15202 2.29688 5.66073 2.29688 6.19116V20.1912C2.29688 20.7216 2.50759 21.2303 2.88266 21.6054C3.25773 21.9804 3.76644 22.1912 4.29688 22.1912H18.2969C18.8273 22.1912 19.336 21.9804 19.7111 21.6054C20.0862 21.2303 20.2969 20.7216 20.2969 20.1912V13.1912"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M18.7969 2.69114C19.1947 2.29332 19.7343 2.06982 20.2969 2.06982C20.8595 2.06982 21.3991 2.29332 21.7969 2.69114C22.1947 3.08897 22.4182 3.62854 22.4182 4.19114C22.4182 4.75375 22.1947 5.29332 21.7969 5.69114L12.2969 15.1911L8.29688 16.1911L9.29688 12.1911L18.7969 2.69114Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
