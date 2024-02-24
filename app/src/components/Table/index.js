import React, { useState } from "react";
// import Card from "../Card"; // make sure to import the Card component
import { Card, Typography } from "@material-tailwind/react";
import TrashIcon from "../../assets/icons/delete"; // make sure to import the TrashIcon component
import FilterButton from "../Button/FilterButton"; // make sure to import the FilterButton component
import TableRow from "../TableRow"; // make sure to import the TableRow component
import PageNav from "../PageNav"; // make sure to import the PageNav component

import DeleteIcon from "../../assets/icons/delete";
import DownloadIcon from "../../assets/icons/download";
import EditIcon from "../../assets/icons/edit";
import EyeIcon from "../../assets/icons/eyeIcon";
import themeStyles from "../../styles/theme.styles";
import { MainHover, ScaleHover } from "../../styles/animations";

import Mail from "../../assets/icons/mail";

import PeopleIcon from "../../assets/icons/menuIcons/people";

import {
  reverseFormatDateTime,
  reverseFormatDate,
  displayDate,
  displayTime,
  displayDatetime,
} from "../../services/micro";
import TimeCardFilterModal from "../Drawers/TimeCardFilterModal/index";
import DownloadAllIcon from "../../assets/icons/downloadAllIcon";
import InvoiceDrawer from "../Drawers/InvoiceDrawer";
import { useNavigate } from "react-router-dom";

import ClockUpIcon from "../../assets/icons/clockUp";
import CheckBox from "../Check";
import { useAuth } from "../../context";
import { ADMIN } from "../../constants/userTypes";

function convertTo12Hour(timeStr) {
  // Split the time string into hours and minutes
  const [hour24, minute] = timeStr.split(":").map((val) => parseInt(val, 10));

  // Determine AM/PM
  const isPM = hour24 >= 12;

  // Convert to 12-hour format
  const hour12 = hour24 % 12 || 12;

  // Format the time string
  const formattedTime = `${hour12}:${minute.toString().padStart(2, "0")} ${
    isPM ? "PM" : "AM"
  }`;

  return formattedTime;
}

