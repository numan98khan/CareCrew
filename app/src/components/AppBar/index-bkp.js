// import React from "react";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Modal from "react-modal";

import "./Modal.css";

import theme from "../../styles/theme.styles";

import Logo from "../../assets/logo/logo";

import CareCrewLogo from "../../assets/logo/carecrew";
import MenuIcon from "../../assets/icons/menu";
import NotificationIcon from "../../assets/icons/notifications";

import PoepleIcon from "../../assets/icons/menuIcons/people";
import LogoutIcon from "../../assets/icons/logout";
// import People from "../../screens/People";
import { Auth } from "aws-amplify";
import { useAuth } from "../../context";

import { NavLink, useNavigate } from "react-router-dom";
import NotificationModal from "../Modals/NotificationModal";

import { useListNotifications } from "../../apolloql/notifications";

import moment from "moment-timezone";
import { ScaleHover } from "../../styles/animations";

import notificationSound from "../../assets/notification.mp3";
import { resetLastNotificationsActivity } from "../../services/notifications/resetter";
import themeStyles from "../../styles/theme.styles";

// ...

export async function signOut(navigate) {
  try {
    await Auth.signOut();

    // Clear the local storage cache
    localStorage.clear();

    navigate("/");
  } catch (error) {
    console.error("error signing out: ", error);
  }
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const AppBar = ({ children, type }) => {
  // const [isDebug, setIsDebug] = useState(true);

  // const { user } = useAuth();

  const { user, signIn, personalData } = useAuth();

  const [isDebug, setIsDebug] = useState(true);

  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(
    moment.tz("America/New_York").format("MMMM Do YYYY, h:mm:ss a")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        moment.tz("America/New_York").format("MMMM Do YYYY, h:mm:ss a")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [currentTimeCH, setCurrentTimeCH] = useState(
    moment.tz("America/Chicago").format("MMMM Do YYYY, h:mm:ss a")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeCH(
        moment.tz("America/Chicago").format("MMMM Do YYYY, h:mm:ss a")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getUsedLocalStorageSpace = () => {
    let total = 0;
    for (let x in localStorage) {
      let amount = (localStorage[x].length * 2) / 1024 / 1024; // convert byte to MB
      if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
        total += amount;
      }
    }
    return total.toFixed(2);
  };

  const maxLocalStorageSpace = 5; // Assuming a 5MB limit. Adjust this value based on your browser or user's browser limit.
  const [usedSpace, setUsedSpace] = useState(getUsedLocalStorageSpace());

  useEffect(() => {
    const interval = setInterval(() => {
      setUsedSpace(getUsedLocalStorageSpace());
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const clearCache = () => {
    for (let key in localStorage) {
      if (key.startsWith("image-")) {
        localStorage.removeItem(key);
      }
    }
    // alert("Selected cache cleared successfully!"); // Optional: Provide feedback to the user
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alertNotification, setAlertNotification] = useState(null);
  const [isBadgeAnimating, setIsBadgeAnimating] = useState(false);

  useEffect(() => {
    if (alertNotification) {
      // Trigger animation
      setIsBadgeAnimating(true);

      // // Play notification sound
      // new Audio(notificationSound).play();

      // Remove animation after some time (500ms)
      const timer = setTimeout(() => {
        setIsBadgeAnimating(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [alertNotification]);

  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);

  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [notificationPosition, setNotificationPosition] = useState({
    top: 0,
    right: 0,
  });

  const buttonRef = useRef();
  const notificationButtonRef = useRef();

  const openModal = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top + rect.height + rect.height / 12 + "px",
      right: window.innerWidth - rect.right + "px",
    });
    setModalIsOpen(true);
  };

  const openNotificationModal = () => {
    const rect = notificationButtonRef.current.getBoundingClientRect();
    setNotificationPosition({
      top: rect.top + rect.height + rect.height / 12 + "px",
      right: window.innerWidth - rect.right + "px",
    });
    setNotificationModalIsOpen(true);

    resetLastNotificationsActivity(personalData?.id);
  };

  const { notifications, refetch } = useListNotifications({
    userId: user?.attributes?.sub,
    setAlertNotification: setAlertNotification,
    type: type,
  });

  const newNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      return (
        personalData?.lastActivityNotifications &&
        new Date(notification.createdAt).getTime() >
          new Date(personalData.lastActivityNotifications).getTime()
      );
    });
  }, [notifications, personalData?.lastActivityNotifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.sort(function (a, b) {
      return b._lastChangedAt - a._lastChangedAt;
    });

    // return notifications;
  }, [notifications]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeNotificationModal = () => {
    setNotificationModalIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut(navigate);
    signIn(null);
  };

  return (
    <div
      className="flex top-0 p-2 items-center justify-between px-4 shadow-lg bg-white"
      // className="flex top-0 p-2 items-center justify-between px-4 shadow-lg bg-white"
      style={{ height: "6vh" }}
    >
      {/* {children}
       */}

      <div className="items-center w-full  justify-between flex">
        <CareCrewLogo size={2.6} className="ml-2" />
        {/* <Logo size={5} className="ml-2" /> */}

        {isDebug && (
          <div
            // style={{ color: themeStyles?.SECONDARY_COLOR }}
            className="text-xs font-bold text-PRIMARY_COLOR flex flex-row"
          >
            <div className="mr-4 flex flex-col">
              <span>NY Time: {currentTime}</span>
              <span>CH Time: {currentTimeCH}</span>
            </div>
            <div className="flex flex-col ">
              <span>
                Storage Used: {usedSpace} / {maxLocalStorageSpace} MB
              </span>
              <button
                onClick={clearCache}
                style={{ backgroundColor: themeStyles?.SECONDARY_COLOR }}
                className={`mr-2 ${ScaleHover} rounded-sm`}
              >
                Clear Cache
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center">
          <div
            ref={notificationButtonRef}
            className="relative rounded-full p-2 transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30"
          >
            <NotificationIcon
              onClick={openNotificationModal}
              className="rounded-full"
            />

            {newNotifications.length > 0 && (
              <span
                className={`bg-SECONDARY_COLOR badge ${
                  isBadgeAnimating ? "animate-bounce" : ""
                }`}
              >
                {newNotifications.length}
              </span>
            )}
          </div>
          <div
            className="flex border rounded-full h-full items-center transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30"
            style={{
              // width: "30px",
              // height: "30px",
              padding: 1,
              // backgroundColor: theme.PRIMARY_COLOR,
            }}
            onClick={openModal}
            ref={buttonRef}
          >
            <div
              className="border rounded-full h-full mr-2 flex items-center justify-center text-white "
              style={{
                width: "35px",
                height: "35px",
                //   padding: 10,
                backgroundColor: theme.PRIMARY_COLOR,
              }}
            >
              <label>
                {personalData
                  ? Array.from(personalData?.firstName)[0].toUpperCase()
                  : null}
                {personalData
                  ? Array.from(personalData?.lastName)[0].toUpperCase()
                  : null}
              </label>
            </div>

            <MenuIcon className="mr-3" />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // closeTimeoutMS={200} // add this line for fade-out animation
        contentLabel="User Options Modal"
        // className="Modal" // add this line to apply CSS classes
        // overlayClassName="Overlay" // add this line to apply CSS classes
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            zIndex: 1000, // this should be higher than AppBar's z-index
          },
          content: {
            position: "fixed", // This positions the modal relative to the viewport
            top: position.top,
            right: position.right,
            bottom: "auto",
            left: "auto",
            border: 10,
            boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            display: "flex",
            flexDirection: "column", // Add this line
            // backgroundColor: "#000",
            padding: 14,
          },
        }}
      >
        {/* <div className="flex" style={{ flexDirection: "column" }}>
          {" "} */}
        <NavLink to={"/myProfile"}>
          <div className="flex items-center ">
            <PoepleIcon color={theme.PRIMARY_COLOR} size={8} />
            <label className="ml-1 text-sm">
              {/* {user.challengeParam.userAttributes.email} */}
              {user?.attributes?.email}
            </label>
          </div>
        </NavLink>

        <div className="my-2" />
        <div className="flex items-center" onClick={handleSignOut}>
          <LogoutIcon color={theme.PRIMARY_COLOR} size={8} />
          <label className="ml-1 text-sm">Logout</label>
        </div>
        {/* </div> */}
      </Modal>

      <NotificationModal
        open={notificationModalIsOpen}
        onClose={closeNotificationModal}
        position={notificationPosition}
        notifications={filteredNotifications}
      />
    </div>
  );
};

export default AppBar;
