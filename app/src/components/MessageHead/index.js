import React from "react";
import { useSpring, animated } from "react-spring";
import themeStyles from "../../styles/theme.styles";

import Avatar from "../Avatar";
import "./Avatar.css";
import { MainHover } from "../../styles/animations";

/**
 * Format a Date string to a human-readable relative time (e.g., "2 hrs ago").
 */
const formatDateTime = (datetime) => {
  if (!datetime) return "";

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

/**
 * MessageHeader component
 *
 * @param {Object} props
 * @param {Object[]} props.people - Array of participants; each item typically has { people: { firstName, lastName, profilePicture, ... } }
 * @param {string} [props.latestMessage] - The most recent message content
 * @param {string|Date} [props.latestTime] - The timestamp of the latest message
 * @param {boolean} [props.isSelected] - Whether this chat item is currently selected
 * @param {boolean} [props.isOnline] - Whether the user is online (for potential future usage)
 * @param {number} [props.unreadMessages] - Number of unread messages (for potential future usage)
 */
const MessageHeader = ({
  people = [],
  latestMessage,
  latestTime,
  isSelected,
  isOnline,
  unreadMessages,
}) => {
  // Animation setup
  const [animationProps, setAnimationProps] = useSpring(() => ({
    scale: 1,
  }));

  /**
   * Trigger a brief scaling animation on click.
   */
  const onCardClick = () => {
    setAnimationProps({
      scale: 1.1,
      reset: true,
      reverse: true,
      from: { scale: 1 },
      config: { duration: 100 },
    });
  };

  // Safely extract participant names
  const names = people.map((item) => {
    const person = item?.people;
    if (!person) return "";
    return `${person.firstName} ${person.lastName}`;
  });
  const title = names.length ? names.join(" & ") : "No Participants";

  // Show the first person's avatar (if present)
  const headerPerson = people?.[0]?.people;

  return (
    <animated.div
      onClick={onCardClick}
      style={{
        transform: animationProps.scale.to((scale) => `scale(${scale})`),
      }}
      className={`${MainHover} flex flex-col p-2 justify-between rounded-lg w-full 
        ${isSelected ? "bg-PRIMARY_LIGHT_DARKER" : "bg-white"} 
        border-PRIMARY_NEUTRAL_COLOR`}
    >
      <div className="flex items-center px-3 pt-2 py-1 ">
        <div className="flex w-full ">
          {/* Avatar section */}
          <div className={`relative inline-block `}>
            <Avatar
              color={"PRIMARY_COLOR"}
              imgSrc={headerPerson?.profilePicture}
              alt={`${headerPerson?.firstName || ""} ${
                headerPerson?.lastName || ""
              }`}
            />
            {/* 
              If you'd like to show an online status indicator, uncomment below:
              <div
                className={`absolute w-2 h-2 rounded-full border-white border  ${
                  isOnline ? "bg-green" : "bg-SECONDARY_COLOR"
                }`}
                style={{ bottom: "2%", right: "2%" }}
              />
            */}
          </div>

          <div className="m-1" />

          {/* Info section (Name + Time + Latest Message) */}
          <div className="flex flex-col w-full justify-start items-start">
            <div className="flex flex-row w-full justify-between ">
              <label className="text-xs font-bold text-left">{title}</label>
              <label className="text-xxs font-bold text-PRIMARY_COLOR">
                {formatDateTime(latestTime)}
              </label>
            </div>
            <div className="flex">
              <label
                className={`text-xxs text-left text-grey ${
                  latestMessage ? "" : "italic text-slate-400"
                }`}
              >
                {latestMessage || "Chat is empty"}
              </label>

              {/* 
                If you want to display unread messages:
                <PageNav text={unreadMessages} color="bg-SECONDARY_COLOR" />
              */}
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default MessageHeader;
