import React, { useState, useEffect } from "react";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import RadioButton from "../../components/Button/RadioButton";
import Button from "../../components/Button";
import ConfirmationModal from "../../components/ConfirmationModal";
import { API, graphqlOperation } from "aws-amplify";
import { ErrorToast, SuccessToast } from "../../services/micro";
import { useListFacilities } from "../../apolloql/facilities";
import { useUpdateBilling } from "../../apolloql/billing";
import { getBilling } from "../../graphql/queries";

function Billing() {
  const [billingID, setBillingID] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [areFieldsLocked, setAreFieldsLocked] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [billing, setBilling] = useState(null);
  const [initialBilling, setInitialBilling] = useState(null);

  const { facilities } = useListFacilities();

  const toggleFieldLock = () => {
    setAreFieldsLocked(!areFieldsLocked);
  };

  const fetchBillingData = async () => {
    try {
      const billingData = (
        await API.graphql(
          graphqlOperation(getBilling, { id: selectedFacility?.Billing?.id })
        )
      )?.data?.getBilling;
      setBilling(billingData);
      setInitialBilling(billingData);
    } catch (error) {
      console.error("Error fetching billing data:", error);
    }
  };

  useEffect(() => {
    if (selectedFacility?.Billing) {
      fetchBillingData();
    } else {
      setBilling(null);
    }
  }, [selectedFacility]);

  const { updateBillingQuery } = useUpdateBilling();

  const handleUpdateBilling = async () => {
    const {
      __typename,
      _deleted,
      _lastChangedAt,
      updatedAt,
      createdAt,
      ...updatedBilling
    } = billing;

    try {
      const data = await updateBillingQuery(updatedBilling);
      SuccessToast("Updated Billing", data);
    } catch (error) {
      ErrorToast("Error updating billing:", error);
    }

    setIsConfirmModalOpen(false);
  };

  const handleUpdateButtonClick = () => {
    if (!selectedFacility) {
      ErrorToast("No facility selected");
      return;
    }

    if (!billing) {
      ErrorToast("Billing information is still loading");
      return;
    }

    if (billing === initialBilling) {
      ErrorToast("Nothing to update.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(billing?.billingEmail)) {
      ErrorToast("Invalid email format.");
      setIsConfirmModalOpen(false);
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const setBillingKey = (key) => (newValue) =>
    setBilling((prev) => ({ ...prev, [key]: newValue }));

  const handleReset = () => {
    setBilling(initialBilling);
  };

  return (
    <div className="p-4">
      {/* First Row: Facilities Dropdown and Lock Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10">
        <DropDown
          placeholder={"Facilities"}
          value={selectedFacility?.id}
          setValue={(selectedFacilityID) => {
            setSelectedFacility(
              facilities?.find((obj) => obj.id === selectedFacilityID)
            );
          }}
          options={facilities?.map((obj) => obj.id)}
          labels={facilities?.map((obj) => obj.facilityName)}
        />
        <div className="pb-4">
          <Button onClick={toggleFieldLock}>
            {areFieldsLocked ? "Unlock Fields" : "Lock Fields"}
          </Button>
        </div>
      </div>

      {/* Second Row: Billing Rates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 w-full">
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Max Billing Monthly"}</label>
          <Input
            value={billing?.maxBillingMonthly}
            setValue={setBillingKey("maxBillingMonthly")}
            disabled={areFieldsLocked}
            type={"number"}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Hourly Rate (CNA)"}</label>
          <Input
            value={billing?.hourlyRateCNA}
            setValue={setBillingKey("hourlyRateCNA")}
            disabled={areFieldsLocked}
            type={"number"}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Hourly Rate (LPN)"}</label>
          <Input
            value={billing?.hourlyRateLPN}
            setValue={setBillingKey("hourlyRateLPN")}
            disabled={areFieldsLocked}
            type={"number"}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Hourly Rate (RN)"}</label>
          <Input
            value={billing?.hourlyRateRN}
            setValue={setBillingKey("hourlyRateRN")}
            disabled={areFieldsLocked}
            type={"number"}
          />
        </div>
      </div>

      {/* Third Row: Incentives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10 w-full">
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Max Monthly Incentive"}</label>
          <Input
            value={billing?.maxMonthlyIncentive}
            setValue={setBillingKey("maxMonthlyIncentive")}
            disabled={areFieldsLocked}
            type={"number"}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Max Hourly Incentive"}</label>
          <Input
            value={billing?.maxHourlyIncentive}
            setValue={setBillingKey("maxHourlyIncentive")}
            disabled={areFieldsLocked}
            type={"number"}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Max Fixed Incentive"}</label>
          <Input
            value={billing?.maxFixedIncentive}
            setValue={setBillingKey("maxFixedIncentive")}
            disabled={areFieldsLocked}
            type={"number"}
          />
        </div>
      </div>

      {/* Fourth Row: Email, Invoice Frequency, Overtime */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10 w-full">
        <div className="flex flex-col">
          <label className="text-xs font-bold">{"Delivery Email"}</label>
          <Input
            value={billing?.billingEmail || ""}
            setValue={setBillingKey("billingEmail")}
            disabled={areFieldsLocked}
            type={"email"}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold">
            Invoice Frequency Delivery
          </label>
          <div className="flex space-x-4 items-center">
            <RadioButton
              children="Daily"
              checked={billing?.invoiceFrequency === "Daily"}
              onChange={() => setBillingKey("invoiceFrequency")("Daily")}
              disabled={areFieldsLocked}
            />
            <RadioButton
              children="Weekly"
              checked={billing?.invoiceFrequency === "Weekly"}
              onChange={() => setBillingKey("invoiceFrequency")("Weekly")}
              disabled={areFieldsLocked}
            />
            <RadioButton
              children="Monthly"
              checked={billing?.invoiceFrequency === "Monthly"}
              onChange={() => setBillingKey("invoiceFrequency")("Monthly")}
              disabled={areFieldsLocked}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold">Allow Overtime?</label>
          <div className="flex space-x-4 items-center">
            <RadioButton
              children="Yes"
              checked={billing?.allowOvertime}
              onChange={() => setBillingKey("allowOvertime")(true)}
              disabled={areFieldsLocked}
            />
            <RadioButton
              children="No"
              checked={!billing?.allowOvertime}
              onChange={() => setBillingKey("allowOvertime")(false)}
              disabled={areFieldsLocked}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button onClick={handleUpdateButtonClick}>Update Billing</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        modalIsOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
        message={"Are you sure you want to update the billing information?"}
        onConfirm={handleUpdateBilling}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
}

export default Billing;
