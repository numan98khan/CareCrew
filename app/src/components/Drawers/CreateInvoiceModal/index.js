import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Button from "../../Button";
import theme from "../../../styles/theme.styles";

import Input from "../../Input";
import CrossIcon from "../../../assets/icons/cross";
import { MainHover } from "../../../styles/animations";
import { ErrorToast, SuccessToast } from "../../../services/micro";
import { useCreateInvoice } from "../../../apolloql/invoices";
import DropDown from "../../DropDown";
import { useListFacilities } from "../../../apolloql/facilities";
import DatePickerCustom from "../../DatePicker";
import TimePickerCustom from "../../TimePicker";
import moment from "moment";
import { userTimezone } from "../../../apolloql/timezone";
import { FACILITY } from "../../../constants/userTypes";
import {
  createIDCounter,
  createInvoice,
  updateIDCounter,
} from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { getIDCounter } from "../../../graphql/queries";

const InputLabeled = ({
  value,
  label,
  index,
  fieldKey,
  handleUpdateItem,
  type,
}) => {
  return (
    <div className="flex flex-row  text-PRIMARY_COLOR font-semibold items-end justify-between space-x-1">
      <label>{label}</label>

      <input
        className="w-full"
        style={{
          border: "1px solid #EDEDED",
          fontSize: "12px",
          padding: 2,
          width: "60%",
        }}
        type={type}
        value={value || ""} // Convert null to an empty string
        onChange={(e) => {
          console.log(
            "🚀 ~ file: index.js:22 ~ InputLabeled ~ e:",
            e.target.value
          );
          // handleUpdateItem(e);
          handleUpdateItem(index, fieldKey, e.target.value);
        }}
      />
    </div>
  );
};

