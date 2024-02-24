import React, { useState, useMemo } from "react";
import Modal from "react-modal";
import NotificationTab from "./NotificationTab";
import { useNavigate } from "react-router-dom";
import { displayDatetime } from "../../../services/micro";
import {
  IMPORTANT_NOTIFICATIONS_INSTACARE,
  IMPORTANT_NOTIFICATIONS_FACILITY,
  IMPORTANT_NOTIFICATIONS_EMPLOYEE,
} from "../../../constants/notificationTypes";
import { useAuth } from "../../../context";
import { ADMIN, EMPLOYEE } from "../../../constants/userTypes";
import themeStyles from "../../../styles/theme.styles";

function NotificationModal({
  open,
  onClose,
  afterOpenModal,
  styles,
  position,
  notifications,
}) {
  const [selectedTab, setSelectedTab] = useState(1);
  const navigator = useNavigate();

  const { type } = useAuth();
  const IMPORTANT_NOTIFICATIONS =
    type === ADMIN
      ? IMPORTANT_NOTIFICATIONS_INSTACARE
      : type === EMPLOYEE
      ? IMPORTANT_NOTIFICATIONS_EMPLOYEE
      : IMPORTANT_NOTIFICATIONS_FACILITY;

  const importantNotifications = useMemo(() => {
    // console.log("🚀 ~ file: index.js:16 ~ notifications:", notifications);
    return notifications.filter((obj) =>
      IMPORTANT_NOTIFICATIONS.includes(obj?.type)
    );
  }, [notifications, selectedTab]);
  const otherNotifications = useMemo(() => {
    return notifications.filter(
      (obj) => !IMPORTANT_NOTIFICATIONS.includes(obj?.type)
    );
  }, [notifications, selectedTab]);

  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
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
            padding: 0,
          },
        }}
        contentLabel="Example Modal"
      >
        <div
          style={{ width: "320px", height: "550px" }}
          className="w-full h-full flex flex-col gap-0 relative items-center justify-start"
        >
          <div className="grid grid-cols-2 w-full pt-5">
            <label
              onClick={() => {
                setSelectedTab(1);
              }}
              style={{
                borderBottom:
                  selectedTab === 1 ? "3px solid #16478E" : "3px solid white",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                color:
                  selectedTab === 1
                    ? themeStyles?.PRIMARY_COLOR
                    : "rgba(2, 5, 10, 0.50)",
              }}
              className="w-full text-center pb-3"
            >
              Crucial
            </label>
            <label
              onClick={() => {
                setSelectedTab(2);
              }}
              style={{
                borderBottom:
                  selectedTab === 2 ? "3px solid #16478E" : "3px solid white",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                color:
                  selectedTab === 2
                    ? themeStyles?.PRIMARY_COLOR
                    : "rgba(2, 5, 10, 0.50)",
              }}
              className="w-full text-center"
            >
              Non Crucial
            </label>
          </div>

          {selectedTab === 1 ? (
            <div className="flex flex-col gap-2 w-full p-2 overflow-y-scroll">
              {importantNotifications.map((item, index) => (
                <NotificationTab
                  key={index}
                  isCrucial={true}
                  subject={item.subject}
                  body={item.body}
                  datetime={item?.createdAt}
                  type={item?.type}
                  organization={item?.organization}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full p-2 overflow-y-scroll">
              {/* <NotificationTab isCrucial={false} /> */}
              {otherNotifications.map((item, index) => (
                <NotificationTab
                  key={index}
                  isCrucial={false}
                  subject={item.subject}
                  body={item.body}
                  datetime={item?.createdAt}
                  type={item?.type}
                  organization={item?.organization}
                />
              ))}
            </div>
          )}

          {/* <div className="h-[18%]" /> */}

          <div
            onClick={() => {
              navigator("/allNotifications");
              onClose();
            }}
            className="absolute bottom-0  w-full items-center justify-center bg-white"
          >
            <p
              style={{
                color: themeStyles?.PRIMARY_COLOR,
                fontWeight: "bold",
                fontSize: "13px",
              }}
              className="w-full text-center p-4 cursor-pointer"
            >
              View All Notifications
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NotificationModal;
