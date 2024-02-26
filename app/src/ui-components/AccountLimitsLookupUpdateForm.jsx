/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getAccountLimitsLookup } from "../graphql/queries";
import { updateAccountLimitsLookup } from "../graphql/mutations";
export default function AccountLimitsLookupUpdateForm(props) {
  const {
    id: idProp,
    accountLimitsLookup: accountLimitsLookupModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    facilityID: "",
    attribute: "",
    month: "",
    amount: "",
  };
  const [facilityID, setFacilityID] = React.useState(initialValues.facilityID);
  const [attribute, setAttribute] = React.useState(initialValues.attribute);
  const [month, setMonth] = React.useState(initialValues.month);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = accountLimitsLookupRecord
      ? { ...initialValues, ...accountLimitsLookupRecord }
      : initialValues;
    setFacilityID(cleanValues.facilityID);
    setAttribute(cleanValues.attribute);
    setMonth(cleanValues.month);
    setAmount(cleanValues.amount);
    setErrors({});
  };
  const [accountLimitsLookupRecord, setAccountLimitsLookupRecord] =
    React.useState(accountLimitsLookupModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getAccountLimitsLookup.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getAccountLimitsLookup
        : accountLimitsLookupModelProp;
      setAccountLimitsLookupRecord(record);
    };
    queryData();
  }, [idProp, accountLimitsLookupModelProp]);
  React.useEffect(resetStateValues, [accountLimitsLookupRecord]);
  const validations = {
    facilityID: [],
    attribute: [],
    month: [],
    amount: [],
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
          facilityID: facilityID ?? null,
          attribute: attribute ?? null,
          month: month ?? null,
          amount: amount ?? null,
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
            query: updateAccountLimitsLookup.replaceAll("__typename", ""),
            variables: {
              input: {
                id: accountLimitsLookupRecord.id,
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
      {...getOverrideProps(overrides, "AccountLimitsLookupUpdateForm")}
      {...rest}
    >
      <TextField
        label="Facility id"
        isRequired={false}
        isReadOnly={false}
        value={facilityID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              facilityID: value,
              attribute,
              month,
              amount,
            };
            const result = onChange(modelFields);
            value = result?.facilityID ?? value;
          }
          if (errors.facilityID?.hasError) {
            runValidationTasks("facilityID", value);
          }
          setFacilityID(value);
        }}
        onBlur={() => runValidationTasks("facilityID", facilityID)}
        errorMessage={errors.facilityID?.errorMessage}
        hasError={errors.facilityID?.hasError}
        {...getOverrideProps(overrides, "facilityID")}
      ></TextField>
      <TextField
        label="Attribute"
        isRequired={false}
        isReadOnly={false}
        value={attribute}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              facilityID,
              attribute: value,
              month,
              amount,
            };
            const result = onChange(modelFields);
            value = result?.attribute ?? value;
          }
          if (errors.attribute?.hasError) {
            runValidationTasks("attribute", value);
          }
          setAttribute(value);
        }}
        onBlur={() => runValidationTasks("attribute", attribute)}
        errorMessage={errors.attribute?.errorMessage}
        hasError={errors.attribute?.hasError}
        {...getOverrideProps(overrides, "attribute")}
      ></TextField>
      <TextField
        label="Month"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={month}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              facilityID,
              attribute,
              month: value,
              amount,
            };
            const result = onChange(modelFields);
            value = result?.month ?? value;
          }
          if (errors.month?.hasError) {
            runValidationTasks("month", value);
          }
          setMonth(value);
        }}
        onBlur={() => runValidationTasks("month", month)}
        errorMessage={errors.month?.errorMessage}
        hasError={errors.month?.hasError}
        {...getOverrideProps(overrides, "month")}
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
              facilityID,
              attribute,
              month,
              amount: value,
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
          isDisabled={!(idProp || accountLimitsLookupModelProp)}
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
              !(idProp || accountLimitsLookupModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
