import React, { useState } from "react";
import theme from "../../styles/theme.styles";
import { MainHover } from "../../styles/animations";

const OptionTab = ({ options }) => {
  const [activeOption, setActiveOption] = useState(options[0]);

  const handleClick = (option) => {
    setActiveOption(option);
  };

  return (
    <div className="flex justify-around border-2  divide-x rounded">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleClick(option)}
          className={`w-full text-sm cursor-pointer flex-grow items-center p-1.5 justify-center${
            option === activeOption ? "bg-grey" : ""
          } ${MainHover}`}
        >
          <div
            className={`w-full h-full text-sm cursor-pointer flex items-center justify-center`}
            style={{
              // borderBottom:
              //   option === activeOption
              //     ? `4px solid ${theme.PRIMARY_LIGHT_COLOR}`
              //     : "",
              opacity: option === activeOption ? "1" : "0.4",
            }}
          >
            <label className="text-xxs mr-1 ">{option.title}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionTab;
