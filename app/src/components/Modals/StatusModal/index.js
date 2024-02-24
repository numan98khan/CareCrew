import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useUpdatePeople } from "../../../apolloql/people";
import { PEOPLE_STATUS, PEOPLE_STATUS_COLORS } from "../../../constants/status";
import { ErrorToast, SuccessToast } from "../../../services/micro";

function StatusModal({ open, onClose, styles, position, people, refetch }) {
  // PEOPLE_STATUS_COLORS
  console.log(
    "🚀 ~ file: index.js:9 ~ StatusModal ~ PEOPLE_STATUS_COLORS:",
    PEOPLE_STATUS_COLORS
  );

  const [selectedStatus, setSelectedStatus] = useState(null);
  const { updatePeopleQuery } = useUpdatePeople();

  const submitStatus = async (status) => {
    const updatedPeople = {
      id: people.id,
      status: status,
      _version: people._version,
    };

    try {
      await updatePeopleQuery(updatedPeople);
      SuccessToast("Status updated successfully!");
      await refetch();
    } catch (error) {
      console.error("Error updating people: ", error);
      ErrorToast("Error updating the status!");
    }
  };

  const dotsize = "6px";

  return (
    <div style={{ zIndex: 9999999999 }}>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            zIndex: 10000000000,
          },
          content: {
            position: "fixed",
            top: position.top,
            right: position.right,
            bottom: "auto",
            left: "auto",
            border: 10,
            boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.30)",
            display: "flex",
            flexDirection: "column",
            padding: 0,
          },
        }}
        contentLabel="Status Modal"
      >
        <div className="px-2 py-3 pr-8">
          <div className="flex flex-col gap-2 justify-between w-4/5 h-2/3">
            {PEOPLE_STATUS?.map((singleStatus, idx) => {
              console.log(PEOPLE_STATUS_COLORS[singleStatus]);
              return (
                <div
                  key={idx}
                  className="flex flex-row gap-2 items-center w-full cursor-pointer"
                  onClick={() => {
                    setSelectedStatus(singleStatus);
                    submitStatus(singleStatus);
                  }}
                >
                  <div
                    style={{
                      maxHeight: dotsize,
                      maxWidth: dotsize,
                      minHeight: dotsize,
                      minWidth: dotsize,
                      borderRadius: "50%",
                      backgroundColor: PEOPLE_STATUS_COLORS[singleStatus],
                    }}
                  />
                  <p className="text-xs ">{singleStatus}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default StatusModal;
