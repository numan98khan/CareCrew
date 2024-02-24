import React, { useState } from "react";
import Toggle from "../../../components/ToggleSwitch";

import InfoTitle from "../../../components/Headers/InfoTitle";
import InfoSubTitle from "../../../components/Headers/InfoSubTitle";
import InfoData from "../../../components/Headers/InfoData";
import InfoBox from "../../../components/InfoCards/InfoBox";
import DocumentUploadModal from "../../../components/Drawers/DocumentUploadModal";
import { useUpdatePeople } from "../../../apolloql/people";
import { ErrorToast, SuccessToast } from "../../../services/micro";
import { getPeople } from "../../../graphql/queries";

import { Auth, API, graphqlOperation } from "aws-amplify";

const NurseChecklist = ({ people, goBackHandler = null, refetchPeople }) => {
  const [docName, setDocName] = useState(null);
  const { updatePeopleQuery } = useUpdatePeople();

  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleChecklistUpdate = async (documentName) => {
    const updatedEmpCheckList = people?.empCheckList?.map(
      ({ __typename, ...rest }) => {
        if (rest.name === documentName) {
          return { ...rest, isBool: true };
        }
        return rest;
      }
    );

    const updatedPeople = {
      id: people.id,
      empCheckList: updatedEmpCheckList,
      _version: people._version,
    };

    try {
      await updatePeopleQuery(updatedPeople);

      // if (goBackHandler) {
      //   goBackHandler();
      // }
      SuccessToast("Checklist updated successfully!");
    } catch (error) {
      if (error.message.includes("Conflict resolver rejects mutation")) {
        // If it's a conflict error, refetch the latest data and retry
        // const latestPeople = await fetchLatestPeople(people.id);
        const latestPeople = await API.graphql(
          graphqlOperation(getPeople, { id: people.id })
        );
        updatedPeople._version = latestPeople?.data?.getPeople?._version;

        try {
          await updatePeopleQuery(updatedPeople);
          // if (goBackHandler) {
          //   goBackHandler();
          // }
          refetchPeople(true);
          SuccessToast(
            "Checklist updated successfully after conflict resolution!"
          );
        } catch (retryError) {
          console.error("Error after retrying the update:", retryError);
          ErrorToast("Error updating the checklist after retry!");
        }
      } else {
        console.error("Error updating the checklist:", error);
        ErrorToast("Error updating the checklist!");
      }
    }
  };

  return (
    <div className="min-h-max px-3 mt-3 pb-3 bg-white">
      <div className="flex flex-row">
        <div className="w-1/2 flex flex-col ">
          <div className="flex flex-col text-left align  p-4">
            <InfoTitle text={"Documents"} />

            <div className="my-2" />

            {people?.empCheckList.map((item, index) => {
              return (
                <div className="flex flex-row text-sm justify-between my-1">
                  <span className="text-xs">{item.name}</span>

                  {item.isBool ? (
                    <button
                      // className="bg-[#7EE69B] rounded-full w-20 h-6 text-xs text-white"
                      className="bg-[#7EE69B] rounded-full w-20 py-1  text-xs text-white"
                    >
                      Uploaded
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setDocName(item.name);
                        onOpen();
                        // handleChecklistUpdate(item.name);
                      }}
                      className="bg-PRIMARY_LIGHT_COLOR rounded-full w-20 py-1 text-xs text-white"
                    >
                      +Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DocumentUploadModal
        open={open}
        onClose={onClose}
        people={people}
        docName={docName}
        handleChecklistUpdate={handleChecklistUpdate}
      />
    </div>
  );
};

export default NurseChecklist;
