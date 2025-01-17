import React, { useState } from "react";
import themeStyles from "../../styles/theme.styles";
import { useSpring, animated } from "react-spring";

import PageNav from "../../components/PageNav";

// import "./Avatar.css";
// import WhosOnItem from "../../components/WhosOn/index";

import ReadReceiptIcon from "../../assets/icons/readreceipt";
import { displayDate, displayTime } from "../../services/micro";
import { MainHover } from "../../styles/animations";
import { retrieveImage } from "../../services/imageService";

const Message = ({
  profilePicture,
  textMessage,
  title,
  time,
  messageType,
  isSender,
  status,
  document: docObj,
}) => {
  const iconSize = 8;
  // Inside your component...
  const [animationProps, setAnimationProps] = useSpring(() => ({
    scale: 1,
  }));

  const [docPreview, setDocPreview] = useState(null);
  const downloadDocument = async (doc) => {
    const response = await fetch(await retrieveImage(docObj?.key));
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    // setImageUrl(objectURL);

    const link = document.createElement("a");
    link.href = objectURL;
    link.download = docObj.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onCardClick = () => {
    setAnimationProps({
      scale: 1.1,
      reset: true,
      reverse: true,
      from: { scale: 1 },
      config: { duration: 100 },
    });
  };

  const tempDate = displayDate(time);
  const tempTime = displayTime(time);
  const timesubtitle = `${
    tempDate === displayDate(new Date()) ? "Today" : tempDate
  } ${tempTime}`;

  // const timesubtitle = ;

  const docPreviewComponent = () => {
    // docObj
    if (docObj) {
      console.error("🚀 ~ docPreviewComponent ~ docObj:", docObj);
    }
    return (
      <>
        {docObj && (
          <div
            className={`document-section mt-2 bg-gray-200 w-full rounded-lg p-2 my-1 ${MainHover}`}
            onClick={() => downloadDocument(docObj)}
          >
            <div className="flex flex-row text-xs text-PRIMARY_COLOR">
              {docObj.name}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <animated.div
      style={{
        borderRadius: 20,
        transform: animationProps.scale.to((scale) => `scale(${scale})`),
      }}
      //   className={`flex flex-col bg-PRIMARY_NEUTRAL_COLOR justify-between border-PRIMARY_NEUTRAL_COLOR border rounded-lg w-ful shadow-custom-light `}
      className={`flex flex-col px-2 justify-betweenborder rounded-lg w-full ${
        isSender ? "items-end" : null
      }`}
      // style={{ borderRadius: 20 }}
    >
      <div className="flex items-center px-3 pt-2 py-1 ">
        <div className="flex">
          {!isSender ? (
            <>
              <div className="relative inline-block">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm text-white bg-PRIMARY_LIGHT_COLOR`}
                >
                  {/* {"MN"} */}
                  {title ? Array.from(title)[0].toUpperCase() : "?"}
                  {title ? Array.from(title)[1].toUpperCase() : "?"}
                </div>
              </div>
              <div className="m-1" />
            </>
          ) : null}
          <div
            className={`flex flex-col justify-start items-start px-3 py-2 max-w-xs ${
              isSender ? "bg-PRIMARY_LIGHT_DARKER" : "bg-PRIMARY_NEUTRAL_COLOR"
            } ${
              isSender
                ? "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                : "rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
            } word-wrap`} // <- Add the word-wrap class here
          >
            {docPreviewComponent()}
            <div className="flex mb-2 justify-between w-full items-center">
              <label className="text-xxs text-left text-grey">
                {textMessage}
              </label>
              {/* <div className="mx-2" /> */}
              {/* <div>{isSender ? <ReadReceiptIcon size={10} /> : null}</div> */}
            </div>
            <div className="flex w-full justify-between items-center">
              {!isSender ? (
                <>
                  <div className="text-xxs text-grey bg-lightGrey rounded-lg px-2">
                    {messageType}
                  </div>
                  <label className="text-xxs font-bold text-PRIMARY_COLOR">
                    {timesubtitle}
                  </label>
                </>
              ) : (
                <>
                  {/* <div /> */}
                  <div className="text-xxs text-grey bg-lightGrey rounded-lg px-2">
                    {messageType}
                  </div>
                  <label className="text-xxs font-bold text-PRIMARY_COLOR self-end">
                    {timesubtitle}
                  </label>
                </>
              )}

              {/* <label>v</label> */}
            </div>
          </div>
        </div>
      </div>

      {/* {dataComponents} */}
    </animated.div>
  );
};

export default Message;
