import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={props.size ? 32.6 * props.size : 326}
      height={props.size ? 6.0 * props.size : 60}
      viewBox="0 0 326 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="url(#pattern0)" d="M0 0H325.479V60H0z" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_867_15629" transform="scale(.00253 .0137)" />
        </pattern>
        <image
          id="image0_867_15629"
          width={396}
          height={73}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export default SvgComponent;
