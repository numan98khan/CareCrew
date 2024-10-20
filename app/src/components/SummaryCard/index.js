import React, { useMemo } from "react";
import themeStyles from "../../styles/theme.styles";
import { useSpring, animated } from "react-spring";
import { MainHover, ScaleHover } from "../../styles/animations";

const SummaryCard = ({
  onClick,
  data,
  datakey,
  text,
  icon,
  gradient = false,
  shifts,
  disableHover,
}) => {
  let gradientStyle = {};

  if (gradient) {
    gradientStyle = {
      background: `linear-gradient(to right, ${themeStyles.PRIMARY_COLOR}, ${themeStyles.PRIMARY_LIGHT_COLOR})`, // replace with your desired gradient colors
      // background: `linear-gradient(to right, ${themeStyles.PRIMARY_COLOR}, ${themeStyles.SECONDARY_COLOR})`, // replace with your desired gradient colors
    };
  } else {
    gradientStyle = {
      background: themeStyles.PRIMARY_COLOR, // replace with your desired gradient colors
    };
  }

  gradientStyle = {
    background: "#FFF", // replace with your desired gradient colors
  };

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

  const count = useMemo(() => {
    const positions = shifts?.map((obj) => {
      const numOfPositions = obj?.numOfPositions || "1";
      return typeof numOfPositions === "string"
        ? parseInt(numOfPositions, 10)
        : numOfPositions;
    });

    let totalPositions = positions.reduce((acc, curr) => acc + curr, 0);
    if (datakey === "daily") {
      console.log(
        "🚀 ~ file: index.js:56 ~ count ~ data:",
        totalPositions,
        data
      );

      const positions = data?.open?.map((obj) => {
        const numOfPositions = obj?.numOfPositions || "1";
        return typeof numOfPositions === "string"
          ? parseInt(numOfPositions, 10)
          : numOfPositions;
      });

      totalPositions = positions.reduce((acc, curr) => acc + curr, 0);
      totalPositions += data?.confirmed?.length || 0;
      totalPositions += data?.late?.length || 0;
      totalPositions += data?.calloffs?.length || 0;
      totalPositions += data?.completed?.length || 0;
      totalPositions += data?.inprogress?.length || 0;
      totalPositions += data?.cancelled?.length || 0;
    }

    // console.log("🚀 ~ file: index.js:48 ~ count ~ positions:", positions);
    // console.log("🚀 ~ file: index.js:49 ~ totalPositions:", totalPositions);
    return totalPositions;
  }, [shifts]);

  return (
    <div
      // style={{
      //   transform: animationProps.scale.to((scale) => `scale(${scale})`),
      // }}
      onClick={onCardClick}
      style={gradientStyle}
      // className="flex flex-col justify-between px-4 shadow-lg rounded-lg w-full py-2"
      // className={`flex flex-col justify-between px-4 shadow-lg rounded-2xl w-full py-2 ${
      //   !disableHover && ScaleHover
      // }

      className={`flex flex-col justify-between px-4 shadow-lg rounded-lg w-full py-2 space-y-1 ${
        !disableHover && ScaleHover
      } 
      `}
    >
      <div className="flex justify-between ">{icon}</div>
      <div className="flex justify-between flex-col">
        <label
          className="font-bold text-left"
          style={{
            color: themeStyles.SECONDARY_COLOR,
            fontSize: disableHover ? 38 : 20,
          }}
        >
          {count}
        </label>
        <label
          className=" font-bold self-start text-left"
          style={{ color: themeStyles?.PRIMARY_COLOR, fontSize: 12 }}
        >
          {text}
        </label>
      </div>
      {/* <label
        className=" font-bold self-start text-left bg-gray-300"
        style={{ color: themeStyles?.PRIMARY_COLOR, fontSize: 12 }}
      >
        {text}
      </label> */}
    </div>
  );
};

export default SummaryCard;
