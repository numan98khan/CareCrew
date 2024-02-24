import React, { useState } from "react";
import theme from "../../styles/theme.styles";
import { MainHover } from "../../styles/animations";

const OptionTab = ({ options, selectedOption, onOptionChange }) => {
  const [activeOption, setActiveOption] = useState(options[0]);

  // const handleClick = (option) => {
  //   setActiveOption(option);
  // };

  const handleClick = (option) => {
    setActiveOption(option);
    onOptionChange && onOptionChange(option); // This will notify the parent about the option change
  };

  return (
    <div className="flex justify-around border ">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleClick(option)}
          className={`w-full text-sm cursor-pointer flex-grow items-center p-2 justify-center ${
            option === selectedOption ? "bg-lightGrey" : "bg-white"
          } ${MainHover}`}
        >
          <div
            className={`w-full h-full text-sm cursor-pointer flex items-center px-4 justify-center  ${MainHover}`}
            style={{
              // borderBottom:
              //   option === activeOption
              //     ? `4px solid ${theme.PRIMARY_LIGHT_COLOR}`
              //     : "",
              opacity: option === selectedOption ? "1" : "0.4",
            }}
          >
            <label className="text-xxs mr-1 ">{option}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionTab;
