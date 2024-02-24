import React from "react";
import theme from "../../styles/theme.styles";
import FilterIcon from "../../assets/icons/filter";

import { MainHover } from "../../styles/animations";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 p-1 rounded-full bg-PRIMARY_LIGHT_COLOR border-PRIMARY_LIGHT_COLOR text-white text-xs font-semibold ${MainHover}`}
    >
      <div className="flex items-center justify-around px-1">
        <FilterIcon size={8} />
        <div className="mx-1" />
        {text}
      </div>
    </button>
  );
};

export default Button;
