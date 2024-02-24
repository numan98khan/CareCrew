import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DatePickerCustom from "../../../components/DatePicker";
import TimePickerCustom from "../../TimePicker";
import { useListPeople } from "../../../apolloql/people";
import DropDown from "../../DropDown";
import DeleteIcon from "../../../assets/icons/deleteIcon";
import EditIcon from "../../../assets/icons/editIcon";
import { MainHover, ScaleHover } from "../../../styles/animations";

function EditShiftModal({
  open,
  onClose,
  onCloseParentModal,
  afterOpenModal,
  styles,
  position,
  handleDelete,
  disableDelete,
  disableEdit,
  openShiftEditModal,
  shift,
  canDeleteShift,
}) {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div style={{ zIndex: 9999999999 }}>
      {" "}
      {/* Update the zIndex value here */}
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            zIndex: 10000000000, // this should be higher than AppBar's z-index
          },
          content: {
            position: "fixed", // This positions the modal relative to the viewport
            top: position.top,
            right: position.right,
            bottom: "auto",
            left: "auto",
            border: 10,
            boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            display: "flex",
            flexDirection: "column", // Add this line
            // backgroundColor: "#000",
            padding: 0,
          },
        }}
        contentLabel="Example Modal"
      >
        <div
          // style={{ width: "130px", height: "82px" }}
          className="w-full h-full flex flex-col gap-2 items-center justify-center p-3"
        >
          {canDeleteShift && !disableDelete && (
            <div
              onClick={() => {
                handleDelete();
                onClose();
                onCloseParentModal();
              }}
              className={`flex flex-row gap-1 items-center w-full ${ScaleHover}`}
            >
              <DeleteIcon />
              <p className="text-sm font-semibold ">Delete</p>
            </div>
          )}

          {!disableEdit && (
            <div
              onClick={() => openShiftEditModal(shift)}
              // className="flex flex-row gap-1 items-center w-full"
              className={`flex flex-row gap-1 items-center w-full ${ScaleHover}`}
            >
              <EditIcon />
              <p className="text-sm font-semibold ">Edit</p>
            </div>
          )}
          {/* </div> */}
        </div>
      </Modal>
    </div>
  );
}

export default EditShiftModal;
