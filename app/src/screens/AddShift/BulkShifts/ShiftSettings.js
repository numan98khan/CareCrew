import React, { useState } from "react";
import SettingsIcon from "../../../assets/icons/menuIcons/settings";
import EditIcon from "../../../assets/icons/edit";
import DeleteIcon from "../../../assets/icons/delete";
import CancellationGuaranteeIcon from "../../../assets/icons/indicators/guarantee";
import IncentiveIcon from "../../../assets/icons/indicators/incentive";
import themeStyles from "../../../styles/theme.styles";
import Modal from "react-modal";

function ShiftSettings({ onEdit, inputIndex, note }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditNotesModalOpen, setIsEditNotesModalOpen] = useState(false);

  const handleEditNotesModal = (value) => {
    onEdit(inputIndex, value);
    setIsEditNotesModalOpen(false);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        className="flex flex-row justify-center items-center flex-1"
      >
        <SettingsIcon size={4} color={themeStyles.PRIMARY_COLOR} />
        {isMenuOpen && (
          <div className="absolute bg-transparent flex flex-row space-x-1">
            <div className="rounded-full bg-PRIMARY_COLOR p-1">
              <IncentiveIcon color={"#FFF"} size={7} />
            </div>

            <div className="rounded-full bg-PRIMARY_COLOR p-1">
              <CancellationGuaranteeIcon color={"#FFF"} size={7} />
            </div>
            <div
              onClick={() => setIsEditNotesModalOpen(true)}
              className="rounded-full bg-PRIMARY_COLOR p-1"
            >
              <EditIcon color={"#FFF"} size={4} />
            </div>
            <div className="rounded-full bg-red-500 p-1">
              <DeleteIcon color={"#FFF"} size={7} />
            </div>
          </div>
        )}
      </div>

      {isEditNotesModalOpen && (
        <Modal
          isOpen={isEditNotesModalOpen}
          onRequestClose={() => setIsEditNotesModalOpen(false)}
          contentLabel="Edit Incentive Notes Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            },
            content: {
              position: "relative",
              borderRadius: 20,
              width: "300px",
              padding: "20px",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <h2>Edit Incentive Notes</h2>
          <textarea
            rows="4"
            value={note}
            onChange={(e) => handleEditNotesModal(e.target.value)}
          />
          <button onClick={() => handleEditNotesModal(note)}>Save</button>
          <button onClick={() => setIsEditNotesModalOpen(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default ShiftSettings;
