import React from "react";
import YellowBell from "../../assets/icons/yellowBell";
import { MainHover, ScaleHover } from "../../styles/animations";
import { displayDatetime, displayTime } from "../../services/micro";

function MinimalReminderItem({ reminder }) {
  return (
    <div
      className={`w-full ${ScaleHover} flex flex-row items-center bg-white justify-between p-2`}
    >
      {/* <div
        style={{ width: "100%" }}
        className="h-full items-center justify-between flex pl-3 gap-3"
      >
        // <div className="h-full flex flex-row items-center gap-3"> */}
      <div className="flex flex-row items-center gap-2">
        <YellowBell size={8} />
        <p className="text-left text-xs">{reminder?.note?.slice(0, 60)}</p>
      </div>

      <div className="flex flex-row  justify-between items-center">
        <p className="text-left text-xxs font-bold text-PRIMARY_COLOR">
          {displayTime(reminder?.datetime)}
        </p>
      </div>
      {/* </div>
      </div> */}
    </div>
  );
}

export default MinimalReminderItem;
