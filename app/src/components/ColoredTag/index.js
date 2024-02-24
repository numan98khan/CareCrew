import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";

import theme from "../../styles/theme.styles";
import themeStyles from "../../styles/theme.styles";

const ColoredTag = ({ title, small }) => {
  const location = useLocation();
  const activePath = location.pathname;
  //   border-radius: 20px;
  // border: 1px solid #B467C0;
  // background: rgba(180, 103, 192, 0.20);

  const styles = {
    LPN: {
      borderColor: "#B467C0",
      bgColor: "rgba(180, 103, 192, 0.20)",
    },
    RN: {
      borderColor: "#21D0B3",
      bgColor: "rgba(33, 208, 179, 0.20)",
    },
    CNA: {
      borderColor: themeStyles?.SECONDARY_COLOR,
      bgColor: "rgba(255, 175, 50, 0.20)",
    },
  };

  const currStyle = styles[title];
  return (
    <label
      className={`${
        small ? "px-2" : "px-4 py-1"
      } text-xxs font-medium text-white rounded-full flex space-x-2 items-center border `}
      style={{
        borderColor: currStyle?.borderColor ? currStyle?.borderColor : "black",
        backgroundColor: currStyle?.bgColor ? currStyle?.bgColor : "red",
        // padding: 1,
      }}
    >
      {/* <img className="w-4 h-4" src={redClock} alt="Button icon" /> */}
      {/* <ClockUpIcon /> */}
      <p className="text-bold" style={{ color: currStyle?.borderColor }}>
        {title}
      </p>
    </label>
  );
};

export default ColoredTag;
