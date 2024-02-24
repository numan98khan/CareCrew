import React from "react";
import Logo from "../../assets/logo/logo";
import theme from "../../styles/theme.styles";
import { useState } from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className="animate-spin h-12 w-12 text-blue-500" />
      <p className="mt-2 text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
