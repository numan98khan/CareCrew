import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiChevronRight, FiChevronLeft } from "react-icons/fi"; // Icons for the menu

import theme from "../../styles/theme.styles";
import { useAuth } from "../../context";
import { ADMIN } from "../../constants/userTypes";
import { ScaleHover } from "../../styles/animations";

const SideMenu = ({ items }) => {
  const location = useLocation();
  const activePath = location.pathname;
  const { type } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed menu

  const MenuMapper = {
    Schedule: type === ADMIN ? "Schedule" : "My Shifts",
    People: "People",
    Messaging: "Chat",
    Facilities: "Facilities",
  };

  return (
    <div
      className={`flex flex-col bg-PRIMARY_COLOR h-full ${
        isExpanded ? "w-[165px]" : "w-12"
      } transition-all duration-300 ease-in-out justify-between`}
    >
      <div>
        {items.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={`flex items-center py-3 px-2 cursor-pointer text-white ${ScaleHover} ${
              isExpanded ? "justify-start" : "justify-center"
            } w-full`}
            style={{
              borderLeft:
                activePath === item.path
                  ? `4px solid ${theme.SECONDARY_COLOR}`
                  : "none",
            }}
          >
            <item.icon
              size={10}
              className={`${
                activePath === item.path ? "text-secondary" : "text-white"
              }`}
            />
            {isExpanded && (
              // <span className="ml-2 text-sm">
              //   {MenuMapper[item.name] || item.name}
              // </span>

              <span
                className={`ml-2 text-sm transition-opacity duration-300 ease-in-out ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: isExpanded ? "100%" : "0", // Prevent text from taking up space when not visible
                }}
              >
                {MenuMapper[item.name] || item.name}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Toggle Expand/Collapse Button */}
      <div
        className="py-3 px-2 cursor-pointer text-white"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <FiChevronLeft size={28} />
        ) : (
          <FiChevronRight size={28} />
        )}
      </div>
    </div>
  );
};

export default SideMenu;
