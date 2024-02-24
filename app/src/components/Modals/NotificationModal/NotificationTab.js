import React from "react";
import MessageIcon from "../../../assets/icons/messageIcon";
import { NotificationTypeMap } from "../../../constants/notificationTypes";

const formatDateTime = (datetime) => {
  const now = new Date();
  const messageDate = new Date(datetime);
  const diffInSeconds = Math.floor((now - messageDate) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return `Yesterday ${messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  return messageDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function NotificationTab({
  isCrucial,
  subject,
  body,
  datetime,
  type,
  organization,
}) {
  // Function to render body with newlines
  const renderBodyText = (text) => {
    return text.split("\n").map((line, index) => (
      <span
        key={index}
        className="text-xs text-left font-medium w-full leading-4"
      >
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };
  return (
    <div
      className={`w-full flex flex-row items-center py-4 px-2 justify-between rounded-lg ${
        isCrucial ? "bg-[#FFAF323A]" : "bg-[#7ED1E63A]"
      }`}
    >
      <div className="h-full flex items-center justify-between relative w-full">
        <div className="h-full flex flex-row items-center gap-2 relative w-full">
          <div
            className={`rounded-full p-2 flex-none items-center justify-center ${
              isCrucial ? "bg-SECONDARY_COLOR" : "bg-PRIMARY_LIGHT_COLOR"
            }`}
          >
            <MessageIcon />
          </div>

          <div className="flex flex-col flex-grow w-full justify-start items-start space-y-1 break-all">
            <p className="text-xs text-left font-medium w-full leading-4">
              <span className="font-bold">
                {subject || NotificationTypeMap[type]}
              </span>{" "}
            </p>

            {/* <p className="text-xs text-left font-medium w-full leading-4">
              {body}
            </p> */}

            <div className="text-xs text-left font-medium w-full leading-4">
              {renderBodyText(body)}
            </div>
            <div className="text-PRIMARY_LIGHT_COLOR text-xs text-left font-bold w-full flex flex-row justify-between break-all">
              <span className={`text-xs font-bold self-end text-gray-500`}>
                {organization}
              </span>
              <span
                className={`text-xs font-bold self-end ${
                  isCrucial
                    ? "text-SECONDARY_COLOR"
                    : "text-PRIMARY_LIGHT_COLOR"
                }`}
              >
                {formatDateTime(datetime)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationTab;
