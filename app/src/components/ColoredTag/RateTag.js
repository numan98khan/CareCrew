import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";

import theme from "../../styles/theme.styles";
import themeStyles from "../../styles/theme.styles";

const RateTag = ({ title, small }) => {
  return (
    <label
      className={` font-medium text-white rounded flex  items-center ${
        small ? "text-xxs p-1" : "p-[2px] text-[8px]"
      } `}
      style={{ backgroundColor: themeStyles?.SECONDARY_COLOR }}
    >
      <p className="text-bold text-white">{title}</p>
    </label>
  );
};

export default RateTag;
