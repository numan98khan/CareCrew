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
  TextField,
} from "@aws-amplify/ui-react";
import { Reason } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ReasonCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    area: "",
    status: "",
    reason: "",
  };
  const [area, setArea] = React.useState(initialValues.area);
  const [status, setStatus] = React.useState(initialValues.status);
  const [reason, setReason] = React.useState(initialValues.reason);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setArea(initialValues.area);
    setStatus(initialValues.status);
    setReason(initialValues.reason);
    setErrors({});
  };
  const validations = {
    area: [],
    status: [],
    reason: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          area,
          status,
          reason,
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
          await DataStore.save(new Reason(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ReasonCreateForm")}
      {...rest}
    >
      <SelectField
        label="Area"
        placeholder="Please select an option"
        isDisabled={false}
        value={area}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              area: value,
              status,
              reason,
            };
            const result = onChange(modelFields);
            value = result?.area ?? value;
          }
          if (errors.area?.hasError) {
            runValidationTasks("area", value);
          }
          setArea(value);
        }}
        onBlur={() => runValidationTasks("area", area)}
        errorMessage={errors.area?.errorMessage}
        hasError={errors.area?.hasError}
        {...getOverrideProps(overrides, "area")}
      >
        <option
          children="Dashboard"
          value="DASHBOARD"
          {...getOverrideProps(overrides, "areaoption0")}
        ></option>
        <option
          children="Schedules"
          value="SCHEDULES"
          {...getOverrideProps(overrides, "areaoption1")}
        ></option>
        <option
          children="Whoson"
          value="WHOSON"
          {...getOverrideProps(overrides, "areaoption2")}
        ></option>
        <option
          children="People"
          value="PEOPLE"
          {...getOverrideProps(overrides, "areaoption3")}
        ></option>
        <option
          children="Facilities"
          value="FACILITIES"
          {...getOverrideProps(overrides, "areaoption4")}
        ></option>
        <option
          children="Messaging"
          value="MESSAGING"
          {...getOverrideProps(overrides, "areaoption5")}
        ></option>
        <option
          children="Timecard"
          value="TIMECARD"
          {...getOverrideProps(overrides, "areaoption6")}
        ></option>
        <option
          children="Support"
          value="SUPPORT"
          {...getOverrideProps(overrides, "areaoption7")}
        ></option>
        <option
          children="Settings"
          value="SETTINGS"
          {...getOverrideProps(overrides, "areaoption8")}
        ></option>
        <option
          children="Reports"
          value="REPORTS"
          {...getOverrideProps(overrides, "areaoption9")}
        ></option>
      </SelectField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              area,
              status: value,
              reason,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Active"
          value="ACTIVE"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Unactive"
          value="UNACTIVE"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Reason"
        isRequired={false}
        isReadOnly={false}
        value={reason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              area,
              status,
              reason: value,
            };
            const result = onChange(modelFields);
            value = result?.reason ?? value;
          }
          if (errors.reason?.hasError) {
            runValidationTasks("reason", value);
          }
          setReason(value);
        }}
        onBlur={() => runValidationTasks("reason", reason)}
        errorMessage={errors.reason?.errorMessage}
        hasError={errors.reason?.hasError}
        {...getOverrideProps(overrides, "reason")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
