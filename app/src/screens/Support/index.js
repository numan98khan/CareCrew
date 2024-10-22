import React, { useState } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import Button from "../../components/Button";
import { ErrorToast, SuccessToast } from "../../services/micro";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import { useListReasons } from "../../apolloql/reasons";
import { useCreateSupport } from "../../apolloql/support";
import { useAuth } from "../../context";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";

function Support() {
  const { personalData, type, myFacility } = useAuth();
  const { reasons } = useListReasons();
  const { createTicket } = useCreateSupport();
  const [support, setSupport] = useState({
    details: "",
    reasonID: "",
  });

  const setSupportKey = (key) => (newValue) =>
    setSupport((prevSupport) => ({ ...prevSupport, [key]: newValue }));

  const publishSupport = async () => {
    if (!isValidForm()) return;

    try {
      await createTicket(
        support,
        personalData?.firstName + " " + personalData?.lastName,
        type === ADMIN
          ? "CareCrew"
          : type === FACILITY
          ? myFacility?.facilityName
          : type === EMPLOYEE
          ? personalData?.firstName + " " + personalData?.lastName
          : null
      );
      SuccessToast("Support ticket created");
      setSupport({ details: "", reasonID: "" });
    } catch (error) {
      ErrorToast("An error occurred while creating the support ticket");
    }
  };

  const isValidForm = () => {
    if (!support.details.trim() || !support.reasonID) {
      ErrorToast("Please fill in all required fields");
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col min-h-max px-4 pb-3">
      <div className="flex flex-col items-center">
        <PageHeader text="Support" />
      </div>

      <div className="w-full max-w-3xl mx-auto bg-white mt-4 p-4 rounded-lg shadow-md">
        {/* Reason and Notes */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold mb-2">Reason</label>
            <DropDown
              placeholder="Select Reason"
              value={support?.reasonID || null}
              setValue={setSupportKey("reasonID")}
              options={reasons.map((obj) => obj.id)}
              labels={reasons.map((obj) => obj.reason)}
              label={
                reasons.find((obj) => obj.id === support?.reasonID)?.reason
              }
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-bold mb-2">Notes</label>
            <Input
              multiline
              placeholder="Notes"
              value={support.details}
              setValue={setSupportKey("details")}
              rows={5}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <Button
            className="w-full sm:w-auto px-4 py-2 bg-primary rounded-lg text-white"
            onClick={publishSupport}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Support;
