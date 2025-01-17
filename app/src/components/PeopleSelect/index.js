import React, { useMemo } from "react";
import theme from "../../styles/theme.styles";
import CheckIcon from "../../assets/icons/check";
import { MainHover } from "../../styles/animations";

import themeStyles from "../../styles/theme.styles";

import Button from "../Button";

import Modal from "react-modal";

import MinimalPeopleRow from "../../components/MinimalPeopleRow";
import DropDown from "../DropDown";
import { Roles } from "../../constants/roles";
import InputField from "../Input";
import { ErrorToast } from "../../services/micro";

Modal.setAppElement("#root");

const PeopleSelect = ({
  shift,
  people,
  selectedPeople,
  setSelectedPeople,
  modalIsOpen,
  closeModal,
  onAddButton,
  onCancelButtton,
  selectedPeopleRole,
  setSelectedPeopleRole,
  peopleSearchTerm,
  setPeopleSearchTerm,
  assignInProgress,
}) => {
  const roleOptions = Roles.concat([undefined]);
  const roleLabels = Roles.concat(["All"]);

  useMemo(() => {
    setSelectedPeopleRole(shift?.roleRequired);
  }, []);

  const filteredPeople = useMemo(() => {
    return people?.filter((obj) => obj?.role === selectedPeopleRole);
  }, [people, setSelectedPeople]);
  return (
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
          boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
          minHeight: "280px",
          padding: 20,
        },
      }}
    >
      <div className="flex w-full">
        <label className="text-left text-lg text-PRIMARY_COLOR font-bold">
          Add Members
        </label>
      </div>
      <div className="my-1" />
      <div className="flex w-full">
        <label className="text-left text-xs ">
          Please select the person to whom you want to add for this facility
        </label>
      </div>

      <div className="flex flex-row w-full p-1 items-center justify-center">
        {/* <div className="w-2/3"> */}
        <div className="w-full">
          <InputField
            placeholder={"Search people"}
            value={peopleSearchTerm}
            setValue={setPeopleSearchTerm}
          />
        </div>
        {/* <div className="w-1/3">
          <DropDown
            placeholder={"Role"}
            options={roleOptions}
            labels={roleLabels}
            value={selectedPeopleRole}
            setValue={setSelectedPeopleRole}
          />
        </div> */}
      </div>

      <div className="my-2" />

      <div className="w-full overflow-y-auto">
        {people &&
          filteredPeople?.map((item, index) => {
            return (
              <>
                <MinimalPeopleRow
                  imgSrc={item.profilePicture}
                  name={item.firstName + " " + item.lastName}
                  role={item.role}
                  initChecked={selectedPeople?.includes(item.id)}
                  // onClick={() => {
                  //   if (selectedPeople.includes(item.id)) {
                  //     setSelectedPeople(
                  //       selectedPeople.filter((person) => person !== item.id)
                  //     );
                  //   } else {
                  //     setSelectedPeople([...selectedPeople, item.id]);
                  //   }
                  // }}
                  onClick={() => {
                    if (selectedPeople.includes(item.id)) {
                      setSelectedPeople(
                        selectedPeople.filter((person) => person !== item.id)
                      );
                    } else {
                      if (selectedPeople.length < shift.numOfPositions) {
                        setSelectedPeople([...selectedPeople, item.id]);
                      } else {
                        ErrorToast(
                          `You can only assign up to ${shift.numOfPositions} people for this shift.`
                        );
                      }
                    }
                  }}
                />
                <div className="my-1" />
              </>
            );
          })}
      </div>
      <div className="my-2" />
      <div className="flex w-full">
        <Button
          children={"ASSIGN"}
          onClick={() => {
            onAddButton();
          }}
          disabled={!selectedPeople?.length || assignInProgress}
        />
        <div className="mx-1" />
        <Button
          children={"CANCEL"}
          color={themeStyles.GRAY}
          onClick={() => {
            onCancelButtton();
          }}
        />
      </div>
    </Modal>
  );
};

export default PeopleSelect;
