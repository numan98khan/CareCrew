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
import { getChatRoom } from "../graphql/queries";
import { updateChatRoom } from "../graphql/mutations";
export default function ChatRoomUpdateForm(props) {
  const {
    id: idProp,
    chatRoom: chatRoomModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    latestMessage: "",
    latestMessageTime: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [latestMessage, setLatestMessage] = React.useState(
    initialValues.latestMessage
  );
  const [latestMessageTime, setLatestMessageTime] = React.useState(
    initialValues.latestMessageTime
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = chatRoomRecord
      ? { ...initialValues, ...chatRoomRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setLatestMessage(cleanValues.latestMessage);
    setLatestMessageTime(cleanValues.latestMessageTime);
    setErrors({});
  };
  const [chatRoomRecord, setChatRoomRecord] = React.useState(chatRoomModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getChatRoom.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getChatRoom
        : chatRoomModelProp;
      setChatRoomRecord(record);
    };
    queryData();
  }, [idProp, chatRoomModelProp]);
  React.useEffect(resetStateValues, [chatRoomRecord]);
  const validations = {
    title: [],
    latestMessage: [],
    latestMessageTime: [],
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
          title: title ?? null,
          latestMessage: latestMessage ?? null,
          latestMessageTime: latestMessageTime ?? null,
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
            query: updateChatRoom.replaceAll("__typename", ""),
            variables: {
              input: {
                id: chatRoomRecord.id,
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
      {...getOverrideProps(overrides, "ChatRoomUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              latestMessage,
              latestMessageTime,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Latest message"
        isRequired={false}
        isReadOnly={false}
        value={latestMessage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              latestMessage: value,
              latestMessageTime,
            };
            const result = onChange(modelFields);
            value = result?.latestMessage ?? value;
          }
          if (errors.latestMessage?.hasError) {
            runValidationTasks("latestMessage", value);
          }
          setLatestMessage(value);
        }}
        onBlur={() => runValidationTasks("latestMessage", latestMessage)}
        errorMessage={errors.latestMessage?.errorMessage}
        hasError={errors.latestMessage?.hasError}
        {...getOverrideProps(overrides, "latestMessage")}
      ></TextField>
      <TextField
        label="Latest message time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={latestMessageTime && convertToLocal(new Date(latestMessageTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              title,
              latestMessage,
              latestMessageTime: value,
            };
            const result = onChange(modelFields);
            value = result?.latestMessageTime ?? value;
          }
          if (errors.latestMessageTime?.hasError) {
            runValidationTasks("latestMessageTime", value);
          }
          setLatestMessageTime(value);
        }}
        onBlur={() =>
          runValidationTasks("latestMessageTime", latestMessageTime)
        }
        errorMessage={errors.latestMessageTime?.errorMessage}
        hasError={errors.latestMessageTime?.hasError}
        {...getOverrideProps(overrides, "latestMessageTime")}
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
          isDisabled={!(idProp || chatRoomModelProp)}
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
              !(idProp || chatRoomModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
