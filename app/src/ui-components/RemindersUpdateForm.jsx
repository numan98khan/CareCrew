/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getReminders } from "../graphql/queries";
import { updateReminders } from "../graphql/mutations";
export default function RemindersUpdateForm(props) {
  const {
    id: idProp,
    reminders: remindersModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    time: "",
    datetime: "",
    receiverType: "",
    note: "",
    read: false,
    message: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [time, setTime] = React.useState(initialValues.time);
  const [datetime, setDatetime] = React.useState(initialValues.datetime);
  const [receiverType, setReceiverType] = React.useState(
    initialValues.receiverType
  );
  const [note, setNote] = React.useState(initialValues.note);
  const [read, setRead] = React.useState(initialValues.read);
  const [message, setMessage] = React.useState(initialValues.message);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = remindersRecord
      ? { ...initialValues, ...remindersRecord }
      : initialValues;
    setDate(cleanValues.date);
    setTime(cleanValues.time);
    setDatetime(cleanValues.datetime);
    setReceiverType(cleanValues.receiverType);
    setNote(cleanValues.note);
    setRead(cleanValues.read);
    setMessage(cleanValues.message);
    setErrors({});
  };
  const [remindersRecord, setRemindersRecord] =
    React.useState(remindersModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getReminders.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getReminders
        : remindersModelProp;
      setRemindersRecord(record);
    };
    queryData();
  }, [idProp, remindersModelProp]);
  React.useEffect(resetStateValues, [remindersRecord]);
  const validations = {
    date: [],
    time: [],
    datetime: [],
    receiverType: [],
    note: [],
    read: [],
    message: [],
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
          date: date ?? null,
          time: time ?? null,
          datetime: datetime ?? null,
          receiverType: receiverType ?? null,
          note: note ?? null,
          read: read ?? null,
          message: message ?? null,
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
          await API.graphql({
            query: updateReminders.replaceAll("__typename", ""),
            variables: {
              input: {
                id: remindersRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RemindersUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              time,
              datetime,
              receiverType,
              note,
              read,
              message,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time: value,
              datetime,
              receiverType,
              note,
              read,
              message,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Datetime"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={datetime && convertToLocal(new Date(datetime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              date,
              time,
              datetime: value,
              receiverType,
              note,
              read,
              message,
            };
            const result = onChange(modelFields);
            value = result?.datetime ?? value;
          }
          if (errors.datetime?.hasError) {
            runValidationTasks("datetime", value);
          }
          setDatetime(value);
        }}
        onBlur={() => runValidationTasks("datetime", datetime)}
        errorMessage={errors.datetime?.errorMessage}
        hasError={errors.datetime?.hasError}
        {...getOverrideProps(overrides, "datetime")}
      ></TextField>
      <SelectField
        label="Receiver type"
        placeholder="Please select an option"
        isDisabled={false}
        value={receiverType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              datetime,
              receiverType: value,
              note,
              read,
              message,
            };
            const result = onChange(modelFields);
            value = result?.receiverType ?? value;
          }
          if (errors.receiverType?.hasError) {
            runValidationTasks("receiverType", value);
          }
          setReceiverType(value);
        }}
        onBlur={() => runValidationTasks("receiverType", receiverType)}
        errorMessage={errors.receiverType?.errorMessage}
        hasError={errors.receiverType?.hasError}
        {...getOverrideProps(overrides, "receiverType")}
      >
        <option
          children="Facility"
          value="FACILITY"
          {...getOverrideProps(overrides, "receiverTypeoption0")}
        ></option>
        <option
          children="Admin"
          value="ADMIN"
          {...getOverrideProps(overrides, "receiverTypeoption1")}
        ></option>
        <option
          children="Employee"
          value="EMPLOYEE"
          {...getOverrideProps(overrides, "receiverTypeoption2")}
        ></option>
        <option
          children="All"
          value="ALL"
          {...getOverrideProps(overrides, "receiverTypeoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Note"
        isRequired={false}
        isReadOnly={false}
        value={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              datetime,
              receiverType,
              note: value,
              read,
              message,
            };
            const result = onChange(modelFields);
            value = result?.note ?? value;
          }
          if (errors.note?.hasError) {
            runValidationTasks("note", value);
          }
          setNote(value);
        }}
        onBlur={() => runValidationTasks("note", note)}
        errorMessage={errors.note?.errorMessage}
        hasError={errors.note?.hasError}
        {...getOverrideProps(overrides, "note")}
      ></TextField>
      <SwitchField
        label="Read"
        defaultChecked={false}
        isDisabled={false}
        isChecked={read}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              date,
              time,
              datetime,
              receiverType,
              note,
              read: value,
              message,
            };
            const result = onChange(modelFields);
            value = result?.read ?? value;
          }
          if (errors.read?.hasError) {
            runValidationTasks("read", value);
          }
          setRead(value);
        }}
        onBlur={() => runValidationTasks("read", read)}
        errorMessage={errors.read?.errorMessage}
        hasError={errors.read?.hasError}
        {...getOverrideProps(overrides, "read")}
      ></SwitchField>
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              datetime,
              receiverType,
              note,
              read,
              message: value,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
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
          isDisabled={!(idProp || remindersModelProp)}
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
              !(idProp || remindersModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
