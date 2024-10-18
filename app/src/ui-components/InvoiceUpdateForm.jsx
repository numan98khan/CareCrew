/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Invoice } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function InvoiceUpdateForm(props) {
  const {
    id: idProp,
    invoice: invoiceModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    dueDate: "",
    amount: "",
    surrogateID: "",
    receiver: "",
    receiverID: "",
  };
  const [dueDate, setDueDate] = React.useState(initialValues.dueDate);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [surrogateID, setSurrogateID] = React.useState(
    initialValues.surrogateID
  );
  const [receiver, setReceiver] = React.useState(initialValues.receiver);
  const [receiverID, setReceiverID] = React.useState(initialValues.receiverID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = invoiceRecord
      ? { ...initialValues, ...invoiceRecord }
      : initialValues;
    setDueDate(cleanValues.dueDate);
    setAmount(cleanValues.amount);
    setSurrogateID(cleanValues.surrogateID);
    setReceiver(cleanValues.receiver);
    setReceiverID(cleanValues.receiverID);
    setErrors({});
  };
  const [invoiceRecord, setInvoiceRecord] = React.useState(invoiceModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Invoice, idProp)
        : invoiceModelProp;
      setInvoiceRecord(record);
    };
    queryData();
  }, [idProp, invoiceModelProp]);
  React.useEffect(resetStateValues, [invoiceRecord]);
  const validations = {
    dueDate: [],
    amount: [],
    surrogateID: [],
    receiver: [],
    receiverID: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          dueDate,
          amount,
          surrogateID,
          receiver,
          receiverID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Invoice.copyOf(invoiceRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "InvoiceUpdateForm")}
      {...rest}
    >
      <TextField
        label="Due date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={dueDate && convertToLocal(new Date(dueDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              dueDate: value,
              amount,
              surrogateID,
              receiver,
              receiverID,
            };
            const result = onChange(modelFields);
            value = result?.dueDate ?? value;
          }
          if (errors.dueDate?.hasError) {
            runValidationTasks("dueDate", value);
          }
          setDueDate(value);
        }}
        onBlur={() => runValidationTasks("dueDate", dueDate)}
        errorMessage={errors.dueDate?.errorMessage}
        hasError={errors.dueDate?.hasError}
        {...getOverrideProps(overrides, "dueDate")}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              dueDate,
              amount: value,
              surrogateID,
              receiver,
              receiverID,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="Surrogate id"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={surrogateID}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              dueDate,
              amount,
              surrogateID: value,
              receiver,
              receiverID,
            };
            const result = onChange(modelFields);
            value = result?.surrogateID ?? value;
          }
          if (errors.surrogateID?.hasError) {
            runValidationTasks("surrogateID", value);
          }
          setSurrogateID(value);
        }}
        onBlur={() => runValidationTasks("surrogateID", surrogateID)}
        errorMessage={errors.surrogateID?.errorMessage}
        hasError={errors.surrogateID?.hasError}
        {...getOverrideProps(overrides, "surrogateID")}
      ></TextField>
      <TextField
        label="Receiver"
        isRequired={false}
        isReadOnly={false}
        value={receiver}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dueDate,
              amount,
              surrogateID,
              receiver: value,
              receiverID,
            };
            const result = onChange(modelFields);
            value = result?.receiver ?? value;
          }
          if (errors.receiver?.hasError) {
            runValidationTasks("receiver", value);
          }
          setReceiver(value);
        }}
        onBlur={() => runValidationTasks("receiver", receiver)}
        errorMessage={errors.receiver?.errorMessage}
        hasError={errors.receiver?.hasError}
        {...getOverrideProps(overrides, "receiver")}
      ></TextField>
      <TextField
        label="Receiver id"
        isRequired={false}
        isReadOnly={false}
        value={receiverID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dueDate,
              amount,
              surrogateID,
              receiver,
              receiverID: value,
            };
            const result = onChange(modelFields);
            value = result?.receiverID ?? value;
          }
          if (errors.receiverID?.hasError) {
            runValidationTasks("receiverID", value);
          }
          setReceiverID(value);
        }}
        onBlur={() => runValidationTasks("receiverID", receiverID)}
        errorMessage={errors.receiverID?.errorMessage}
        hasError={errors.receiverID?.hasError}
        {...getOverrideProps(overrides, "receiverID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || invoiceModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || invoiceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
