// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import React, { Fragment, useEffect, useState } from "react";
import "../App.css";

import AppBar from "../components/AppBar";
import SideMenu from "../components/SideMenu";

import EmployeeDashboard from "../screens/Dashboard/EmployeeDashboard";
import { menuItems } from "../constants/menuItems";
import { useAdmin, useAuth } from "../context";
import MyProfile from "../screens/MyProfile";

import AllNotifications from "../screens/AllNotifications";

// import  from "../assets/icons/menuIcons/";
// import  from "../assets/icons/menuIcons/";
// import  from "../assets/icons/menuIcons/";
// import  from "../assets/icons/menuIcons/";

const EmployeeNav = () => {
  const { user, permissions } = useAuth();

  const filteredMenuItems = menuItems.filter((item) => {
    const allPermissions = [...permissions.access];
    const permission = allPermissions.find(
      (permission) => permission.name === item.name
    );
    if (permission?.name === "My Schedule") {
      return false;
    }
    return permission?.isSelected;
  });

  return (
    <Router>
      <div className="flex flex-col min-h-max w-full fixed  bg-PRIMARY_NEUTRAL_COLOR">
        {/* <div style={{}}> */}
        <AppBar type={permissions?.type}>My App</AppBar>
        {/* </div> */}

        {/* <div className="flex flex-row flex-grow"> */}
        <div className="flex" style={{ height: "95vh" }}>
          <div className="h-full">
            <SideMenu
              items={filteredMenuItems}
              activePath={"useLocation().pathname"}
            />
          </div>
          <div className="w-full overflow-y-auto m-2">
            <Routes>
              <Route
                key="My Profile"
                path="/myProfile"
                element={<MyProfile />}
              />
              <Route
                key="All Notifications"
                path="/allNotifications"
                element={<AllNotifications />}
              />
              {filteredMenuItems.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.path === "/" ? <EmployeeDashboard /> : route.element
                  }
                />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default EmployeeNav;