function CreateInvoiceModal({ open, onClose }) {
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [facility, setFacility] = useState(null);

  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  // const [invoiceItems, setInvoiceItems] = useState([]);

  const {
    facilities,
    loading,
    refetch: refetchFacilities,
  } = useListFacilities();

  const handleAddItem = () => {
    if (!facility || !dueDate) {
      ErrorToast("Facility and Due Date must be selected.");
      return;
    }

    if (!validateInvoiceItems(invoiceItems)) {
      ErrorToast("All fields must be filled out and non-negative");
      return;
    }
    setInvoiceItems([
      ...invoiceItems,
      { qty: "", description: "", amount: "" },
    ]);
  };
  function validateInvoiceItems(invoiceItems) {
    for (let i = 0; i < invoiceItems.length; i++) {
      const item = invoiceItems[i];
      if (
        item.qty === "" ||
        item.qty === null ||
        item.qty < 0 ||
        item.description === "" ||
        item.description === null ||
        item.amount === "" ||
        item.amount === null ||
        item.amount < 0
      ) {
        return false;
      }
    }
    return true;
  }

  const handleUpdateItem = (index, field, value) => {
    const newItems = [...invoiceItems];
    newItems[index][field] = value;
    setInvoiceItems(newItems);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...invoiceItems];
    newItems.splice(index, 1);
    setInvoiceItems(newItems);
  };

  async function incrementInvoiceID() {
    const idCounterData = (
      await API.graphql(graphqlOperation(getIDCounter, { id: "invoice" }))
    )?.data?.getIDCounter;
    let res = null;
    if (idCounterData === null) {
      await API.graphql(
        graphqlOperation(createIDCounter, {
          input: { id: "invoice", invoice: 0 },
        })
      );

      const idCounterData = (
        await API.graphql(graphqlOperation(getIDCounter, { id: "invoice" }))
      )?.data?.getIDCounter;

      res = await API.graphql(
        graphqlOperation(updateIDCounter, {
          input: {
            id: "invoice",
            invoice: idCounterData?.invoice + 1,
            _version: idCounterData?._version,
          },
        })
      );
    } else {
      res = await API.graphql(
        graphqlOperation(updateIDCounter, {
          input: {
            id: "invoice",
            invoice: idCounterData?.invoice + 1,
            _version: idCounterData?._version,
          },
        })
      );
    }
    // console.log(
    //   "🚀 ~ file: index.js:140 ~ incrementUserID ~ idCounterData:",
    //   idCounterData,
    //   res
    // );

    return res?.data?.updateIDCounter?.invoice;
  }

  const publishInvoice = async () => {
    if (!facility || !dueDate) {
      ErrorToast("Facility and Due Date must be selected.");
      return;
    }
    if (!validateInvoiceItems(invoiceItems)) {
      ErrorToast("All fields must be filled out and non-negative");
      return;
    }

    if (!invoiceItems || invoiceItems?.length === 0) {
      ErrorToast("Please add atleast one invoice item.");
      return;
    }

    try {
      const description = invoiceItems?.map((item) => ({
        description: item.description,
        quantity: parseInt(item.qty, 10),
        amount: parseFloat(item.amount),
      }));
      const amount = description.reduce(
        (total, item) => total + item.amount,
        0
      );

      const dueDateTime = new Date(`${dueDate}T${dueTime}`);

      const surrogateInvoiceID = await incrementInvoiceID();

      const baseInput = {
        surrogateID: surrogateInvoiceID,
        dueDate: dueDateTime.toISOString(), // Assuming dueDate is a JavaScript Date object
        amount: amount,
        description: description,
        receiver: FACILITY, // Assuming facility is the receiver name
        receiverID: facility, // Replace with the actual receiver ID
      };
      // console.log(
      //   "🚀 ~ file: index.js:156 ~ publishInvoice ~ baseInput:",
      //   baseInput
      // );

      const newChatRoomData = await API.graphql(
        graphqlOperation(createInvoice, { input: baseInput })
      );
      SuccessToast("Invoice created successfully");
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while creating/updating the invoice");
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction="right"
      overlayOpacity={0}
      style={{ bottom: "0", top: "initial", height: "94vh", width: "300px" }}
    >
      <div
        style={{
          right: "0px",
          bottom: "0",
          top: "initial",
          padding: 14,
          // backgroundColor: theme.PRIMARY_NEUTRAL_COLOR,
          borderTop: "4px solid",
          borderColor: theme.PRIMARY_LIGHT_COLOR,
        }}
        className="flex flex-col justify-between w-full h-full"
      >
        <div>
          <div className="flex items-center justify-between">
            <label className="text-lg font-bold">Create Invoice</label>
            <div className={MainHover} onClick={onClose}>
              <CrossIcon size={7} />
            </div>
          </div>

          <div className="pb-2">
            <DropDown
              placeholder={"Select Facility"}
              value={facility}
              setValue={(facilityID) => {
                setFacility(facilityID);
              }}
              options={facilities?.map((obj) => obj.id)}
              labels={facilities?.map((obj) => obj.facilityName)}
            />
          </div>
          <div className="pb-2">
            <DatePickerCustom
              date={dueDate}
              // onChange={setDueDate}
              onChange={(date_) => {
                setDueDate(date_);
                if (!dueTime) {
                  setDueTime("12:00:00.000");
                }
              }}
            />
          </div>
          <div className="pb-2">
            <TimePickerCustom time={dueTime} onChange={setDueTime} />
          </div>

          {invoiceItems?.map((item, index) => (
            <div key={index} className="flex flex-col my-2 space-y-2">
              <InputLabeled
                label={"Quantity"}
                value={item.qty}
                index={index}
                fieldKey={"qty"}
                handleUpdateItem={handleUpdateItem}
                type={"number"}
              />
              <InputLabeled
                label={"Description"}
                value={item.description}
                index={index}
                fieldKey={"description"}
                handleUpdateItem={handleUpdateItem}
              />
              <InputLabeled
                label={"Amount"}
                value={item.amount}
                index={index}
                fieldKey={"amount"}
                handleUpdateItem={handleUpdateItem}
                type={"number"}
              />
              <Button onClick={() => handleDeleteItem(index)}>
                Delete Item
              </Button>
            </div>
          ))}

          <Button onClick={handleAddItem}>Add Item</Button>
        </div>
        <div>
          <Button
            onClick={() => {
              if (validateInvoiceItems(invoiceItems)) {
                // Code to handle submitting the invoice
                publishInvoice();
              } else {
                ErrorToast(
                  "Make sure all the values you enter are positive non-null values."
                );
              }
            }}
          >
            Submit Invoice
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default CreateInvoiceModal;
