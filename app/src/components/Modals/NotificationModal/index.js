import React, { useState, useMemo } from "react";
import Modal from "react-modal";
import NotificationTab from "./NotificationTab";
import { useNavigate } from "react-router-dom";
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
  position = { top: "100px", right: "50px" }, // Provide default fallback values for positioning
  notifications = [], // Provide default empty array to avoid errors
}) {
  const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();

  const { type } = useAuth();
  const IMPORTANT_NOTIFICATIONS =
    type === ADMIN
      ? IMPORTANT_NOTIFICATIONS_INSTACARE
      : type === EMPLOYEE
      ? IMPORTANT_NOTIFICATIONS_EMPLOYEE
      : IMPORTANT_NOTIFICATIONS_FACILITY;

  const importantNotifications = useMemo(() => {
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
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Changed to darken the background when modal is open
            zIndex: 1000,
          },
          content: {
            position: "fixed",
            top: position.top, // Dynamic top position
            right: position.right, // Dynamic right position
            bottom: "auto",
            left: "auto",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)", // Slight shadow to enhance modal
            display: "flex",
            flexDirection: "column",
            padding: 0,
            width: "320px",
            height: "550px",
            overflow: "hidden", // Ensure content does not overflow out of the modal
          },
        }}
        contentLabel="Notification Modal"
      >
        <div className="w-full h-full flex flex-col gap-0 relative items-center justify-start">
          {/* Tabs */}
          <div className="grid grid-cols-2 w-full pt-5">
            <label
              onClick={() => setSelectedTab(1)}
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
              onClick={() => setSelectedTab(2)}
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
              className="w-full text-center pb-3"
            >
              Non Crucial
            </label>
          </div>

          {/* Notifications Content */}
          <div className="flex flex-col gap-2 w-full p-2 overflow-y-auto">
            {selectedTab === 1 ? (
              importantNotifications.length > 0 ? (
                importantNotifications.map((item, index) => (
                  <NotificationTab
                    key={index}
                    isCrucial={true}
                    subject={item.subject}
                    body={item.body}
                    datetime={item?.createdAt}
                    type={item?.type}
                    organization={item?.organization}
                  />
                ))
              ) : (
                <p className="text-center">No Crucial Notifications</p>
              )
            ) : otherNotifications.length > 0 ? (
              otherNotifications.map((item, index) => (
                <NotificationTab
                  key={index}
                  isCrucial={false}
                  subject={item.subject}
                  body={item.body}
                  datetime={item?.createdAt}
                  type={item?.type}
                  organization={item?.organization}
                />
              ))
            ) : (
              <p className="text-center">No Non-Crucial Notifications</p>
            )}
          </div>

          {/* Bottom Link to View All Notifications */}
          <div
            onClick={() => {
              navigate("/allNotifications");
              onClose();
            }}
            className="absolute bottom-0 w-full items-center justify-center bg-white"
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
