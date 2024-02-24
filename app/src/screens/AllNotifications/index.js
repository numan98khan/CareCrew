import React, { useState, useMemo } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import theme from "../../styles/theme.styles";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import BackButton from "../../components/Button/BackButton";
import NotificationTab from "../../components/Modals/NotificationModal/NotificationTab";

import { useListNotifications } from "../../apolloql/notifications";
import {
  IMPORTANT_NOTIFICATIONS_INSTACARE,
  IMPORTANT_NOTIFICATIONS_FACILITY,
  IMPORTANT_NOTIFICATIONS_EMPLOYEE,
  REMINDER,
} from "../../constants/notificationTypes";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";
import { useAuth } from "../../context";

function AllNotifications({ onBackClick }) {
  const navigate = useNavigate();
  const { user, type } = useAuth();

  const IMPORTANT_NOTIFICATIONS =
    type === ADMIN
      ? IMPORTANT_NOTIFICATIONS_INSTACARE
      : type === EMPLOYEE
      ? IMPORTANT_NOTIFICATIONS_EMPLOYEE
      : IMPORTANT_NOTIFICATIONS_FACILITY;

  const [selectedTab, setSelectedTab] = useState(1);

  const [alertNotification, setAlertNotification] = useState(null);
  // const { notifications } = useListNotifications({
  //   userId: user?.attributes?.sub,
  //   type: type,
  // });

  const { notifications, refetch } = useListNotifications({
    userId: user?.attributes?.sub,
    setAlertNotification: setAlertNotification,
    type: type,
  });

  const filteredNotifications = useMemo(() => {
    // return notifications.sort(function (a, b) {
    //   return b._lastChangedAt - a._lastChangedAt;
    // });
    return notifications;
  }, [notifications]);

  const importantNotifications = useMemo(() => {
    return filteredNotifications.filter((obj) =>
      IMPORTANT_NOTIFICATIONS.includes(obj?.type)
    );
  }, [filteredNotifications]);
  const otherNotifications = useMemo(() => {
    return filteredNotifications.filter(
      (obj) => !IMPORTANT_NOTIFICATIONS.includes(obj?.type)
    );
  }, [filteredNotifications]);

  const filterNotifications = useMemo(() => {
    console.log(
      "🚀 ~ file: index.js:25 ~ filterNotifications ~ notifications:",
      notifications
    );
    return notifications.filter((notification) =>
      selectedTab === 1
        ? notification.type === REMINDER
        : notification.type !== REMINDER
    );
  }, [notifications, selectedTab]);

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex justify-start">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2">
            <div onClick={onBackClick}></div>
            <PageHeader text={"Notifications"} />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div style={{ width: "25%" }} className="h-fit flex flex-col gap-2">
          <div className="grid grid-cols-2 w-full pt-5">
            <p
              onClick={() => {
                setSelectedTab(1);
              }}
              style={{
                borderBottom:
                  selectedTab === 1 ? "3px solid #7ED1E6" : "3px solid white",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                color: selectedTab === 1 ? "black" : "rgba(2, 5, 10, 0.50)",
              }}
              className="w-full text-center pb-3"
            >
              Crucial
            </p>
            <p
              onClick={() => {
                setSelectedTab(2);
              }}
              style={{
                borderBottom:
                  selectedTab === 2 ? "3px solid #7ED1E6" : "3px solid white",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                color: selectedTab === 2 ? "black" : "rgba(2, 5, 10, 0.50)",
              }}
              className="w-full text-center"
            >
              Non-Crucial
            </p>
          </div>
        </div>
      </div>

      {selectedTab === 1 ? (
        <div className="w-full grid grid-cols-2 gap-2 overflow-auto">
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
        <div className="w-full grid grid-cols-2 gap-2 overflow-auto">
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
    </div>
  );
}

export default AllNotifications;
