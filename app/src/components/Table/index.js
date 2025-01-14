import React, { useState } from "react";
import { Card } from "@material-tailwind/react";
import TrashIcon from "../../assets/icons/delete";
import FilterButton from "../Button/FilterButton";
import DeleteIcon from "../../assets/icons/delete";
import DownloadIcon from "../../assets/icons/download";
import EditIcon from "../../assets/icons/edit";
import EyeIcon from "../../assets/icons/eyeIcon";
import themeStyles from "../../styles/theme.styles";
import { MainHover, ScaleHover } from "../../styles/animations";
import Mail from "../../assets/icons/mail";
import PeopleIcon from "../../assets/icons/menuIcons/people";
import DownloadAllIcon from "../../assets/icons/downloadAllIcon";
import InvoiceDrawer from "../Drawers/InvoiceDrawer";
import TimeCardFilterModal from "../Drawers/TimeCardFilterModal";
import { useNavigate } from "react-router-dom";
import ClockUpIcon from "../../assets/icons/clockUp";
import CheckBox from "../Check";
import { useAuth } from "../../context";
import { ADMIN } from "../../constants/userTypes";
import {
  reverseFormatDateTime,
  reverseFormatDate,
  displayDate,
  displayTime,
} from "../../services/micro";

/** Converts 24-hour time (HH:mm) to 12-hour format (hh:mm AM/PM). */
function convertTo12Hour(timeStr) {
  const [hour24, minute] = timeStr.split(":").map((val) => parseInt(val, 10));
  const isPM = hour24 >= 12;
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${
    isPM ? "PM" : "AM"
  }`;
}

/** A reusable 'card' component for each data record. */

/** A reusable 'card' component for each data record. */
const ListItemCard = ({
  title,
  subtitle,
  secondaryText,
  avatarUrl,
  highlightColor,
  onClick,
  onCheck, // presence implies we want a checkbox
  isChecked,
  actions,
  children,
  enableAvatar,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col p-3 border rounded-md shadow-sm hover:shadow-md bg-white text-left ${
        highlightColor ? `border-[${highlightColor}]` : ""
      } ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Absolutely-positioned checkbox in top-right if onCheck is provided */}
      {typeof onCheck === "function" && (
        <div className="absolute top-3 right-3">
          <CheckBox
            value={isChecked}
            onChange={(e) => {
              e.stopPropagation(); // Prevent event from reaching parent
              onCheck(e);
            }}
          />
        </div>
      )}

      {/* Avatar + Title + Subtitle */}
      <div className="flex items-start mb-2">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
        ) : enableAvatar ? (
          <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-600 font-bold text-sm">
            {/* Default Placeholder */}
            {title
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        ) : null}

        <div className="flex-1 flex flex-col">
          <div className="text-sm font-semibold text-gray-800">{title}</div>
          {subtitle && (
            <div className="text-xs text-gray-500 mt-1 truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Body / Additional text */}
      {secondaryText && (
        <div className="text-xs text-gray-500 mt-2 mb-2">{secondaryText}</div>
      )}
      {children}

      {/* Footer: Actions */}
      {actions && (
        <div className="flex items-center mt-4 space-x-3">{actions}</div>
      )}
    </div>
  );
};

// export default ListItemCard;

const GridView = ({
  data = [],
  config,
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
  selectedItems,
  setSelectedItems,
  setSelectedInvoice,
  openInvoiceModal,
  canPutOnAdminHold,
  whosOnClockIn,
  openReportAnIssue,
  selectAllTimecards,
  selectedTimecards,
  processAllTimecards,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { type } = useAuth();

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div
      className={`h-full bg-white relative flex-col flex-grow mt-2 ${
        padding ? padding : "p-3"
      } rounded-lg item-start justify-between`}
    >
      <TimeCardFilterModal open={open} onClose={onClose} />
      {/* <InvoiceDrawer ... /> If needed */}

      {/* Top Panel */}
      {!disableHeader && (
        <div className="flex justify-between mb-4 items-center">
          <div className="text-sm flex text-left">
            Showing <div className="mx-1" />
            <strong>{data.length}</strong> out of <strong>{data.length}</strong>{" "}
            {config}
          </div>

          <div className="flex justify-between gap-1">
            {type === ADMIN && config === "timecards" && (
              <div
                onClick={processAllTimecards}
                className={`mr-2 flex flex-row items-center gap-2 cursor-pointer ${ScaleHover}`}
              >
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
            {!disableDownloadAll && (
              <div
                onClick={downloadAllAction}
                className={`mr-2 flex flex-row items-center gap-2 cursor-pointer ${ScaleHover}`}
              >
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
            )}

            {deleteAllAction && (
              <button
                className="p-1 bg-DELETE_LIGHT_PRIMARY rounded-full"
                onClick={deleteAction}
              >
                <TrashIcon size={10} />
              </button>
            )}

            {!disableFilter && (
              <FilterButton
                text="Filter"
                onClick={setFilterModalOpen ? setFilterModalOpen : onOpen}
              />
            )}
          </div>
        </div>
      )}

      {/* 
        Multi-column grid for the items:
        - grid-cols-1: default single column
        - sm:grid-cols-2: 2 columns on small screens
        - lg:grid-cols-3: 3 columns on large screens
        - xl:grid-cols-4: 4 columns on extra large screens
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((item, index) => {
          // Same config-specific logic, but with <ListItemCard>.

          if (config === "people") {
            return (
              <ListItemCard
                enableAvatar={true}
                key={index}
                avatarUrl={!disableAvatar ? item?.profilePicture : null} // Pass avatar URL
                title={`${item.firstName} ${item.lastName}`}
                subtitle={`ID: ${item.surrogateID} | Status: ${item.status}`}
                secondaryText={`Role: ${item.role} | Points: ${item.points} | ${item.email}`}
                onClick={() => setSelectedPeople(item)}
                actions={
                  !disableEdit || deleteAction || adminHoldAction ? (
                    <>
                      {!disableEdit && (
                        <div
                          className={"flex p-2 " + ScaleHover}
                          onClick={(e) => {
                            e.stopPropagation();
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
                      {adminHoldAction && canPutOnAdminHold && (
                        <div
                          className={"flex p-2 " + ScaleHover}
                          onClick={(e) => {
                            e.stopPropagation();
                            adminHoldAction(item);
                          }}
                        >
                          <PeopleIcon
                            size={7}
                            color={
                              item?.adminHold
                                ? themeStyles.RED
                                : themeStyles.PRIMARY_COLOR
                            }
                          />
                        </div>
                      )}
                      {deleteAction && type == ADMIN && (
                        <div
                          className={"flex p-2 " + ScaleHover}
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
                      )}
                    </>
                  ) : null
                }
              />
            );
          }

          if (config === "facilities") {
            return (
              <ListItemCard
                enableAvatar={true}
                key={index}
                avatarUrl={!disableAvatar ? item.imgSrc : null} // Pass avatar URL
                title={item.facilityName}
                subtitle={`Contact: ${item?.contacts?.[0]?.firstName} ${item?.contacts?.[0]?.lastName}`}
                secondaryText={`Phone: ${item?.contacts?.[0]?.phone} | Email: ${item?.contacts?.[0]?.email}`}
                onClick={() => setSelectedFacility(item)}
                actions={
                  <>
                    <div
                      className={`flex items-center ${
                        item?.documents ? ScaleHover : "opacity-20"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item?.documents) downloadAction(item);
                      }}
                    >
                      <DownloadIcon
                        size={6}
                        color={themeStyles.PRIMARY_COLOR}
                      />
                    </div>
                    {!disableEdit && (
                      <div
                        className={"flex p-2 " + ScaleHover}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFacility(item);
                          editAction();
                        }}
                      >
                        <EditIcon size={6} color={themeStyles.PRIMARY_COLOR} />
                      </div>
                    )}
                    {adminHoldAction && canPutOnAdminHold && (
                      <div
                        className={"flex p-2 " + ScaleHover}
                        onClick={(e) => {
                          e.stopPropagation();
                          adminHoldAction(item);
                        }}
                      >
                        <PeopleIcon
                          size={7}
                          color={
                            item?.adminHold
                              ? themeStyles.RED
                              : themeStyles.PRIMARY_COLOR
                          }
                        />
                      </div>
                    )}
                    {deleteAction && (
                      <div
                        className={"flex p-2 " + ScaleHover}
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
                    )}
                  </>
                }
              />
            );
          }

          if (config === "available_employees") {
            const timeStr =
              item.startTime === undefined && item.endTime === undefined
                ? "All Day"
                : `${convertTo12Hour(item.startTime || "")} - ${convertTo12Hour(
                    item.endTime || ""
                  )}`;
            return (
              <ListItemCard
                key={index}
                avatarUrl={!disableAvatar ? item?.profilePicture : null}
                title={`${item.firstName} ${item.lastName}`}
                subtitle={`ID: ${item.id.slice(0, 5)} | Day: ${item.day}`}
                secondaryText={`Role: ${item.role} | Time: ${timeStr} | ${item.email}`}
                onClick={() => setSelectedPeople(item)}
                actions={
                  !disableEdit ? (
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/messaging", { state: item });
                      }}
                    >
                      <Mail size={6} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                  ) : null
                }
              />
            );
          }

          if (config === "whoson") {
            return (
              <ListItemCard
                key={index}
                avatarUrl={!disableAvatar ? item?.person?.profilePicture : null}
                title={`${item?.person?.firstName} ${item?.person?.lastName}`}
                subtitle={`ID: ${item?.person?.id.slice(0, 5)} | Role: ${
                  item?.person?.role
                }`}
                secondaryText={`Status: ${item?.person?.status} | Points: ${
                  item?.person?.points
                } | Activity: ${item?.activity || ""}`}
                highlightColor={item?.highlightColor}
                actions={
                  whosOnClockIn && (
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        whosOnClockIn(item);
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
                  )
                }
              />
            );
          }

          if (config === "timecards") {
            const isItemSelected = selectedItems.includes(item);
            return (
              <ListItemCard
                key={index}
                avatarUrl={!disableAvatar ? item?.people?.profilePicture : null}
                title={`${item?.people?.firstName} ${item?.people?.lastName}`}
                subtitle={`${displayDate(item?.createdAt)} | SurrogateID: ${
                  item?.peopleSurrogateID
                }`}
                secondaryText={`Cycle: ${item?.payrollCycle} | Hours: ${
                  item?.hours
                }h ${item?.minutes}m ${
                  item?.isBreak ? "+30m break" : ""
                } | Rate: ${item?.rate}`}
                onClick={() => {
                  setSelectedTimecard(item);
                  setTimecardDetailsModal?.();
                }}
                isChecked={isItemSelected}
                onCheck={() => {
                  if (isItemSelected) {
                    setSelectedItems(selectedItems.filter((t) => t !== item));
                  } else {
                    setSelectedItems([...selectedItems, item]);
                  }
                }}
                actions={
                  !disableActions ? (
                    <>
                      <div
                        className={"flex p-2 " + ScaleHover}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadAction(item);
                        }}
                      >
                        <DownloadIcon
                          size={6}
                          color={themeStyles.PRIMARY_COLOR}
                        />
                      </div>
                      <div
                        className={"flex p-2 " + ScaleHover}
                        onClick={(e) => {
                          e.stopPropagation();
                          editAction(item);
                        }}
                      >
                        <EditIcon size={6} color={themeStyles.PRIMARY_COLOR} />
                      </div>
                      <div
                        className={"flex p-2 " + ScaleHover}
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
                    </>
                  ) : (
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadAction(item);
                      }}
                    >
                      <DownloadIcon
                        size={6}
                        color={themeStyles.PRIMARY_COLOR}
                      />
                    </div>
                  )
                }
              />
            );
          }

          if (config === "timecards_facility") {
            const isItemSelected = selectedItems.includes(item);
            return (
              <ListItemCard
                key={index}
                avatarUrl={!disableAvatar ? item?.people?.profilePicture : null}
                title={`${item?.people?.firstName} ${item?.people?.lastName}`}
                subtitle={`Date: ${displayDate(
                  item?.createdAt
                )} | Time: ${reverseFormatDate(
                  item?.clockInTime?.split("T")[1]
                )} - ${reverseFormatDate(item?.clockOutTime?.split("T")[1])}`}
                secondaryText={`Hours: ${item?.hours}h ${item?.minutes}m ${
                  item?.isBreak ? "+30m break" : ""
                } | Facility: ${item?.facility?.facilityName}`}
                onClick={() => {
                  setSelectedTimecard(item);
                  setTimecardDetailsModal();
                }}
                isChecked={isItemSelected}
                onCheck={() => {
                  if (isItemSelected) {
                    setSelectedItems(selectedItems.filter((t) => t !== item));
                  } else {
                    setSelectedItems([...selectedItems, item]);
                  }
                }}
                actions={
                  <>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadAction(item);
                      }}
                    >
                      <DownloadIcon
                        size={6}
                        color={themeStyles.PRIMARY_COLOR}
                      />
                    </div>
                    {!disableActions && (
                      <>
                        <div
                          className={"flex p-2 " + ScaleHover}
                          onClick={(e) => {
                            e.stopPropagation();
                            editAction(item);
                          }}
                        >
                          <EditIcon
                            size={6}
                            color={themeStyles.PRIMARY_COLOR}
                          />
                        </div>
                        <div
                          className={"flex p-2 " + ScaleHover}
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
                      </>
                    )}
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        openReportAnIssue();
                      }}
                    >
                      <label className="text-xs text-PRIMARY_COLOR font-semibold">
                        Report an Issue
                      </label>
                    </div>
                  </>
                }
              />
            );
          }

          if (config === "timecards_employee") {
            return (
              <ListItemCard
                key={index}
                avatarUrl={!disableAvatar ? item?.facility?.imgSrc : null}
                title={item?.facility?.facilityName}
                subtitle={`Date: ${displayDate(item?.createdAt)} | Hours: ${
                  item?.hours
                }h ${item?.minutes}m`}
                secondaryText={`ClockIn: ${displayTime(
                  item?.clockInTime
                )} | ClockOut: ${displayTime(item?.clockOutTime)}`}
                onClick={() => {
                  setSelectedTimecard(item);
                  setTimecardDetailsModal();
                }}
                actions={
                  <>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadAction(item);
                      }}
                    >
                      <DownloadIcon
                        size={6}
                        color={themeStyles.PRIMARY_COLOR}
                      />
                    </div>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        openReportAnIssue();
                      }}
                    >
                      <label className="text-xs text-PRIMARY_COLOR font-semibold">
                        Report an Issue
                      </label>
                    </div>
                  </>
                }
              />
            );
          }

          if (config === "templates") {
            return (
              <ListItemCard
                key={index}
                title={item?.subject}
                subtitle={item?.alt?.slice(0, 50)}
                secondaryText={`Status: ${item?.status}`}
                actions={
                  <>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => {
                        setSelectedTemplate(item);
                        editAction();
                      }}
                    >
                      <EditIcon size={6} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => deleteAction(item?.id)}
                    >
                      <DeleteIcon size={10} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                  </>
                }
              />
            );
          }

          if (config === "news") {
            return (
              <ListItemCard
                key={index}
                title={`Headline: ${item?.headline?.slice(0, 40)}`}
                subtitle={`Date: ${reverseFormatDateTime(
                  item?.createdAt
                )} ${reverseFormatDate(item?.createdAt)}`}
                secondaryText={`Body: ${item?.alt?.slice(0, 40)} | Status: ${
                  item?.status
                }`}
                actions={
                  <>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => {
                        setSelectedNews(item);
                        editAction();
                      }}
                    >
                      <EditIcon size={6} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => {
                        setSelectedNews(item);
                        deleteAction();
                      }}
                    >
                      <DeleteIcon size={10} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                  </>
                }
              />
            );
          }

          if (config === "points") {
            return (
              <ListItemCard
                key={index}
                title={`Reason: ${item?.reason}`}
                subtitle={`Points: ${item?.point}`}
                actions={
                  <>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => {
                        setSelectedPoints(item);
                        editAction();
                      }}
                    >
                      <EditIcon size={6} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => {
                        deleteAction(item);
                      }}
                    >
                      <DeleteIcon size={10} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                  </>
                }
              />
            );
          }

          if (config === "reasons") {
            return (
              <ListItemCard
                key={index}
                title={`Reason: ${item?.reason?.slice(0, 40)}`}
                subtitle={`Area: ${item?.area} | Status: ${item?.status}`}
                actions={
                  <>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => {
                        setSelectedReason(item);
                        editAction();
                      }}
                    >
                      <EditIcon size={6} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                    <div
                      className={"flex p-2 " + ScaleHover}
                      onClick={() => {
                        deleteAction(item?.id);
                      }}
                    >
                      <DeleteIcon size={10} color={themeStyles.PRIMARY_COLOR} />
                    </div>
                  </>
                }
              />
            );
          }

          if (config === "invoice_facility") {
            return (
              <ListItemCard
                key={index}
                title={`Invoice #${item.surrogateID}`}
                subtitle={`Created: ${displayDate(
                  item.createdAt
                )} | Due: ${displayDate(item.dueDate)}`}
                secondaryText={`Amount: $${item.amount}`}
                onClick={() => {
                  setSelectedInvoice(data[index]);
                  openInvoiceModal?.();
                }}
                actions={
                  <div
                    className={"flex p-2 " + ScaleHover}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadAction(item);
                    }}
                  >
                    <DownloadIcon size={6} />
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "12px",
                        color: themeStyles?.PRIMARY_COLOR,
                        marginLeft: "4px",
                      }}
                    >
                      Download Invoice
                    </p>
                  </div>
                }
              />
            );
          }

          if (config === "invoice") {
            return (
              <ListItemCard
                key={index}
                title={`Invoice #${item.surrogateID}`}
                subtitle={`Facility: ${
                  item.facilityName
                } | Created: ${displayDate(
                  item.createdAt
                )} | Due: ${displayDate(item.dueDate)}`}
                secondaryText={`Amount: $${item.amount}`}
                onClick={() => {
                  setSelectedInvoice(data[index]);
                  openInvoiceModal?.();
                }}
                actions={
                  <div
                    className={"flex p-2 " + ScaleHover}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadAction(item);
                    }}
                  >
                    <DownloadIcon size={6} />
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "12px",
                        color: themeStyles?.PRIMARY_COLOR,
                        marginLeft: "4px",
                      }}
                    >
                      Download Invoice
                    </p>
                  </div>
                }
              />
            );
          }

          // Default fallback if config is unknown
          return (
            <ListItemCard
              key={index}
              title="Unknown Config"
              subtitle="No matching config found"
            />
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
