import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";

import theme from "../../styles/theme.styles";
import { MainHover } from "../../styles/animations";

const NavTab = ({ title, amount, isActive, onClick }) => {
  const location = useLocation();
  const activePath = location.pathname;
  return (
    <div
      //   className={`w-full text-sm cursor-pointer flex items-center py-4 px-4 justify-center`}
      className={`flex h-full text-sm cursor-pointer items-center py-2 justify-center relative p-4  ${MainHover}`}
      onClick={onClick}
    >
      <div
        // className={`flex`}
        className={`w-full h-full text-sm cursor-pointer flex items-center justify-center text-center`}
      >
        <label
          style={{ color: isActive ? "black" : "grey", fontSize: "14px" }}
          className="flex w-full font-bold text-xs text-center"
        >
          {title}
        </label>

        {amount ? (
          <div className="rounded-full bg-SECONDARY_COLOR text-white text-xxs font-bold px-2 text-center ml-1">
            {amount}
          </div>
        ) : null}

        {isActive ? (
          <div className="h-1 bg-PRIMARY_LIGHT_COLOR w-full bottom-0 absolute" />
        ) : null}
      </div>
    </div>
  );
};

export default NavTab;
