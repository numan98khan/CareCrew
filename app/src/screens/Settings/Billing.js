import React, { useState, useEffect } from "react";
import DropDown from "../../components/DropDown";
import { useAdmin } from "../../context";
import Input from "../../components/Input";
import RadioButton from "../../components/Button/RadioButton";
import DatePickerCustom from "../../components/DatePicker";

import { UniqueTypeNamesRule } from "graphql";
import { useListFacilities } from "../../apolloql/facilities";
import { useGetBillingByID, useUpdateBilling } from "../../apolloql/billing";
import Button from "../../components/Button";
import { ErrorToast, SuccessToast } from "../../services/micro";
import ConfirmationModal from "../../components/ConfirmationModal";
import { getBilling } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

function Billing() {
  // const { facilities } = useAdmin();
  const [billingID, setBillingID] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const [areFieldsLocked, setAreFieldsLocked] = useState(true); // New state for locking/unlocking fields

  const toggleFieldLock = () => {
    setAreFieldsLocked(!areFieldsLocked);
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { facilities } = useListFacilities();
  // const { billing: billingObj, loading } = useGetBillingByID(
  //   selectedFacility?.Billing?.id
  // );

  const [billing, setBilling] = useState(null);

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
      // Handle the error appropriately.
    }
  };

  useEffect(() => {
    if (selectedFacility?.Billing) {
      fetchBillingData();
    } else {
      setBilling(null);
    }
  }, [selectedFacility]);

  // useEffect(() => {
  //   if (selectedFacility?.Billing === null) {
  //     // setBilling(null);
  //     setInitialBilling(null);
  //   } else {
  //     // setBilling(billingObj);
  //     setInitialBilling(billing);
  //   }
  // }, [billing, selectedFacility]);
  // useEffect(() => {
  //   if (selectedFacility?.Billing === null) {
  //     setBilling(null);
  //   } else {
  //     const billingData = (await API.graphql(
  //       graphqlOperation(getBilling, { id:  selectedFacility?.Billing?.id })
  //     ))?.data?.getBilling;

  //     setBilling(billingData);
  //   }
  // }, [billingObj, selectedFacility, loading]);

  const { updateBillingQuery } = useUpdateBilling();

  const handleUpdateBilling = async () => {
    // if (!selectedFacility) {
    //   ErrorToast("No facility selected");
    //   setIsConfirmModalOpen(false);
    //   return;
    // }

    // if (!billing) {
    //   ErrorToast("Billing information is still loading");
    //   setIsConfirmModalOpen(false);
    //   return;
    // }

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

      // SuccessToast("Updated Billing", data);
      // handle post-update actions (e.g., confirmation messages) here
    } catch (error) {
      ErrorToast("Error updating billing:", error);
      // handle error actions (e.g., error messages) here
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

    // Email format validation using regex
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

  const [initialBilling, setInitialBilling] = useState(null);

  const handleReset = () => {
    setBilling(initialBilling);
  };

  //   allowOvertime: false,
  // maxBillingMonthly: 25000,
  // hourlyRate: "40",
  // weekendHourlyRate: 45,
  // holidayHourlyRate: 50,
  // maxMonthlyIncentive: 1000,
  // maxHourlyIncentive: 30,
  // maxFixedIncentive: 100,
  // invoiceDelivery: "EMAIL", // Assuming the enum value is "EMAIL"
  // invoiceFrequency: "MONTHLY", // Assuming the enum value is "MONTHLY"
  // topUpPercentage: "30",
  return (
    <div className="p-4">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-4 pb-10">
        <DropDown
          placeholder={"Facilities"}
          value={selectedFacility?.id}
          setValue={(selectedFacilityID) => {
            // Here, I'm assuming that the selectedFacilityID corresponds to the billingID.
            // Adjust this logic if the mapping between facilityID and billingID is different.
            // setBillingID(
            //   facilities?.find((obj) => obj.id === selectedFacilityID).Billing
            //     ?.id
            // ); // Update billingID
            setSelectedFacility(
              facilities?.find((obj) => obj.id === selectedFacilityID)
            );
            // setBillingKey("facilityID")(selectedFacilityID); // Update facilityID in the billing state
          }}
          options={facilities?.map((obj) => obj.id)}
          labels={facilities?.map((obj) => obj.facilityName)}
        />
        {/* Lock/Unlock Fields Button */}
        <div className="pb-4">
          <Button onClick={toggleFieldLock}>
            {areFieldsLocked ? "Unlock Fields" : "Lock Fields"}
          </Button>
        </div>
      </div>
      {/* First Row */}
      <div className="grid grid-cols-1 gap-4 pb-10 w-2/3">
        <div className="flex flex-row">
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Billing Monthly"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxBillingMonthly}
              setValue={setBillingKey("maxBillingMonthly")}
              disabled={areFieldsLocked}
              type={"number"}
            />
          </div>
          <div className="flex flex-col w-full  mx-1">
            <label className="text-xs text-start font-bold">
              {"Hourly Rate (CNA)"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.hourlyRateCNA}
              setValue={setBillingKey("hourlyRateCNA")}
              disabled={areFieldsLocked}
              type={"number"}
            />
          </div>
          <div className="flex flex-col w-full  mx-1">
            <label className="text-xs text-start font-bold">
              {"Hourly Rate (LPN)"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.hourlyRateLPN}
              setValue={setBillingKey("hourlyRateLPN")}
              disabled={areFieldsLocked}
              type={"number"}
            />
          </div>
          <div className="flex flex-col w-full  mx-1">
            <label className="text-xs text-start font-bold">
              {"Hourly Rate (RN)"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.hourlyRateRN}
              setValue={setBillingKey("hourlyRateRN")}
              disabled={areFieldsLocked}
              type={"number"}
            />
          </div>
        </div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 gap-4 w-2/3 pb-10">
        <div className="flex flex-row">
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Monthly Incentive"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxMonthlyIncentive}
              setValue={setBillingKey("maxMonthlyIncentive")}
              disabled={areFieldsLocked}
              type={"number"}
            />
          </div>
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Monthly Incentive (Per Hour)"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxHourlyIncentive}
              setValue={setBillingKey("maxHourlyIncentive")}
              disabled={areFieldsLocked}
              type={"number"}
            />
          </div>
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Monthly Incentive (Fixed)"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxFixedIncentive}
              setValue={setBillingKey("maxFixedIncentive")}
              disabled={areFieldsLocked}
              type={"number"}
            />
          </div>
        </div>
      </div>
      {/* Third Row */}
      <div className="grid grid-cols-1 gap-4 w-2/3 pb-10">
        <div className="flex flex-row">
          <div className="flex flex-col mx-1 flex-1">
            <label className="text-xs text-start font-bold">
              {"Delivery E-mail"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.billingEmail || ""}
              setValue={setBillingKey("billingEmail")}
              disabled={areFieldsLocked}
              type={"email"}
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <label className="text-xs text-start font-bold">
              Invoice Frequency Delivery
            </label>
            <div className="flex space-x-4 ml-2.5 items-center my-1">
              <RadioButton
                children="Daily"
                checked={billing?.invoiceFrequency === "Daily"}
                onChange={() => {
                  setBillingKey("invoiceFrequency")("Daily");
                }}
                disabled={areFieldsLocked}
              />
              <RadioButton
                children="Weekly"
                checked={billing?.invoiceFrequency === "Weekly"}
                onChange={() => {
                  setBillingKey("invoiceFrequency")("Weekly");
                }}
                disabled={areFieldsLocked}
              />
              <RadioButton
                children="Monthly"
                checked={billing?.invoiceFrequency === "Monthly"}
                onChange={() => {
                  setBillingKey("invoiceFrequency")("Monthly");
                }}
                disabled={areFieldsLocked}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1">
            <label className="text-xs text-start font-bold">
              Allow Overtime?
            </label>
            <div className="flex space-x-4 ml-2.5 items-center my-1">
              <RadioButton
                children="Yes"
                checked={billing?.allowOvertime}
                onChange={() => {
                  setBillingKey("allowOvertime")(true);
                }}
                disabled={areFieldsLocked}
              />
              <RadioButton
                children="No"
                checked={!billing?.allowOvertime}
                onChange={() => {
                  setBillingKey("allowOvertime")(false);
                }}
                disabled={areFieldsLocked}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/4 flex flex-row space-x-2">
        <Button
          // className="bg-blue-500 text-white px-4 py-2 rounded"
          // onClick={handleUpdateBilling}
          onClick={handleUpdateButtonClick}
        >
          Update Billing
        </Button>
        <Button
          // You might want to apply different styling to the reset button
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

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
