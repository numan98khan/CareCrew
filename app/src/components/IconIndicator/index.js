import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import chroma from "chroma-js";

import theme from "../../styles/theme.styles";

import OpenIndicator from "../../assets/icons/indicators/open";
import IncentiveIndicator from "../../assets/icons/indicators/incentive";
import GuaranteeIndicator from "../../assets/icons/indicators/guarantee";
import UserXIndicator from "../../assets/icons/userx";
import WatchIndicator from "../../assets/icons/watch";

const IconIndicator = ({ title }) => {
  const iconSize = 8;
  return (
    <div
      //   className={`w-full text-sm cursor-pointer flex items-center py-4 px-4 justify-center`}
      className={`flex`}
    >
      <div className="flex items-center text-xxs px-2">
        <OpenIndicator size={iconSize} />
        <label className="ml-1">Open</label>
      </div>
      <div className="flex items-center text-xxs px-2">
        <OpenIndicator isOpen={true} size={iconSize} />
        <label className="ml-1">Assigned</label>
      </div>
      <div className="flex items-center text-xxs px-2">
        <IncentiveIndicator size={iconSize} />
        <label className="ml-1">Incentive</label>
      </div>
      <div className="flex items-center text-xxs px-2">
        <GuaranteeIndicator size={iconSize} />
        <label className="ml-1">Guarantee</label>
      </div>
      <div className="flex items-center text-xxs px-2">
        <WatchIndicator size={iconSize} />
        <label className="ml-1">Late</label>
      </div>
      <div className="flex items-center text-xxs px-2">
        <UserXIndicator size={iconSize} />
        <label className="ml-1">Call Off</label>
      </div>

      {/* </> */}
    </div>
  );
};

export default IconIndicator;
