import React from "react";
import themeStyles from "../../styles/theme.styles";
import { useSpring, animated } from "react-spring";

import InfoTitle from "../Headers/InfoTitle";

import { MainHover, ScaleHover } from "../../styles/animations";
// import WhosOnItem from "../../components/WhosOn/index";

const ShiftCard = ({ index, headline, news, author, datetime, limitText }) => {
  const iconSize = 8;
  // Inside your component...
  const [animationProps, setAnimationProps] = useSpring(() => ({
    scale: 1,
  }));

  // Limit the text length if limitText prop is true
  const limitedHeadline = limitText
    ? headline.length > 50
      ? headline.substring(0, 50) + "..."
      : headline
    : headline;
  const limitedNews = limitText
    ? news.length > 100
      ? news.substring(0, 100) + "..."
      : news
    : news;

  const textWrapStyle = !limitText
    ? { wordWrap: "break-word", overflowWrap: "break-word" }
    : {};

  return (
    <>
      <div
        className={`flex flex-col justify-between p-2 border-PRIMARY_NEUTRAL_COLOR border rounded-lg w-full bg-white shadow-custom-light ${ScaleHover}`}
      >
        <div className="flex w-full items-center justify-between">
          <label
            className="w-full text-left text-PRIMARY_COLOR text-xxs font-bold"
            style={textWrapStyle}
          >
            {limitedHeadline}
          </label>
          <label className="text-left text-xxxs ">{datetime}</label>
        </div>
        <div className="my-1" />
        <label
          className="w-full text-left text-grey text-xxs "
          style={textWrapStyle}
        >
          {limitedNews}
        </label>

        <div className="my-1" />
        <label className="w-full text-left text-xxs ">{author}</label>
      </div>
    </>
  );
};

export default ShiftCard;
