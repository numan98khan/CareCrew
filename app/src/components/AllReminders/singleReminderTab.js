import React from "react";
import YellowBell from "../../assets/icons/yellowBell";
import { ScaleHover } from "../../styles/animations";
import { displayDatetime, displayTime } from "../../services/micro";
import themeStyles from "../../styles/theme.styles";

function SingleReminderTab({ message, datetime }) {
  return (
    <div
      style={{
        border: "1px solid white",
        borderRadius: "0px",
        minHeight: "65px",
        width: "100%",
        backgroundColor: "white",
      }}
      className={`h-14 w-full border  flex flex-row items-center justify-between ${ScaleHover}`}
    >
      <div
        style={{ width: "100%" }}
        className="h-full items-center justify-between flex pl-3 gap-3"
      >
        <div className="h-full flex flex-row items-center gap-3">
          <div
            style={{
              borderRadius: "50%",
              height: "40px",
              width: "40px",
              border: "1px solid #EDEDED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 175, 50, 0.20)",
            }}
          >
            <YellowBell />
          </div>

          <div className="h-full/2 flex flex-col justify-between items-center">
            <p
              style={{
                fontSize: "12px",
                width: "100%",
                textAlign: "left",
                fontWeight: "medium",
              }}
            >
              {message}
            </p>
            <p
              style={{
                color: themeStyles?.PRIMARY_COLOR,
                fontSize: "12px",
                width: "100%",
                textAlign: "left",
              }}
            >
              {displayDatetime(datetime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleReminderTab;