const TableComponent = ({
  data,
  config,
  TABLE_HEAD,
  disableHeader,
  disableFilter,

  setSelectedFacility,
  setSelectedPeople,
  setSelectedTimecard,

  disableEdit,
  disableActions,
  disableAvatar,

  disableDownloadAll = true,
  downloadAllAction,

  downloadAction,
  adminHoldAction,

  setSelectedReason,
  setSelectedNews,
  setSelectedPoints,
  setSelectedTemplate,

  editAction,
  messageAction,

  deleteAllAction,
  deleteAction,

  removeUpperPanel,
  isDownloadAll,

  padding,

  setFilterModalOpen,
  setTimecardDetailsModal,

  ///
  selectedItems,
  setSelectedItems,
  //
  setSelectedInvoice,
  openInvoiceModal,
  //
  canPutOnAdminHold,

  //
  whosOnClockIn,
  //
  openReportAnIssue,
  //
  selectAllTimecards,
  selectedTimecards,
  processAllTimecards,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [selectedInvoice, setSelectedInvoice] = useState();

  const { type } = useAuth();

  // // const [isOpenInvoiceModal, setIsOpenInvoiceModal] = useState(false);

  // console.log("SELECTED INVOICE: ", selectedInvoice);

  // function openInvoiceModal() {
  //   setIsOpenInvoiceModal(true);
  // }

  // function onCloseInvoiceModal() {
  //   setIsOpenInvoiceModal(false);
  // }

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // console.log(`TABLE DATA (${config})`, data);

  return (
    <div
      className={`h-full bg-white relative flex-col flex-grow mt-2 ${
        padding ? padding : "p-3"
      } rounded-lg item-start justify-between`}
    >
      <TimeCardFilterModal open={open} onClose={onClose} />
      {/* <InvoiceDrawer
        invoice={selectedInvoice}
        open={isOpenInvoiceModal}
        onClose={onCloseInvoiceModal}
      /> */}

      {/* <TimeCardFilterModal open={open} onClose={onClose} /> */}

      <div>
        {disableHeader ? null : (
          <div className="flex justify-between mb-2">
            <div className="text-sm flex">
              Showing <div className="m-0.5" />
              <strong>{data.length}</strong> <div className="m-0.5" /> out of{" "}
              <div className="m-0.5" />
              <strong>{data.length}</strong> <div className="m-0.5" />
              {config}
            </div>
            <div className="flex justify-between gap-1">
              {type === ADMIN && config === "timecards" && (
                <div
                  onClick={processAllTimecards}
                  className={`mr-2 flex flex-row items-center gap-2 cursor-pointer ${ScaleHover}`}
                >
                  {/* <DownloadAllIcon /> */}
                  {/* <DownloadIcon size={8} /> */}
                  <p
                    style={{
                      fontWeight: "bolder",
                      fontSize: "12px",
                      color: themeStyles?.PRIMARY_COLOR,
                    }}
                  >
                    Process All
                  </p>
                </div>
              )}
              {!disableDownloadAll ? (
                <div
                  onClick={downloadAllAction}
                  className={`mr-2 flex flex-row items-center gap-2 cursor-pointer ${ScaleHover}`}
                >
                  {/* <DownloadAllIcon /> */}
                  <DownloadIcon size={8} />
                  <p
                    style={{
                      fontWeight: "bolder",
                      fontSize: "12px",
                      color: themeStyles?.PRIMARY_COLOR,
                    }}
                  >
                    Download All
                  </p>
                </div>
              ) : null}

              {deleteAllAction ? (
                <button
                  className="p-1 bg-DELETE_LIGHT_PRIMARY rounded-full"
                  onClick={deleteAction}
                >
                  <TrashIcon size={10} />
                </button>
              ) : null}

              {!disableFilter ? (
                <>
                  <div className="mx-1" />
                  <FilterButton
                    text="Filter"
                    onClick={setFilterModalOpen ? setFilterModalOpen : onOpen}
                  />
                </>
              ) : null}
            </div>
          </div>
        )}

        <Card className="overflow-scroll h-full w-full rounded-lg border">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="text-white">
              <tr
              // className="px-2"
              >
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-PRIMARY_COLOR py-2"
                  >
                    {index === 0 && config === "timecards" ? (
                      <CheckBox
                        value={selectedTimecards.length}
                        onChange={(isChecked) => {
                          selectAllTimecards();
                        }}
                      />
                    ) : (
                      <div className="text-xs font-semibold">{head}</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "py-1"
                    : "py-1 border-b border-blue-gray-50";

                  // console.log("Table Items", item);

                  return config === "people" ? (
                    // <div onClick={itemOnClick}>

                    <TableRow
                      index={index}
                      name={item.firstName + " " + item.lastName}
                      classes={classes}
                      // onClick={itemOnClick}
                      // isSquaredImg={true}
                      imgSrc={item?.profilePicture}
                      onClick={() => setSelectedPeople(item)}
                      checkDisabled
                    >
                      {[
                        item.surrogateID, //id.slice(0, 5),
                        item.status,
                        item.role,
                        item.points,
                        item.email,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}

                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div className="h-full flex">
                          {disableEdit ? null : (
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={() => {
                                setSelectedPeople(item);
                                editAction();
                              }}
                            >
                              <EditIcon
                                size={6}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>
                          )}
                          {/* {deleteAction ? (
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={(e) => {
                                e.stopPropagation();
                                // setSelectedPeople(item);
                                deleteAction(item);
                              }}
                            >
                              <DeleteIcon
                                size={10}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>
                          ) : null} */}

                          {adminHoldAction && canPutOnAdminHold ? (
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={(e) => {
                                e.stopPropagation();
                                // setSelectedPeople(item);
                                adminHoldAction(item);
                              }}
                            >
                              <PeopleIcon
                                size={7}
                                color={
                                  item?.adminHold
                                    ? themeStyles.RED
                                    : themeStyles?.PRIMARY_COLOR
                                }
                              />
                            </div>
                          ) : null}
                          {/* <div className="mx-1" />
                          <div className="flex p-2">
                            <DeleteIcon
                              size={10}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div> */}
                        </div>
                      </td>
                    </TableRow>
                  ) : config === "facility_members" ? (
                    // <div onClick={itemOnClick}>

                    <TableRow
                      index={index}
                      name={item.firstName + " " + item.lastName}
                      classes={classes}
                      // onClick={itemOnClick}
                      // isSquaredImg={true}
                      imgSrc={item?.profilePicture}
                      // onClick={() => setSelectedPeople(item)}
                      checkDisabled
                    >
                      {[
                        item.id,
                        item.email,
                        item.phoneNumber,
                        // item.role,
                        // item.points,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}
                    </TableRow>
                  ) : config === "available_employees" ? (
                    <TableRow
                      index={index}
                      name={item.firstName + " " + item.lastName}
                      classes={classes}
                      // onClick={itemOnClick}
                      // isSquaredImg={true}
                      imgSrc={item?.profilePicture}
                      onClick={() => setSelectedPeople(item)}
                      checkDisabled
                    >
                      {[
                        item.id.slice(0, 5),
                        item.day,
                        item.role,
                        item.startTime === undefined &&
                        item.endTime === undefined
                          ? "All Day"
                          : (convertTo12Hour(item.startTime) || "") +
                            " - " +
                            (convertTo12Hour(item.endTime) || ""),
                        item.email,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}

                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div className="h-full flex">
                          {disableEdit ? null : (
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={(e) => {
                                e.stopPropagation();
                                // console.log(
                                //   "🚀 ~ file: index.js:282 ~ data?.map ~ item:",
                                //   item
                                // );

                                navigate("/messaging", {
                                  state: item,
                                });
                              }}
                            >
                              <Mail
                                size={6}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    </TableRow> // </div>
                  ) : config === "facilities" ? (
                    <TableRow
                      index={index}
                      imgSrc={item.imgSrc}
                      isSquaredImg
                      name={item.facilityName}
                      classes={classes}
                      onClick={() => setSelectedFacility(item)}
                      checkDisabled
                    >
                      {[
                        item.contacts[0].firstName +
                          " " +
                          item.contacts[0].lastName,
                        item.contacts[0].phone,
                        item.contacts[0].email,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}

                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div
                          className={`flex items-center ${
                            item?.documents ? ScaleHover : "opacity-20"
                          }`}
                          onClick={
                            item?.documents
                              ? (e) => {
                                  e.stopPropagation(); // Prevent the event from bubbling up
                                  downloadAction(item);
                                }
                              : null
                          }
                        >
                          <DownloadIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          />
                          <div className="mx-1" />
                          <label className="text-xs text-PRIMARY_COLOR font-semibold">
                            Download
                          </label>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex">
                          {disableEdit ? null : (
                            <>
                              <div
                                className={"flex p-2 " + ScaleHover}
                                onClick={() => {
                                  setSelectedFacility(item);
                                  editAction();
                                }}
                              >
                                <EditIcon
                                  size={6}
                                  color={themeStyles.PRIMARY_COLOR}
                                />
                              </div>
                              <div className="mx-1" />
                            </>
                          )}
                          {/* {!deleteAction ? null : (
                            <>
                              <div
                                className={"flex p-2 " + ScaleHover}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent the event from bubbling up
                                  deleteAction(item);
                                }}
                              >
                                <DeleteIcon
                                  size={10}
                                  color={themeStyles.PRIMARY_COLOR}
                                />
                              </div>
                              <div className="mx-1" />
                            </>
                          )} */}
                          {adminHoldAction && canPutOnAdminHold ? (
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={(e) => {
                                e.stopPropagation();
                                // setSelectedPeople(item);
                                adminHoldAction(item);
                              }}
                            >
                              <PeopleIcon
                                size={7}
                                color={
                                  item?.adminHold
                                    ? themeStyles.RED
                                    : themeStyles?.PRIMARY_COLOR
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </TableRow>
                  ) : // </div>
                  config === "whoson" ? (
                    // <div onClick={itemOnClick}>

                    // <div
                    // // onClick={setSelectedFacility(item)}
                    // >
                    <TableRow
                      index={index}
                      imgSrc={item?.person?.profilePicture}
                      // isSquaredImg
                      // name={item.facilityName}
                      name={
                        item?.person?.firstName + " " + item?.person?.lastName
                      }
                      classes={classes}
                      highlightColor={item?.highlightColor}
                      checkDisabled
                      key={index}
                      // onClick={() => setSelectedFacility(item)}
                    >
                      {[
                        item?.person?.id.slice(0, 5),
                        item?.person?.status,
                        item?.person?.role,
                        item?.person?.points,
                        item?.activity,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}

                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div className="h-full flex">
                          {/* {deleteAction ? (
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={(e) => {
                                e.stopPropagation();
                                // setSelectedPeople(item);
                                deleteAction(item);
                              }}
                            >
                              <DeleteIcon
                                size={10}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>
                          ) : null} */}

                          {whosOnClockIn ? (
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={(e) => {
                                e.stopPropagation();
                                // setSelectedPeople(item);
                                whosOnClockIn(item);
                                // console.log(
                                //   "🚀 ~ file: index.js:571 ~ item:",
                                //   item
                                // );
                              }}
                            >
                              <ClockUpIcon
                                size={7}
                                color={
                                  item?.clockInTime
                                    ? themeStyles.RED
                                    : themeStyles.GREEN
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </TableRow>
                  ) : // </div>
                  config === "timecards" ? (
                    // <div onClick={itemOnClick}>

                    // <div
                    // // onClick={setSelectedFacility(item)}
                    // >
                    <TableRow
                      index={index}
                      imgSrc={item?.people?.profilePicture}
                      // isSquaredImg
                      // name={item.facilityName}
                      isCheck={selectedItems.includes(item)}
                      onCheckClick={(e) => {
                        e.stopPropagation();
                        // console.log("🚀 ~ file: index.js:338 ~ ].map ~ e:", e);
                        if (selectedItems.includes(item)) {
                          // Remove item from the list
                          const newSelected = selectedItems.filter(
                            (t) => t !== item
                          );
                          setSelectedItems(newSelected);
                        } else {
                          // Add item to the list
                          setSelectedItems([...selectedItems, item]);
                        }
                      }}
                      name={
                        item?.people?.firstName + " " + item?.people?.lastName
                      }
                      classes={classes}
                      onClick={() => {
                        setSelectedTimecard(item);
                        console.log(
                          "🚀 ~ file: index.js:337 ~ data?.map ~ setSelectedTimecard:",
                          "setSelectedTimecard"
                        );
                        setTimecardDetailsModal();
                      }}
                    >
                      {[
                        displayDate(item?.createdAt),
                        item?.peopleSurrogateID,
                        item?.payrollCycle,
                        reverseFormatDate(item?.clockInTime?.split("T")[1]) +
                          " - " +
                          reverseFormatDate(item?.clockOutTime?.split("T")[1]),
                        // item?.clockInTime + " - " + item?.clockOutTime,
                        `${item?.hours} Hr ${item?.minutes}  Mins  ${
                          item?.isBreak ? "+ 30 min break" : ""
                        }`,
                        item?.rate,
                        item?.isOvertime ? "Yes" : "No",
                        item?.facility?.facilityName,
                        item?.role,
                        item?.incentiveBy || "None",
                        item?.incentiveAmount
                          ? item?.incentiveAmount + item?.incentiveType
                          : "None",
                        // item?.incentiveType,
                        item?.status === "Processed"
                          ? "Processed"
                          : "Not Processed",
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}

                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div
                          className="flex"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadAction(item);
                          }}
                        >
                          <DownloadIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          />
                          <div className="mx-1" />
                          <label className="text-xs text-PRIMARY_COLOR font-semibold">
                            Download
                          </label>
                        </div>
                      </td>

                      {!disableActions ? (
                        <td className={classes}>
                          <div className="flex">
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={() => {
                                // setSelectedPoints(item);
                                editAction(item);
                              }}
                            >
                              <EditIcon
                                size={6}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>

                            <div
                              className="flex p-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAction(item);
                              }}
                            >
                              <DeleteIcon
                                size={10}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>
                          </div>
                        </td>
                      ) : null}
                    </TableRow>
                  ) : // </div>
                  config === "timecards_facility" ? (
                    // <div onClick={itemOnClick}>

                    // <div
                    // // onClick={setSelectedFacility(item)}
                    // >
                    <TableRow
                      index={index}
                      imgSrc={item?.people?.profilePicture}
                      // isSquaredImg
                      // name={item.facilityName}
                      isCheck={selectedItems.includes(item)}
                      onCheckClick={(e) => {
                        e.stopPropagation();
                        // console.log("🚀 ~ file: index.js:338 ~ ].map ~ e:", e);
                        if (selectedItems.includes(item)) {
                          // Remove item from the list
                          const newSelected = selectedItems.filter(
                            (t) => t !== item
                          );
                          setSelectedItems(newSelected);
                        } else {
                          // Add item to the list
                          setSelectedItems([...selectedItems, item]);
                        }
                      }}
                      name={
                        item?.people?.firstName + " " + item?.people?.lastName
                      }
                      classes={classes}
                      onClick={() => {
                        setSelectedTimecard(item);
                        console.log(
                          "🚀 ~ file: index.js:337 ~ data?.map ~ setSelectedTimecard:",
                          "setSelectedTimecard"
                        );
                        setTimecardDetailsModal();
                      }}
                    >
                      {[
                        displayDate(item?.createdAt),
                        reverseFormatDate(item?.clockInTime?.split("T")[1]) +
                          " - " +
                          reverseFormatDate(item?.clockOutTime?.split("T")[1]),
                        // item?.clockInTime + " - " + item?.clockOutTime,
                        `${item?.hours} Hr ${item?.minutes}  Mins  ${
                          item?.isBreak ? "+ 30 min break" : ""
                        }`,
                        item?.facility?.facilityName,
                        item?.role,
                        item?.status === "Processed" ? "Processed" : null,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}

                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div
                          className="flex"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadAction(item);
                          }}
                        >
                          <DownloadIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          />
                          <div className="mx-1" />
                          <label className="text-xs text-PRIMARY_COLOR font-semibold">
                            Download
                          </label>
                        </div>
                      </td>

                      {!disableActions ? (
                        <td className={classes}>
                          <div className="flex">
                            <div
                              className={"flex p-2 " + ScaleHover}
                              onClick={() => {
                                // setSelectedPoints(item);
                                editAction(item);
                              }}
                            >
                              <EditIcon
                                size={6}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>

                            <div
                              className="flex p-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAction(item);
                              }}
                            >
                              <DeleteIcon
                                size={10}
                                color={themeStyles.PRIMARY_COLOR}
                              />
                            </div>
                          </div>
                        </td>
                      ) : null}

                      <td className={classes}>
                        <div
                          className="flex"
                          onClick={(e) => {
                            e.stopPropagation();
                            openReportAnIssue();
                          }}
                        >
                          <label className="text-xs text-PRIMARY_COLOR font-semibold">
                            Report an Issue
                          </label>
                        </div>
                      </td>
                    </TableRow>
                  ) : config === "timecards_employee" ? (
                    <TableRow
                      index={index}
                      imgSrc={item?.facility?.imgSrc}
                      isSquaredImg
                      name={item?.facility?.facilityName}
                      classes={classes}
                      checkDisabled
                      // onClick={() => setSelectedTimecard(item)}
                      onClick={() => {
                        setSelectedTimecard(item);
                        setTimecardDetailsModal();
                      }}
                    >
                      {[
                        displayDate(item?.createdAt),
                        item?.hours + " Hr " + item?.minutes + " Mins",
                        displayTime(item?.clockInTime),
                        displayTime(item?.clockOutTime),
                        // item?.facility?.facilityName,
                        // item?.person?.role,
                        item?.status === "Processed"
                          ? "Processed"
                          : "Not Processed",
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}

                      <td className={classes}>
                        <div
                          className="flex"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadAction(item);
                          }}
                        >
                          <DownloadIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          />
                          <div className="mx-1" />
                          <label className="text-xs text-PRIMARY_COLOR font-semibold">
                            Download
                          </label>
                        </div>
                      </td>

                      <td className={classes}>
                        <div
                          className="flex"
                          onClick={(e) => {
                            e.stopPropagation();
                            openReportAnIssue();
                          }}
                        >
                          <label className="text-xs text-PRIMARY_COLOR font-semibold">
                            Report an Issue
                          </label>
                        </div>
                      </td>
                    </TableRow>
                  ) : config === "templates" ? (
                    <TableRow
                      index={index}
                      // imgSrc={item?.person?.profilePicture}
                      // isSquaredImg
                      // name={item.facilityName}
                      // name={
                      //   item?.person?.firstName + " " + item?.person?.lastName
                      // }
                      classes={classes}
                      highlightColor={item?.highlightColor}
                      onClick={null}
                      checkDisabled={true}
                    >
                      {[
                        item?.subject,
                        item?.alt?.slice(0, 50), //body.slice(0, 20),
                        item?.status,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}
                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div className="flex">
                          {/* <EditIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          /> */}
                          <div
                            className={"flex p-2 " + ScaleHover}
                            onClick={() => {
                              setSelectedTemplate(item);
                              editAction();
                            }}
                          >
                            <EditIcon
                              size={6}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                          <div className="mx-1" />
                          <div
                            className={"flex p-2 " + ScaleHover}
                            onClick={() => {
                              // setSelectedTemplate(item);
                              deleteAction(item?.id);
                            }}
                          >
                            <DeleteIcon
                              size={10}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                        </div>
                      </td>
                    </TableRow>
                  ) : config === "news" ? (
                    <TableRow
                      index={index}
                      classes={classes}
                      highlightColor={item?.highlightColor}
                      onClick={null}
                      checkDisabled={true}
                    >
                      {[
                        reverseFormatDateTime(item?.createdAt) +
                          " " +
                          reverseFormatDate(item?.createdAt),
                        item?.headline?.slice(0, 40),
                        // item?.news.slice(0, 20),
                        item?.alt?.slice(0, 40),
                        item?.status,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}
                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div className="flex">
                          {/* <EditIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          /> */}
                          <div
                            className={"flex p-2 " + ScaleHover}
                            onClick={() => {
                              setSelectedNews(item);
                              editAction();
                            }}
                          >
                            <EditIcon
                              size={6}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                          <div className="mx-1" />
                          <div
                            className={"flex p-2 " + ScaleHover}
                            onClick={() => {
                              setSelectedNews(item);
                              deleteAction();
                            }}
                          >
                            <DeleteIcon
                              size={10}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                        </div>
                      </td>
                    </TableRow>
                  ) : config === "points" ? (
                    <TableRow
                      index={index}
                      classes={classes}
                      highlightColor={item?.highlightColor}
                      onClick={null}
                    >
                      {[item?.reason, item?.point].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}
                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div className="flex">
                          {/* <EditIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          /> */}
                          <div
                            className={"flex p-2 " + ScaleHover}
                            onClick={() => {
                              setSelectedPoints(item);
                              editAction();
                            }}
                          >
                            <EditIcon
                              size={6}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                          <div className="mx-1" />
                          <div className="flex p-2">
                            <DeleteIcon
                              size={10}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                        </div>
                      </td>
                    </TableRow>
                  ) : config === "reasons" ? (
                    <TableRow
                      index={index}
                      classes={classes}
                      highlightColor={item?.highlightColor}
                      onClick={null}
                      checkDisabled={true}
                    >
                      {[
                        item?.reason?.slice(0, 40),
                        item?.area,
                        item?.status,
                      ].map((datapoint, i) => {
                        return (
                          <td key={i} className={classes}>
                            <label className="font-normal text-xs">
                              {datapoint}
                            </label>
                          </td>
                        );
                      })}
                      <td
                        className={classes}
                        // className={"items-center border-b border-blue-gray-50"}
                        // style={{ height: "100%" }}
                      >
                        <div className="flex">
                          {/* <EditIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          /> */}
                          <div
                            className={"flex p-2 " + ScaleHover}
                            onClick={() => {
                              setSelectedReason(item);
                              editAction();
                            }}
                          >
                            <EditIcon
                              size={6}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                          <div className="mx-1" />
                          <div
                            className={"flex p-2 " + ScaleHover}
                            onClick={() => {
                              // setSelectedTemplate(item);
                              deleteAction(item?.id);
                            }}
                          >
                            <DeleteIcon
                              size={10}
                              color={themeStyles.PRIMARY_COLOR}
                            />
                          </div>
                        </div>
                      </td>
                    </TableRow>
                  ) : config === "invoice_facility" ? (
                    <TableRow
                      index={index}
                      name={item.surrogateID}
                      classes={classes}
                      onClick={() => {
                        setSelectedInvoice(data[index]);
                        openInvoiceModal();
                      }}
                      disableAvatar={disableAvatar}
                      checkDisabled={true}
                    >
                      {[
                        displayDate(item.createdAt),
                        displayDate(item.dueDate),
                        item.amount,
                      ].map((datapoint, i) => {
                        return (
                          <>
                            <td key={i} className={classes}>
                              <label className="font-normal text-xs">
                                {datapoint}
                              </label>
                            </td>
                          </>
                        );
                      })}

                      <td className={classes}>
                        <div className="h-full flex flex-row justify-between w-full">
                          <div
                            style={{ width: "40%" }}
                            className={"flex p-2 bg-blue-500" + ScaleHover}
                            onClick={() => {
                              // setSelectedTemplate(item);
                              downloadAction(item);
                            }}
                          >
                            <div className="ml-10 flex flex-row items-center gap-2 cursor-pointer">
                              <DownloadIcon />
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

                          {/* <div className="mx-1" />
                            <div
                              onClick={() => {
                                setSelectedInvoice(data[index]);
                                openInvoiceModal();
                              }}
                              className="flex p-2"
                            >
                              <EyeIcon />
                            </div> */}
                        </div>
                      </td>
                    </TableRow>
                  ) : (
                    config === "invoice" && (
                      <TableRow
                        index={index}
                        name={item.surrogateID}
                        classes={classes}
                        onClick={() => {
                          setSelectedInvoice(data[index]);
                          openInvoiceModal();
                        }}
                        disableAvatar={disableAvatar}
                        checkDisabled={true}
                      >
                        {[
                          item?.facilityName,
                          displayDate(item.createdAt),
                          displayDate(item.dueDate),
                          item.amount,
                        ].map((datapoint, i) => {
                          return (
                            <>
                              <td key={i} className={classes}>
                                <label className="font-normal text-xs">
                                  {datapoint}
                                </label>
                              </td>
                            </>
                          );
                        })}

                        <td className={classes}>
                          <div className="h-full flex flex-row justify-between w-full">
                            <div
                              style={{ width: "40%" }}
                              className={"flex p-2 bg-blue-500" + ScaleHover}
                              onClick={() => {
                                // setSelectedTemplate(item);
                                downloadAction(item);
                              }}
                            >
                              <div className="ml-10 flex flex-row items-center gap-2 cursor-pointer">
                                <DownloadIcon />
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
                            {/* <div className="mx-1" />
                            <div
                              onClick={() => {
                                setSelectedInvoice(data[index]);
                                openInvoiceModal();
                              }}
                              className="flex p-2"
                            >
                              <EyeIcon />
                            </div> */}
                          </div>
                        </td>
                      </TableRow>
                    )
                  );
                })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default TableComponent;
