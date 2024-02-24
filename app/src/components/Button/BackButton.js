import React from "react";
import theme from "../../styles/theme.styles";
import BackIcon from "../../assets/icons/menuIcons/backIcon";

const Button = ({ onClick }) => {
  return (
    <button
      className=" text-blue-700 font-semibold hover:text-white rounded-full"
      onClick={onClick}
    >
      <BackIcon />
    </button>
  );
};

export default Button;
