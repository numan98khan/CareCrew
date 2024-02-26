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
import { createFCMLookup } from "../graphql/mutations";
export default function FCMLookupCreateForm(props) {
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
    other_token: "",
    fcm_token: "",
    apns_token: "",
    topic: "",
  };
  const [other_token, setOther_token] = React.useState(
    initialValues.other_token
  );
  const [fcm_token, setFcm_token] = React.useState(initialValues.fcm_token);
  const [apns_token, setApns_token] = React.useState(initialValues.apns_token);
  const [topic, setTopic] = React.useState(initialValues.topic);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOther_token(initialValues.other_token);
    setFcm_token(initialValues.fcm_token);
    setApns_token(initialValues.apns_token);
    setTopic(initialValues.topic);
    setErrors({});
  };
  const validations = {
    other_token: [],
    fcm_token: [],
    apns_token: [],
    topic: [],
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
          other_token,
          fcm_token,
          apns_token,
          topic,
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
            query: createFCMLookup.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "FCMLookupCreateForm")}
      {...rest}
    >
      <TextField
        label="Other token"
        isRequired={false}
        isReadOnly={false}
        value={other_token}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              other_token: value,
              fcm_token,
              apns_token,
              topic,
            };
            const result = onChange(modelFields);
            value = result?.other_token ?? value;
          }
          if (errors.other_token?.hasError) {
            runValidationTasks("other_token", value);
          }
          setOther_token(value);
        }}
        onBlur={() => runValidationTasks("other_token", other_token)}
        errorMessage={errors.other_token?.errorMessage}
        hasError={errors.other_token?.hasError}
        {...getOverrideProps(overrides, "other_token")}
      ></TextField>
      <TextField
        label="Fcm token"
        isRequired={false}
        isReadOnly={false}
        value={fcm_token}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              other_token,
              fcm_token: value,
              apns_token,
              topic,
            };
            const result = onChange(modelFields);
            value = result?.fcm_token ?? value;
          }
          if (errors.fcm_token?.hasError) {
            runValidationTasks("fcm_token", value);
          }
          setFcm_token(value);
        }}
        onBlur={() => runValidationTasks("fcm_token", fcm_token)}
        errorMessage={errors.fcm_token?.errorMessage}
        hasError={errors.fcm_token?.hasError}
        {...getOverrideProps(overrides, "fcm_token")}
      ></TextField>
      <TextField
        label="Apns token"
        isRequired={false}
        isReadOnly={false}
        value={apns_token}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              other_token,
              fcm_token,
              apns_token: value,
              topic,
            };
            const result = onChange(modelFields);
            value = result?.apns_token ?? value;
          }
          if (errors.apns_token?.hasError) {
            runValidationTasks("apns_token", value);
          }
          setApns_token(value);
        }}
        onBlur={() => runValidationTasks("apns_token", apns_token)}
        errorMessage={errors.apns_token?.errorMessage}
        hasError={errors.apns_token?.hasError}
        {...getOverrideProps(overrides, "apns_token")}
      ></TextField>
      <TextField
        label="Topic"
        isRequired={false}
        isReadOnly={false}
        value={topic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              other_token,
              fcm_token,
              apns_token,
              topic: value,
            };
            const result = onChange(modelFields);
            value = result?.topic ?? value;
          }
          if (errors.topic?.hasError) {
            runValidationTasks("topic", value);
          }
          setTopic(value);
        }}
        onBlur={() => runValidationTasks("topic", topic)}
        errorMessage={errors.topic?.errorMessage}
        hasError={errors.topic?.hasError}
        {...getOverrideProps(overrides, "topic")}
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
