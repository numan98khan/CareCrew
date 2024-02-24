import React, { useState, useEffect } from "react";
import { useListPeople } from "../../apolloql/people";
import InfoCard from "../../components/InfoCards";
import DotMenu from "../../assets/icons/dotMenu";
import themeStyles from "../../styles/theme.styles";

function AllEmployees() {
  const { people: employee } = useListPeople();

  return (
    <>
      <div className="my-2" />
      <InfoCard title={"Available Employees"} />
      <div
        style={{
          maxHeight: "247px",
          height: "100%",
          overflowY: "scroll",
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
        className="pb-2 pl-2 pr-2 pt-2 bg-white flex flex-col gap-1"
      >
        {employee?.map((employee, index) => (
          <div
            style={{
              border: "1px solid #EDEDED",
              borderRadius: "7px",
              minHeight: "65px",
            }}
            className="h-14 w-full border  flex flex-row items-center justify-between"
          >
            <div
              style={{ width: "55%" }}
              className="h-full items-center justify-between flex pl-3 gap-3"
            >
              <div className="h-full flex flex-row items-center gap-3">
                <div
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                    border: "1px solid #EDEDED",
                  }}
                />

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
                <p style={{ fontSize: "13px" }}>7:00-3:00 PM</p>
                <DotMenu />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllEmployees;
