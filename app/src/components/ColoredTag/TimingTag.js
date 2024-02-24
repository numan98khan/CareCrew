import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";
import LocationIcon from "../../assets/icons/send";
import MorningIcon from "../../assets/icons/indicators/morning";

import theme from "../../styles/theme.styles";

const TimingTag = ({ title, small }) => {
  return (
    <label
      className={`text-xxs font-medium text-white rounded flex  items-center p-1`}
      style={{
        backgroundColor: "rgba(180, 103, 192, 0.2)",
      }}
    >
      <MorningIcon size={8} />
      <p
        style={{
          color: "rgba(180, 103, 192, 1)",
        }}
        className="text-bold "
      >
        {title}
      </p>
    </label>
  );
};

export default TimingTag;
