import React from "react";
import OpenIconRed from "../../../assets/icons/indicators/open";
import AssignedIcon from "../../../assets/icons/indicators/green";
import IncentivesIcon from "../../../assets/icons/indicators/incentive";
import GaraunteeIcon from "../../../assets/icons/indicators/guarantee";
import LateIcon from "../../../assets/icons/lateIcon";
import CallOff from "../../../assets/icons/callOf";
import { useAuth } from "../../../context";
import { EMPLOYEE } from "../../../constants/userTypes";

export const ShiftIndicators = () => {
  const { type } = useAuth();

  return (
    <div className="w-full flex flex-wrap items-center justify-center md:justify-end gap-4 p-2">
      {type !== EMPLOYEE && (
        <div className="flex flex-row gap-1 items-center">
          <OpenIconRed />
          <p className="text-xs md:text-sm">Open</p>
        </div>
      )}

      <div className="flex flex-row gap-1 items-center">
        <AssignedIcon />
        <p className="text-xs md:text-sm">Assigned</p>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <IncentivesIcon />
        <p className="text-xs md:text-sm">Incentive</p>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <GaraunteeIcon />
        <p className="text-xs md:text-sm">Guarantee</p>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <LateIcon />
        <p className="text-xs md:text-sm">Late</p>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <CallOff />
        <p className="text-xs md:text-sm">Call Off</p>
      </div>
    </div>
  );
};
