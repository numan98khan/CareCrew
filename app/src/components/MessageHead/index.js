import React from "react";
import themeStyles from "../../styles/theme.styles";
import { useSpring, animated } from "react-spring";

import PageNav from "../../components/PageNav";

import "./Avatar.css";
import { MainHover } from "../../styles/animations";
import Avatar from "../Avatar";
// import WhosOnItem from "../../components/WhosOn/index";

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

const MessageHeader = ({
  profilePicture,
  people,
  latestMessage,
  latestTime,
  isSelected,
  isOnline,
  unreadMessages,
}) => {
  const iconSize = 8;
  // Inside your component...
  const [animationProps, setAnimationProps] = useSpring(() => ({
    scale: 1,
  }));

  const onCardClick = () => {
    setAnimationProps({
      scale: 1.1,
      reset: true,
      reverse: true,
      from: { scale: 1 },
      config: { duration: 100 },
    });
  };

  // console.log("🚀 ~ file: index.js:79 ~ people:", people);
  const names = people?.map(
    (item) => `${item.people.firstName} ${item.people.lastName}`
  );
  const title = names.join(" & ");

  const headerPerson = people[0]?.people;

  return (
    <animated.div
      style={{
        transform: animationProps.scale.to((scale) => `scale(${scale})`),
      }}
      //   className={`flex flex-col bg-PRIMARY_NEUTRAL_COLOR justify-between border-PRIMARY_NEUTRAL_COLOR border rounded-lg w-ful shadow-custom-light `}
      className={`${MainHover} flex flex-col p-2 justify-between border-PRIMARY_NEUTRAL_COLOR rounded-lg w-full 
        ${isSelected ? "bg-PRIMARY_LIGHT_DARKER" : "bg-white"}`}
      // style={{ borderRadius: 20 }}
    >
      <div className="flex items-center px-3 pt-2 py-1">
        <div className="flex w-full">
          {/* <div></div> */}
          <div className="relative inline-block ">
            <div className="relative">
              <Avatar
                imgSrc={headerPerson?.profilePicture}
                alt={headerPerson?.firstName + " " + headerPerson?.lastName}
              />
              <div
                className={`absolute w-2 h-2 rounded-full border-white border  ${
                  isOnline ? "bg-green" : "bg-SECONDARY_COLOR"
                }`}
                style={{ bottom: "2%", right: "2%" }}
              />
            </div>
          </div>
          <div className="m-1" />

          <div className="flex flex-col w-full justify-start items-start ">
            <div className="flex flex-row w-full justify-between ">
              <label className="text-xs font-bold text-left">{title}</label>
              <label className="text-xxs font-bold text-PRIMARY_COLOR">
                {latestTime ? formatDateTime(latestTime) : ""}
              </label>
            </div>
            <div className="flex">
              <label
                className={`text-xxs text-left text-grey ${
                  latestMessage || "italic text-slate-400"
                }`}
              >
                {latestMessage || "Chat is empty"}
              </label>
              {/* <PageNav text={unreadMessages} color={"bg-SECONDARY_COLOR"} /> */}
            </div>
          </div>
        </div>
      </div>

      {/* {dataComponents} */}
    </animated.div>
  );
};

export default MessageHeader;
