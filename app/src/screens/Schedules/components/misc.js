import React, { useState, useEffect, useMemo, useRef } from "react";

import OpenIconRed from "../../../assets/icons/openIcon";

import AssignedIcon from "../../../assets/icons/assignedIcon";
import IncentivesIcon from "../../../assets/icons/incentives";
import GaraunteeIcon from "../../../assets/icons/garaunteeIcon";
import LateIcon from "../../../assets/icons/lateIcon";
import CallOff from "../../../assets/icons/callOf";
import { useAuth } from "../../../context";
import { EMPLOYEE } from "../../../constants/userTypes";

export const ShiftIndicators = () => {
  const { type } = useAuth();
  return (
    <div className="w-full h-8 mt-4 flex flex-row items-center justify-end gap-5">
      {type !== EMPLOYEE && (
        <div className="flex flex-row gap-2 items-center">
          <OpenIconRed />
          <p style={{ fontSize: "13px" }}>Open</p>
        </div>
      )}

      <div className="flex flex-row gap-2 items-center">
        <AssignedIcon />
        <p style={{ fontSize: "13px" }}>Assigned</p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <IncentivesIcon />
        <p style={{ fontSize: "13px" }}>Incentive</p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <GaraunteeIcon />
        <p style={{ fontSize: "13px" }}>Guarantee</p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <LateIcon />
        <p style={{ fontSize: "13px" }}>Late</p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <CallOff />
        <p style={{ fontSize: "13px" }}>Call Off</p>
      </div>
    </div>
  );
};
