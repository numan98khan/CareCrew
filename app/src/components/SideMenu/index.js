import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";

import theme from "../../styles/theme.styles";
import { MainHover, ScaleHover } from "../../styles/animations";
import { useAuth } from "../../context";
import { ADMIN, FACILITY } from "../../constants/userTypes";

const SideMenu = ({ items }) => {
  const location = useLocation();
  const activePath = location.pathname;

  const { type } = useAuth();

  const MenuMapper = {
    Schedule: type === ADMIN ? "Schedule" : "My Shifts",

    People: "People",
    Messaging: "Chat",
    Facilities: "Facilites",
  };

  return (
    <div
      className="w-48 bg-PRIMARY_COLOR"
      style={{
        // backgroundColor: chroma(theme.PRIMARY_COLOR).brighten(0.16).hex(),
        // backgroundColor: chroma(theme.PRIMARY_COLOR).brighten(0.16).hex(),
        height: "100%",
      }}
    >
      <div className="flex flex-col justify-start items-start ">
        {items.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            // className={`w-full text-white text-sm cursor-pointer flex items-center py-4 px-4 transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30 `}
            className={`w-full text-white text-sm cursor-pointer flex items-center py-4 px-4 ${ScaleHover}`}
            // style={{
            //   backgroundColor:
            //     activePath === item.path ? theme.PRIMARY_COLOR : "",
            // }}

            style={{
              backgroundColor:
                activePath === item.path ? theme.PRIMARY_COLOR : "",
              borderLeft:
                activePath === item.path
                  ? `4px solid ${theme.SECONDARY_COLOR}`
                  : "", // adjust the color and width of the border as needed
            }}
          >
            {/* <div
              className="left-0 w-10 h-10 bg-white"
              style={{ backgroundColor: "#FFF" }}
            /> */}
            <item.icon size={8} isSelected={activePath === item.path} />
            <div className="m-1" />
            <div className="text-sm">{MenuMapper[item.name] || item.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
