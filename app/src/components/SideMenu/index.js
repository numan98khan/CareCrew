import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"; // Icons for the menu

import theme from "../../styles/theme.styles";
import { useAuth } from "../../context";
import { ADMIN } from "../../constants/userTypes";
import { ScaleHover } from "../../styles/animations";
import themeStyles from "../../styles/theme.styles";

import { FaUserCircle } from "react-icons/fa"; // Import user icon

const SideMenu = ({ items, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const activePath = location.pathname;
  const { type, personalData } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded/collapsed menu on desktop

  const MenuMapper = {
    Schedule: type === ADMIN ? "Schedule" : "My Shifts",
    People: "People",
    Messaging: "Chat",
    Facilities: "Facilities",
  };

  return (
    <div
      style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
      className={`h-full flex flex-col justify-between
        ${/* Mobile styles */ ""}
        fixed top-0 left-0 transform transition-transform duration-300 ease-in-out z-50
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        w-[205px] md:w-auto md:relative md:translate-x-0
        ${/* Desktop styles */ ""}
        ${isExpanded ? "md:w-48" : "md:w-12"}
      `}
    >
      <div>
        <NavLink
          to="/myProfile"
          className="md:hidden p-4 flex items-center"
          onClick={() => {
            // Close the menu on mobile after clicking the link
            if (window.innerWidth < 768) {
              setIsMenuOpen(false);
            }
          }}
        >
          <div className="space-y-4">
            <div
              // className="flex-col ml-0 w-full items-center justify-center "
              className="flex-row ml-0 w-full  "
            >
              {/* User Avatar */}
              {personalData?.profileImage ? (
                <img
                  src={personalData.profileImage}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle size={80} className="text-white" />
              )}
            </div>
            {/* User Information */}
            <div className="ml-0">
              <div className="text-white text-sm font-semibold">
                {personalData?.firstName} {personalData?.lastName}
              </div>
              <div className="text-white text-xs">{personalData?.email}</div>
            </div>
          </div>
        </NavLink>

        {items.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={`flex items-center py-3 px-2 cursor-pointer text-white ${ScaleHover} w-full
              justify-start ${
                isExpanded ? "md:justify-start" : "md:justify-center"
              }
            `}
            style={{
              borderLeft:
                activePath === item.path
                  ? `4px solid ${theme.SECONDARY_COLOR}`
                  : "none",
            }}
            onClick={() => {
              // Close the menu on mobile after clicking a link
              // if (window.innerWidth < 768) {
              //   setIsMenuOpen(false);
              // }
            }}
          >
            <item.icon
              size={10}
              className={`${
                activePath === item.path ? "text-secondary" : "text-white"
              }`}
            />
            <span
              className={`ml-2 text-sm ${
                isExpanded ? "md:block" : "md:hidden"
              }`}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {MenuMapper[item.name] || item.name}
            </span>
          </NavLink>
        ))}
      </div>

      {/* Toggle Expand/Collapse Button on Desktop */}
      <div
        className="py-3 px-2 cursor-pointer text-white hidden md:block"
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
