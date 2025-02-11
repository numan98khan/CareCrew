/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { IDCounter } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function IDCounterCreateForm(props) {
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
    people: "",
    facility: "",
    invoice: "",
  };
  const [people, setPeople] = React.useState(initialValues.people);
  const [facility, setFacility] = React.useState(initialValues.facility);
  const [invoice, setInvoice] = React.useState(initialValues.invoice);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPeople(initialValues.people);
    setFacility(initialValues.facility);
    setInvoice(initialValues.invoice);
    setErrors({});
  };
  const validations = {
    people: [],
    facility: [],
    invoice: [],
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
          people,
          facility,
          invoice,
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
          await DataStore.save(new IDCounter(modelFields));
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
      {...getOverrideProps(overrides, "IDCounterCreateForm")}
      {...rest}
    >
      <TextField
        label="People"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={people}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              people: value,
              facility,
              invoice,
            };
            const result = onChange(modelFields);
            value = result?.people ?? value;
          }
          if (errors.people?.hasError) {
            runValidationTasks("people", value);
          }
          setPeople(value);
        }}
        onBlur={() => runValidationTasks("people", people)}
        errorMessage={errors.people?.errorMessage}
        hasError={errors.people?.hasError}
        {...getOverrideProps(overrides, "people")}
      ></TextField>
      <TextField
        label="Facility"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={facility}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              people,
              facility: value,
              invoice,
            };
            const result = onChange(modelFields);
            value = result?.facility ?? value;
          }
          if (errors.facility?.hasError) {
            runValidationTasks("facility", value);
          }
          setFacility(value);
        }}
        onBlur={() => runValidationTasks("facility", facility)}
        errorMessage={errors.facility?.errorMessage}
        hasError={errors.facility?.hasError}
        {...getOverrideProps(overrides, "facility")}
      ></TextField>
      <TextField
        label="Invoice"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={invoice}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              people,
              facility,
              invoice: value,
            };
            const result = onChange(modelFields);
            value = result?.invoice ?? value;
          }
          if (errors.invoice?.hasError) {
            runValidationTasks("invoice", value);
          }
          setInvoice(value);
        }}
        onBlur={() => runValidationTasks("invoice", invoice)}
        errorMessage={errors.invoice?.errorMessage}
        hasError={errors.invoice?.hasError}
        {...getOverrideProps(overrides, "invoice")}
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
