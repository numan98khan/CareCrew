import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";

import theme from "../../styles/theme.styles";

const RateTag = ({ title, small }) => {
  return (
    <label
      className={`text-xxs font-medium text-white rounded flex  items-center p-1 bg-SECONDARY_COLOR`}
    >
      <p className="text-bold text-black">{title}</p>
    </label>
  );
};

export default RateTag;
