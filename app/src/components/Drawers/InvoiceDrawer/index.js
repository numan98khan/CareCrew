import React, { useEffect, useState, useRef } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import themeStyles from "../../../styles/theme.styles";
import Button from "../../Button";
import StarRating from "../../StarRating";
import InputField from "../../Input";
import DropDown from "../../DropDown";

import Image from "../../../assets/icons/image";
import Camera from "../../../assets/icons/camera";

import { useCreateReview } from "../../../apolloql/reviews";
import { ErrorToast, SuccessToast, displayDate } from "../../../services/micro";
import { ScaleHover } from "../../../styles/animations";
import { useUpdatePeople } from "../../../apolloql/people";
import { useS3Upload } from "../../../services/uploadFileToS3";
import DownloadAllIcon from "../../../assets/icons/downloadAllIcon";

function InvoiceDrawer({
  open,
  onClose,
  invoice,
  modalContentRef,
  downloadPDF,
  isDownload,
}) {
  // const [rating, setRating] = useState(0);
  // const [review, setReview] = useState("");

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="right"
        overlayOpacity={0}
        style={{ bottom: "0", top: "initial", height: "94vh", width: "300px" }}
      >
        <div
          className=" flex h-full w-full relative justify-center items-center p-3"
          ref={modalContentRef}
        >
          <div
            style={{ backgroundColor: themeStyles.PRIMARY_LIGHT_COLOR }}
            className="absolute w-full h-1 top-0"
          />

          <div className="h-full w-full space-y-2">
            <div className="flex flex-col text-left w-full row-auto justify-between items-start">
              <p style={{ fontSize: "24px" }} className="text-xl font-bold">
                {invoice?.facilityName}
              </p>
              <p
                style={{ fontSize: "12px" }}
                className="text-xl font-bold text-PRIMARY_COLOR"
              >
                Due: {displayDate(invoice?.dueDate)}
              </p>

              <div className="w-full mt-10 mb-10 h-10 flex flex-col gap-3">
                <p style={{ fontSize: "12px" }}>{invoice?.date}</p>

                <div
                  style={{ backgroundColor: themeStyles.PRIMARY_VERY_LIGHT }}
                  className="w-full p-3 flex flex-col items-start justify-start"
                >
                  <div className="w-full h-full flex flex-col gap-3">
                    <p
                      style={{
                        color: themeStyles.PRIMARY_COLOR,
                        fontWeight: "bold",
                      }}
                    >
                      Invoice: {invoice?.surrogateID}
                    </p>

                    <div className="w-full flex flex-col gap-1 mb-4">
                      <div
                        style={{
                          gridTemplateColumns: "2.5fr 1fr 1fr",
                          fontSize: "13px",
                          color: "grey",
                        }}
                        className="w-full grid"
                      >
                        <p className="w-full">Description</p>
                        <p className="w-full">Qty</p>
                        <p className="w-full">Amount</p>
                      </div>

                      {invoice?.description?.map((item, index) => {
                        return (
                          <div
                            style={{
                              backgroundColor: themeStyles.PRIMARY_MEDIUM_LIGHT,
                              borderRadius: "5px",
                              gridTemplateColumns: "2.5fr 1fr 1fr",
                              fontSize: "11px",
                              fontWeight: "bold",
                              placeItems: "center",
                            }}
                            className="w-full py-2 grid pl-2 pr-2"
                          >
                            <p className="w-full">{item?.description}</p>
                            <p className="w-full">{item?.quantity}</p>
                            <p
                              style={{ textAlign: "right" }}
                              className="w-full"
                            >
                              ${item?.amount}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="w-full flex flex-row items-center justify-between pb-3">
                      <p
                        style={{
                          fontSize: "14px",
                          color: themeStyles.PRIMARY_COLOR,
                          fontWeight: "bold",
                        }}
                      >
                        Total Invoice Amount
                      </p>

                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        ${invoice?.amount}
                      </p>
                    </div>
                  </div>
                </div>

                {!isDownload && (
                  <div
                    className="w-full flex flex-row items-center justify-center mt-5 pb-3"
                    onClick={() => downloadPDF(invoice)}
                  >
                    <div className="mr-2 flex flex-row items-center gap-2 cursor-pointer">
                      <DownloadAllIcon />
                      <p
                        style={{
                          fontWeight: "bolder",
                          fontSize: "12px",
                          color: themeStyles?.PRIMARY_COLOR,
                        }}
                      >
                        Download Invoice
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default InvoiceDrawer;
