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
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { Billing } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function BillingUpdateForm(props) {
  const {
    id: idProp,
    billing: billingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    allowOvertime: false,
    maxBillingMonthly: "",
    remainingBillingMonthly: "",
    hourlyRate: "",
    hourlyRateCNA: "",
    hourlyRateLPN: "",
    hourlyRateRN: "",
    weekendHourlyRate: "",
    holidayHourlyRate: "",
    maxMonthlyIncentive: "",
    remainingMonthlyIncentive: "",
    maxHourlyIncentive: "",
    maxFixedIncentive: "",
    billingEmail: "",
    billingMonth: "",
    invoiceDelivery: "",
    invoiceFrequency: "",
    topUpPercentage: "",
  };
  const [allowOvertime, setAllowOvertime] = React.useState(
    initialValues.allowOvertime
  );
  const [maxBillingMonthly, setMaxBillingMonthly] = React.useState(
    initialValues.maxBillingMonthly
  );
  const [remainingBillingMonthly, setRemainingBillingMonthly] = React.useState(
    initialValues.remainingBillingMonthly
  );
  const [hourlyRate, setHourlyRate] = React.useState(initialValues.hourlyRate);
  const [hourlyRateCNA, setHourlyRateCNA] = React.useState(
    initialValues.hourlyRateCNA
  );
  const [hourlyRateLPN, setHourlyRateLPN] = React.useState(
    initialValues.hourlyRateLPN
  );
  const [hourlyRateRN, setHourlyRateRN] = React.useState(
    initialValues.hourlyRateRN
  );
  const [weekendHourlyRate, setWeekendHourlyRate] = React.useState(
    initialValues.weekendHourlyRate
  );
  const [holidayHourlyRate, setHolidayHourlyRate] = React.useState(
    initialValues.holidayHourlyRate
  );
  const [maxMonthlyIncentive, setMaxMonthlyIncentive] = React.useState(
    initialValues.maxMonthlyIncentive
  );
  const [remainingMonthlyIncentive, setRemainingMonthlyIncentive] =
    React.useState(initialValues.remainingMonthlyIncentive);
  const [maxHourlyIncentive, setMaxHourlyIncentive] = React.useState(
    initialValues.maxHourlyIncentive
  );
  const [maxFixedIncentive, setMaxFixedIncentive] = React.useState(
    initialValues.maxFixedIncentive
  );
  const [billingEmail, setBillingEmail] = React.useState(
    initialValues.billingEmail
  );
  const [billingMonth, setBillingMonth] = React.useState(
    initialValues.billingMonth
  );
  const [invoiceDelivery, setInvoiceDelivery] = React.useState(
    initialValues.invoiceDelivery
  );
  const [invoiceFrequency, setInvoiceFrequency] = React.useState(
    initialValues.invoiceFrequency
  );
  const [topUpPercentage, setTopUpPercentage] = React.useState(
    initialValues.topUpPercentage
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = billingRecord
      ? { ...initialValues, ...billingRecord }
      : initialValues;
    setAllowOvertime(cleanValues.allowOvertime);
    setMaxBillingMonthly(cleanValues.maxBillingMonthly);
    setRemainingBillingMonthly(cleanValues.remainingBillingMonthly);
    setHourlyRate(cleanValues.hourlyRate);
    setHourlyRateCNA(cleanValues.hourlyRateCNA);
    setHourlyRateLPN(cleanValues.hourlyRateLPN);
    setHourlyRateRN(cleanValues.hourlyRateRN);
    setWeekendHourlyRate(cleanValues.weekendHourlyRate);
    setHolidayHourlyRate(cleanValues.holidayHourlyRate);
    setMaxMonthlyIncentive(cleanValues.maxMonthlyIncentive);
    setRemainingMonthlyIncentive(cleanValues.remainingMonthlyIncentive);
    setMaxHourlyIncentive(cleanValues.maxHourlyIncentive);
    setMaxFixedIncentive(cleanValues.maxFixedIncentive);
    setBillingEmail(cleanValues.billingEmail);
    setBillingMonth(cleanValues.billingMonth);
    setInvoiceDelivery(cleanValues.invoiceDelivery);
    setInvoiceFrequency(cleanValues.invoiceFrequency);
    setTopUpPercentage(cleanValues.topUpPercentage);
    setErrors({});
  };
  const [billingRecord, setBillingRecord] = React.useState(billingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Billing, idProp)
        : billingModelProp;
      setBillingRecord(record);
    };
    queryData();
  }, [idProp, billingModelProp]);
  React.useEffect(resetStateValues, [billingRecord]);
  const validations = {
    allowOvertime: [],
    maxBillingMonthly: [],
    remainingBillingMonthly: [],
    hourlyRate: [],
    hourlyRateCNA: [],
    hourlyRateLPN: [],
    hourlyRateRN: [],
    weekendHourlyRate: [],
    holidayHourlyRate: [],
    maxMonthlyIncentive: [],
    remainingMonthlyIncentive: [],
    maxHourlyIncentive: [],
    maxFixedIncentive: [],
    billingEmail: [{ type: "Email" }],
    billingMonth: [],
    invoiceDelivery: [],
    invoiceFrequency: [],
    topUpPercentage: [],
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
          allowOvertime,
          maxBillingMonthly,
          remainingBillingMonthly,
          hourlyRate,
          hourlyRateCNA,
          hourlyRateLPN,
          hourlyRateRN,
          weekendHourlyRate,
          holidayHourlyRate,
          maxMonthlyIncentive,
          remainingMonthlyIncentive,
          maxHourlyIncentive,
          maxFixedIncentive,
          billingEmail,
          billingMonth,
          invoiceDelivery,
          invoiceFrequency,
          topUpPercentage,
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
            Billing.copyOf(billingRecord, (updated) => {
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
      {...getOverrideProps(overrides, "BillingUpdateForm")}
      {...rest}
    >
      <SwitchField
        label="Allow overtime"
        defaultChecked={false}
        isDisabled={false}
        isChecked={allowOvertime}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              allowOvertime: value,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.allowOvertime ?? value;
          }
          if (errors.allowOvertime?.hasError) {
            runValidationTasks("allowOvertime", value);
          }
          setAllowOvertime(value);
        }}
        onBlur={() => runValidationTasks("allowOvertime", allowOvertime)}
        errorMessage={errors.allowOvertime?.errorMessage}
        hasError={errors.allowOvertime?.hasError}
        {...getOverrideProps(overrides, "allowOvertime")}
      ></SwitchField>
      <TextField
        label="Max billing monthly"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxBillingMonthly}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly: value,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.maxBillingMonthly ?? value;
          }
          if (errors.maxBillingMonthly?.hasError) {
            runValidationTasks("maxBillingMonthly", value);
          }
          setMaxBillingMonthly(value);
        }}
        onBlur={() =>
          runValidationTasks("maxBillingMonthly", maxBillingMonthly)
        }
        errorMessage={errors.maxBillingMonthly?.errorMessage}
        hasError={errors.maxBillingMonthly?.hasError}
        {...getOverrideProps(overrides, "maxBillingMonthly")}
      ></TextField>
      <TextField
        label="Remaining billing monthly"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={remainingBillingMonthly}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly: value,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.remainingBillingMonthly ?? value;
          }
          if (errors.remainingBillingMonthly?.hasError) {
            runValidationTasks("remainingBillingMonthly", value);
          }
          setRemainingBillingMonthly(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingBillingMonthly", remainingBillingMonthly)
        }
        errorMessage={errors.remainingBillingMonthly?.errorMessage}
        hasError={errors.remainingBillingMonthly?.hasError}
        {...getOverrideProps(overrides, "remainingBillingMonthly")}
      ></TextField>
      <TextField
        label="Hourly rate"
        isRequired={false}
        isReadOnly={false}
        value={hourlyRate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate: value,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.hourlyRate ?? value;
          }
          if (errors.hourlyRate?.hasError) {
            runValidationTasks("hourlyRate", value);
          }
          setHourlyRate(value);
        }}
        onBlur={() => runValidationTasks("hourlyRate", hourlyRate)}
        errorMessage={errors.hourlyRate?.errorMessage}
        hasError={errors.hourlyRate?.hasError}
        {...getOverrideProps(overrides, "hourlyRate")}
      ></TextField>
      <TextField
        label="Hourly rate cna"
        isRequired={false}
        isReadOnly={false}
        value={hourlyRateCNA}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA: value,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.hourlyRateCNA ?? value;
          }
          if (errors.hourlyRateCNA?.hasError) {
            runValidationTasks("hourlyRateCNA", value);
          }
          setHourlyRateCNA(value);
        }}
        onBlur={() => runValidationTasks("hourlyRateCNA", hourlyRateCNA)}
        errorMessage={errors.hourlyRateCNA?.errorMessage}
        hasError={errors.hourlyRateCNA?.hasError}
        {...getOverrideProps(overrides, "hourlyRateCNA")}
      ></TextField>
      <TextField
        label="Hourly rate lpn"
        isRequired={false}
        isReadOnly={false}
        value={hourlyRateLPN}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN: value,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.hourlyRateLPN ?? value;
          }
          if (errors.hourlyRateLPN?.hasError) {
            runValidationTasks("hourlyRateLPN", value);
          }
          setHourlyRateLPN(value);
        }}
        onBlur={() => runValidationTasks("hourlyRateLPN", hourlyRateLPN)}
        errorMessage={errors.hourlyRateLPN?.errorMessage}
        hasError={errors.hourlyRateLPN?.hasError}
        {...getOverrideProps(overrides, "hourlyRateLPN")}
      ></TextField>
      <TextField
        label="Hourly rate rn"
        isRequired={false}
        isReadOnly={false}
        value={hourlyRateRN}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN: value,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.hourlyRateRN ?? value;
          }
          if (errors.hourlyRateRN?.hasError) {
            runValidationTasks("hourlyRateRN", value);
          }
          setHourlyRateRN(value);
        }}
        onBlur={() => runValidationTasks("hourlyRateRN", hourlyRateRN)}
        errorMessage={errors.hourlyRateRN?.errorMessage}
        hasError={errors.hourlyRateRN?.hasError}
        {...getOverrideProps(overrides, "hourlyRateRN")}
      ></TextField>
      <TextField
        label="Weekend hourly rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={weekendHourlyRate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate: value,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.weekendHourlyRate ?? value;
          }
          if (errors.weekendHourlyRate?.hasError) {
            runValidationTasks("weekendHourlyRate", value);
          }
          setWeekendHourlyRate(value);
        }}
        onBlur={() =>
          runValidationTasks("weekendHourlyRate", weekendHourlyRate)
        }
        errorMessage={errors.weekendHourlyRate?.errorMessage}
        hasError={errors.weekendHourlyRate?.hasError}
        {...getOverrideProps(overrides, "weekendHourlyRate")}
      ></TextField>
      <TextField
        label="Holiday hourly rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={holidayHourlyRate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate: value,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.holidayHourlyRate ?? value;
          }
          if (errors.holidayHourlyRate?.hasError) {
            runValidationTasks("holidayHourlyRate", value);
          }
          setHolidayHourlyRate(value);
        }}
        onBlur={() =>
          runValidationTasks("holidayHourlyRate", holidayHourlyRate)
        }
        errorMessage={errors.holidayHourlyRate?.errorMessage}
        hasError={errors.holidayHourlyRate?.hasError}
        {...getOverrideProps(overrides, "holidayHourlyRate")}
      ></TextField>
      <TextField
        label="Max monthly incentive"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxMonthlyIncentive}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive: value,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.maxMonthlyIncentive ?? value;
          }
          if (errors.maxMonthlyIncentive?.hasError) {
            runValidationTasks("maxMonthlyIncentive", value);
          }
          setMaxMonthlyIncentive(value);
        }}
        onBlur={() =>
          runValidationTasks("maxMonthlyIncentive", maxMonthlyIncentive)
        }
        errorMessage={errors.maxMonthlyIncentive?.errorMessage}
        hasError={errors.maxMonthlyIncentive?.hasError}
        {...getOverrideProps(overrides, "maxMonthlyIncentive")}
      ></TextField>
      <TextField
        label="Remaining monthly incentive"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={remainingMonthlyIncentive}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive: value,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.remainingMonthlyIncentive ?? value;
          }
          if (errors.remainingMonthlyIncentive?.hasError) {
            runValidationTasks("remainingMonthlyIncentive", value);
          }
          setRemainingMonthlyIncentive(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "remainingMonthlyIncentive",
            remainingMonthlyIncentive
          )
        }
        errorMessage={errors.remainingMonthlyIncentive?.errorMessage}
        hasError={errors.remainingMonthlyIncentive?.hasError}
        {...getOverrideProps(overrides, "remainingMonthlyIncentive")}
      ></TextField>
      <TextField
        label="Max hourly incentive"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxHourlyIncentive}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive: value,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.maxHourlyIncentive ?? value;
          }
          if (errors.maxHourlyIncentive?.hasError) {
            runValidationTasks("maxHourlyIncentive", value);
          }
          setMaxHourlyIncentive(value);
        }}
        onBlur={() =>
          runValidationTasks("maxHourlyIncentive", maxHourlyIncentive)
        }
        errorMessage={errors.maxHourlyIncentive?.errorMessage}
        hasError={errors.maxHourlyIncentive?.hasError}
        {...getOverrideProps(overrides, "maxHourlyIncentive")}
      ></TextField>
      <TextField
        label="Max fixed incentive"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxFixedIncentive}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive: value,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.maxFixedIncentive ?? value;
          }
          if (errors.maxFixedIncentive?.hasError) {
            runValidationTasks("maxFixedIncentive", value);
          }
          setMaxFixedIncentive(value);
        }}
        onBlur={() =>
          runValidationTasks("maxFixedIncentive", maxFixedIncentive)
        }
        errorMessage={errors.maxFixedIncentive?.errorMessage}
        hasError={errors.maxFixedIncentive?.hasError}
        {...getOverrideProps(overrides, "maxFixedIncentive")}
      ></TextField>
      <TextField
        label="Billing email"
        isRequired={false}
        isReadOnly={false}
        value={billingEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail: value,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.billingEmail ?? value;
          }
          if (errors.billingEmail?.hasError) {
            runValidationTasks("billingEmail", value);
          }
          setBillingEmail(value);
        }}
        onBlur={() => runValidationTasks("billingEmail", billingEmail)}
        errorMessage={errors.billingEmail?.errorMessage}
        hasError={errors.billingEmail?.hasError}
        {...getOverrideProps(overrides, "billingEmail")}
      ></TextField>
      <TextField
        label="Billing month"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={billingMonth && convertToLocal(new Date(billingMonth))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth: value,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.billingMonth ?? value;
          }
          if (errors.billingMonth?.hasError) {
            runValidationTasks("billingMonth", value);
          }
          setBillingMonth(value);
        }}
        onBlur={() => runValidationTasks("billingMonth", billingMonth)}
        errorMessage={errors.billingMonth?.errorMessage}
        hasError={errors.billingMonth?.hasError}
        {...getOverrideProps(overrides, "billingMonth")}
      ></TextField>
      <TextField
        label="Invoice delivery"
        isRequired={false}
        isReadOnly={false}
        value={invoiceDelivery}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery: value,
              invoiceFrequency,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.invoiceDelivery ?? value;
          }
          if (errors.invoiceDelivery?.hasError) {
            runValidationTasks("invoiceDelivery", value);
          }
          setInvoiceDelivery(value);
        }}
        onBlur={() => runValidationTasks("invoiceDelivery", invoiceDelivery)}
        errorMessage={errors.invoiceDelivery?.errorMessage}
        hasError={errors.invoiceDelivery?.hasError}
        {...getOverrideProps(overrides, "invoiceDelivery")}
      ></TextField>
      <TextField
        label="Invoice frequency"
        isRequired={false}
        isReadOnly={false}
        value={invoiceFrequency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency: value,
              topUpPercentage,
            };
            const result = onChange(modelFields);
            value = result?.invoiceFrequency ?? value;
          }
          if (errors.invoiceFrequency?.hasError) {
            runValidationTasks("invoiceFrequency", value);
          }
          setInvoiceFrequency(value);
        }}
        onBlur={() => runValidationTasks("invoiceFrequency", invoiceFrequency)}
        errorMessage={errors.invoiceFrequency?.errorMessage}
        hasError={errors.invoiceFrequency?.hasError}
        {...getOverrideProps(overrides, "invoiceFrequency")}
      ></TextField>
      <TextField
        label="Top up percentage"
        isRequired={false}
        isReadOnly={false}
        value={topUpPercentage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              allowOvertime,
              maxBillingMonthly,
              remainingBillingMonthly,
              hourlyRate,
              hourlyRateCNA,
              hourlyRateLPN,
              hourlyRateRN,
              weekendHourlyRate,
              holidayHourlyRate,
              maxMonthlyIncentive,
              remainingMonthlyIncentive,
              maxHourlyIncentive,
              maxFixedIncentive,
              billingEmail,
              billingMonth,
              invoiceDelivery,
              invoiceFrequency,
              topUpPercentage: value,
            };
            const result = onChange(modelFields);
            value = result?.topUpPercentage ?? value;
          }
          if (errors.topUpPercentage?.hasError) {
            runValidationTasks("topUpPercentage", value);
          }
          setTopUpPercentage(value);
        }}
        onBlur={() => runValidationTasks("topUpPercentage", topUpPercentage)}
        errorMessage={errors.topUpPercentage?.errorMessage}
        hasError={errors.topUpPercentage?.hasError}
        {...getOverrideProps(overrides, "topUpPercentage")}
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
          isDisabled={!(idProp || billingModelProp)}
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
              !(idProp || billingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
