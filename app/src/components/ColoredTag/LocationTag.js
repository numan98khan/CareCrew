import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";
import LocationIcon from "../../assets/icons/send";

import theme from "../../styles/theme.styles";

const LocationTag = ({ title, small }) => {
  return (
    <label
      className={`text-xxs font-medium text-white rounded flex  items-center p-1`}
      style={{
        backgroundColor: "rgba(255, 175, 50, 0.2)",
      }}
    >
      <LocationIcon size={3} color={theme.SECONDARY_COLOR} />
      <p className="text-bold text-SECONDARY_COLOR">{title}</p>
    </label>
  );
};

export default LocationTag;
