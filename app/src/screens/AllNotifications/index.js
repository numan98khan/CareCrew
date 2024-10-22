import React, { useState, useMemo } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import { useNavigate } from "react-router-dom";
import NotificationTab from "../../components/Modals/NotificationModal/NotificationTab";
import { useListNotifications } from "../../apolloql/notifications";
import {
  IMPORTANT_NOTIFICATIONS_INSTACARE,
  IMPORTANT_NOTIFICATIONS_FACILITY,
  IMPORTANT_NOTIFICATIONS_EMPLOYEE,
} from "../../constants/notificationTypes";
import { ADMIN, EMPLOYEE } from "../../constants/userTypes";
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

  const { notifications, refetch } = useListNotifications({
    userId: user?.attributes?.sub,
    setAlertNotification: setAlertNotification,
    type: type,
  });

  const filteredNotifications = useMemo(() => {
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

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex justify-start">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2">
            {/* <div onClick={onBackClick}>
              <BackButton />
            </div> */}
            <PageHeader text={"Notifications"} />
          </div>
        </div>
      </div>

      {/* Notification Tabs */}
      <div className="bg-white sticky top-0 z-10">
        {/* Make the tabs sticky by applying sticky positioning */}
        <div className="w-full flex flex-col gap-2 bg-white">
          <div className="grid grid-cols-2 w-full pt-5">
            <p
              onClick={() => {
                setSelectedTab(1);
              }}
              className={`w-full text-center pb-3 text-sm font-bold cursor-pointer ${
                selectedTab === 1
                  ? "border-b-2 border-blue-400 text-black"
                  : "border-b-2 border-transparent text-gray-500"
              }`}
            >
              Crucial
            </p>
            <p
              onClick={() => {
                setSelectedTab(2);
              }}
              className={`w-full text-center pb-3 text-sm font-bold cursor-pointer ${
                selectedTab === 2
                  ? "border-b-2 border-blue-400 text-black"
                  : "border-b-2 border-transparent text-gray-500"
              }`}
            >
              Non-Crucial
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {selectedTab === 1 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 overflow-auto">
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 overflow-auto">
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
