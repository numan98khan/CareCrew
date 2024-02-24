import React, { useState } from "react";
import themeStyles from "../../styles/theme.styles";

import Button from "../../components/Button";

import {
  reverseFormatDate,
  reverseFormatDateTime,
  displayDate,
  SuccessToast,
  ErrorToast,
  convertDateTimeToAWSDateTime,
  convertTimeToAWSTime,
  convertDateToAWSDate,
} from "../../services/micro";

import OpenIndicator from "../../assets/icons/indicators/open";
import IncentiveIndicator from "../../assets/icons/indicators/incentive";
import GuaranteeIndicator from "../../assets/icons/indicators/guarantee";
import UserXIndicator from "../../assets/icons/userx";
import WatchIndicator from "../../assets/icons/watch";
import LocationIcon from "../../assets/icons/location";

import Modal from "react-modal";

const ConfirmationModal = ({
  modalIsOpen,
  closeModal,
  message,
  onConfirm,
  onCancel,
  warning,
  disableConfirm = false,
}) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="People Add Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            position: "relative",
            borderRadius: 20,
            // boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            width: "300px",
            padding: "10px", // This line will remove the padding
          },
        }}
      >
        <div className="flex flex-col space-y-2">
          <label className="text-lg text-PRIMARY_COLOR font-bold text-center">
            Confirm?
          </label>
          <label className="text-center text-xs">{message}</label>
          {warning && (
            <label className="text-center text-xxs text-[#F00]">
              {warning}
            </label>
          )}

          <div className="flex flex-row space-x-2">
            <Button
              children={"Yes"}
              onClick={onConfirm}
              disabled={disableConfirm}
            />
            <Button
              children={"No"}
              color={themeStyles?.GRAY}
              onClick={onCancel}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
