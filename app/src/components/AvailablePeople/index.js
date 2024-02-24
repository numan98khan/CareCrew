import React, { useEffect, useState } from "react";

import { MainHover, ScaleHover } from "../../styles/animations";

import DotMenu from "../../assets/icons/dotMenu";
import { Storage } from "aws-amplify";

import { displayTime } from "../../services/micro";
import themeStyles from "../../styles/theme.styles";

export default function AvailableEmployee({
  index,
  employee,
  startTime,
  endTime,
}) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      const image = await Storage.get(employee.profilePicture);
      console.log("employee.profilePicture", employee.profilePicture);
      setImgUrl(image);
    };

    getImage();
  }, []);
  return (
    <div
      style={{
        border: "1px solid #EDEDED",
        borderRadius: "7px",
        minHeight: "65px",
      }}
      // className={`h-14 w-full border bg-white  flex flex-row items-center justify-between ${ScaleHover}`}
      className={`h-14 w-full border bg-white  flex flex-row items-center justify-between`}
    >
      <div
        style={{ width: "55%" }}
        className="h-full items-center justify-between flex pl-3 gap-3"
      >
        <div className="h-full flex flex-row items-center gap-3">
          {/* <div
            style={{
              borderRadius: "50%",
              height: "40px",
              width: "40px",
              border: "1px solid #EDEDED",
            }}
          > */}
          <img
            style={{
              borderRadius: "50%",
              height: "40px",
              width: "40px",
              border: "1px solid #EDEDED",
            }}
            // className={`w-9 h-9 rounded-full`}
            src={
              imgUrl ? imgUrl : "https://randomuser.me/api/portraits/men/20.jpg"
            }
            alt="User avatar"
          />
          {/* <Im */}
          {/* </div> */}

          <div className="h-full/2 flex flex-col justify-between items-center">
            <p
              style={{
                fontSize: "12px",
                width: "100%",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              {employee?.firstName} {employee?.lastName}
            </p>
            <p
              style={{
                color: themeStyles?.PRIMARY_COLOR,
                fontSize: "12px",
                width: "100%",
                textAlign: "left",
              }}
            >
              {employee?.email}
            </p>
          </div>
        </div>

        {employee?.role && (
          <div
            style={{
              height: "30px",
              backgroundColor:
                employee?.role === "CNA"
                  ? "rgba(255, 175, 50, 0.20)"
                  : employee?.role === "LPN"
                  ? "rgba(180, 103, 192, 0.20)"
                  : employee?.role === "RN" && "rgba(33, 208, 179, 0.20)",
              border:
                employee?.role === "CNA"
                  ? "1px solid " + themeStyles?.SECONDARY_COLOR
                  : employee?.role === "LPN"
                  ? "1px solid #B467C0"
                  : employee?.role === "RN" && "1px solid #21D0B3",
              borderRadius: "20px",
            }}
            className="pl-4 pr-4 flex items-center justify-center"
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color:
                  employee?.role === "CNA"
                    ? themeStyles?.SECONDARY_COLOR
                    : employee?.role === "LPN"
                    ? "#B467C0"
                    : employee?.role === "RN" && "#21D0B3",
              }}
            >
              {employee?.role}
            </p>
          </div>
        )}
      </div>
      <div style={{ width: "45%" }} className="h-full pr-5">
        <div className="h-full flex flex-row items-center gap-3 justify-end">
          <p style={{ fontSize: "13px" }}>
            {startTime
              ? displayTime("1970-01-01T" + startTime) +
                " - " +
                displayTime("1970-01-01T" + endTime)
              : "All Day"}
          </p>
          {/* <DotMenu /> */}
        </div>
      </div>
    </div>
  );
}
