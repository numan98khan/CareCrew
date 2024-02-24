import React from "react";

import theme from "../../styles/theme.styles";

const InputField = ({ id, label, value, setValue }) => {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center"
      style={{ backgroundColor: theme.PRIMARY_NEUTRAL_COLOR }}
    >
      <TagLine />
      <div className="mb-12" />
      {/* <img src={splashLogo} alt="Logo" /> */}
      <img
        style={{ width: "500px", height: "auto" }}
        src={splashLogo}
        alt="Logo"
      />

      {/* <label className="text-lg font-bold" htmlFor="email">
          NURSING
        </label> */}
    </div>
  );
};

export default InputField;
