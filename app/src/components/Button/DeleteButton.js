import React from "react";
import theme from "../../styles/theme.styles";

const Button = ({ type, children, onClick, color }) => {
  return (
    <button
      // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      className="border rounded-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30"
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: theme.PRIMARY_LIGHT_COLOR,
        color: "#fff",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
