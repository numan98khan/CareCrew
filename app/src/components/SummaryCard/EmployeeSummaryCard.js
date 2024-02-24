import React from "react";
import themeStyles from "../../styles/theme.styles";
import { useSpring, animated } from "react-spring";
import { MainHover, ScaleHover } from "../../styles/animations";

import ChevronIcon from "../../assets/icons/camera";
import ForwardIcon from "../../assets/icons/menuIcons/forwardIcon";

const EmployeeSummaryCard = ({
  onClick,
  points,
  text,
  icon,
  gradient = false,
}) => {
  let gradientStyle = {};

  if (gradient) {
    gradientStyle = {
      background: `linear-gradient(to right, ${themeStyles.PRIMARY_COLOR}, ${themeStyles.PRIMARY_LIGHT_COLOR})`, // replace with your desired gradient colors
    };
  } else {
    gradientStyle = {
      background: themeStyles.PRIMARY_COLOR, // replace with your desired gradient colors
    };
  }

  // Inside your component...
  const [animationProps, setAnimationProps] = useSpring(() => ({
    scale: 1,
  }));

  const onCardClick = () => {
    onClick();
    setAnimationProps({
      scale: 1.1,
      reset: true,
      reverse: true,
      from: { scale: 1 },
      config: { duration: 100 },
    });
  };

  return (
    <div
      style={{
        transform: animationProps.scale.to((scale) => `scale(${scale})`),
      }}
      onClick={onCardClick}
      className={`flex flex-col relative justify-between px-4 shadow-lg rounded-xl w-full py-2 bg-white ${ScaleHover}`}
    >
      <div
        // style={}
        className="flex flex-row w-20 h-10 bg-SECONDARY_COLOR opacity-20 rounded-br-full absolute top-0 left-0"
      ></div>

      <div className="text-left my-0  ">
        {points === -1 ? (
          icon
        ) : (
          <label className="text-xl font-bold  text-SECONDARY_COLOR">
            {points}
          </label>
        )}
      </div>

      <div className="my-4" />

      <div className="flex flex-row items-center justify-between">
        <label className="text-sm font-semibold">{text}</label>
        <ForwardIcon />
      </div>
    </div>
  );
};

export default EmployeeSummaryCard;
