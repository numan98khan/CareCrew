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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getPeople } from "../graphql/queries";
import { updatePeople } from "../graphql/mutations";
export default function PeopleUpdateForm(props) {
  const {
    id: idProp,
    people: peopleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    surrogateID: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    timezone: "",
    language: "",
    isEmailNotifications: false,
    isTextNotification: false,
    effectiveStartDate: "",
    driverLicenseNumber: "",
    driverLicenseState: "",
    SSN: "",
    uniformSize: "",
    isCompleteDrugScreening: false,
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelationship: "",
    milesToWork: "",
    licenseCode: "",
    profilePicture: "",
    role: "",
    status: "",
    personalNote: "",
    payrollCycle: "",
    email: "",
    points: "",
    rating: "",
    position: "",
    isTerminated: false,
    lastActivity: "",
    lastActivityNotifications: "",
    adminHold: false,
    permissions: "",
    type: "",
    availability: "",
    immunization: "",
  };
  const [surrogateID, setSurrogateID] = React.useState(
    initialValues.surrogateID
  );
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [country, setCountry] = React.useState(initialValues.country);
  const [streetAddress, setStreetAddress] = React.useState(
    initialValues.streetAddress
  );
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [zip, setZip] = React.useState(initialValues.zip);
  const [timezone, setTimezone] = React.useState(initialValues.timezone);
  const [language, setLanguage] = React.useState(initialValues.language);
  const [isEmailNotifications, setIsEmailNotifications] = React.useState(
    initialValues.isEmailNotifications
  );
  const [isTextNotification, setIsTextNotification] = React.useState(
    initialValues.isTextNotification
  );
  const [effectiveStartDate, setEffectiveStartDate] = React.useState(
    initialValues.effectiveStartDate
  );
  const [driverLicenseNumber, setDriverLicenseNumber] = React.useState(
    initialValues.driverLicenseNumber
  );
  const [driverLicenseState, setDriverLicenseState] = React.useState(
    initialValues.driverLicenseState
  );
  const [SSN, setSSN] = React.useState(initialValues.SSN);
  const [uniformSize, setUniformSize] = React.useState(
    initialValues.uniformSize
  );
  const [isCompleteDrugScreening, setIsCompleteDrugScreening] = React.useState(
    initialValues.isCompleteDrugScreening
  );
  const [emergencyContactName, setEmergencyContactName] = React.useState(
    initialValues.emergencyContactName
  );
  const [emergencyContactNumber, setEmergencyContactNumber] = React.useState(
    initialValues.emergencyContactNumber
  );
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    React.useState(initialValues.emergencyContactRelationship);
  const [milesToWork, setMilesToWork] = React.useState(
    initialValues.milesToWork
  );
  const [licenseCode, setLicenseCode] = React.useState(
    initialValues.licenseCode
  );
  const [profilePicture, setProfilePicture] = React.useState(
    initialValues.profilePicture
  );
  const [role, setRole] = React.useState(initialValues.role);
  const [status, setStatus] = React.useState(initialValues.status);
  const [personalNote, setPersonalNote] = React.useState(
    initialValues.personalNote
  );
  const [payrollCycle, setPayrollCycle] = React.useState(
    initialValues.payrollCycle
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [points, setPoints] = React.useState(initialValues.points);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [position, setPosition] = React.useState(initialValues.position);
  const [isTerminated, setIsTerminated] = React.useState(
    initialValues.isTerminated
  );
  const [lastActivity, setLastActivity] = React.useState(
    initialValues.lastActivity
  );
  const [lastActivityNotifications, setLastActivityNotifications] =
    React.useState(initialValues.lastActivityNotifications);
  const [adminHold, setAdminHold] = React.useState(initialValues.adminHold);
  const [permissions, setPermissions] = React.useState(
    initialValues.permissions
  );
  const [type, setType] = React.useState(initialValues.type);
  const [availability, setAvailability] = React.useState(
    initialValues.availability
  );
  const [immunization, setImmunization] = React.useState(
    initialValues.immunization
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = peopleRecord
      ? { ...initialValues, ...peopleRecord }
      : initialValues;
    setSurrogateID(cleanValues.surrogateID);
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setPhoneNumber(cleanValues.phoneNumber);
    setCountry(cleanValues.country);
    setStreetAddress(cleanValues.streetAddress);
    setCity(cleanValues.city);
    setState(cleanValues.state);
    setZip(cleanValues.zip);
    setTimezone(cleanValues.timezone);
    setLanguage(cleanValues.language);
    setIsEmailNotifications(cleanValues.isEmailNotifications);
    setIsTextNotification(cleanValues.isTextNotification);
    setEffectiveStartDate(cleanValues.effectiveStartDate);
    setDriverLicenseNumber(cleanValues.driverLicenseNumber);
    setDriverLicenseState(cleanValues.driverLicenseState);
    setSSN(cleanValues.SSN);
    setUniformSize(cleanValues.uniformSize);
    setIsCompleteDrugScreening(cleanValues.isCompleteDrugScreening);
    setEmergencyContactName(cleanValues.emergencyContactName);
    setEmergencyContactNumber(cleanValues.emergencyContactNumber);
    setEmergencyContactRelationship(cleanValues.emergencyContactRelationship);
    setMilesToWork(cleanValues.milesToWork);
    setLicenseCode(cleanValues.licenseCode);
    setProfilePicture(cleanValues.profilePicture);
    setRole(cleanValues.role);
    setStatus(cleanValues.status);
    setPersonalNote(cleanValues.personalNote);
    setPayrollCycle(cleanValues.payrollCycle);
    setEmail(cleanValues.email);
    setPoints(cleanValues.points);
    setRating(cleanValues.rating);
    setPosition(cleanValues.position);
    setIsTerminated(cleanValues.isTerminated);
    setLastActivity(cleanValues.lastActivity);
    setLastActivityNotifications(cleanValues.lastActivityNotifications);
    setAdminHold(cleanValues.adminHold);
    setPermissions(
      typeof cleanValues.permissions === "string" ||
        cleanValues.permissions === null
        ? cleanValues.permissions
        : JSON.stringify(cleanValues.permissions)
    );
    setType(cleanValues.type);
    setAvailability(
      typeof cleanValues.availability === "string" ||
        cleanValues.availability === null
        ? cleanValues.availability
        : JSON.stringify(cleanValues.availability)
    );
    setImmunization(
      typeof cleanValues.immunization === "string" ||
        cleanValues.immunization === null
        ? cleanValues.immunization
        : JSON.stringify(cleanValues.immunization)
    );
    setErrors({});
  };
  const [peopleRecord, setPeopleRecord] = React.useState(peopleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPeople.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPeople
        : peopleModelProp;
      setPeopleRecord(record);
    };
    queryData();
  }, [idProp, peopleModelProp]);
  React.useEffect(resetStateValues, [peopleRecord]);
  const validations = {
    surrogateID: [],
    firstName: [],
    lastName: [],
    phoneNumber: [],
    country: [],
    streetAddress: [],
    city: [],
    state: [],
    zip: [],
    timezone: [],
    language: [],
    isEmailNotifications: [],
    isTextNotification: [],
    effectiveStartDate: [],
    driverLicenseNumber: [],
    driverLicenseState: [],
    SSN: [],
    uniformSize: [],
    isCompleteDrugScreening: [],
    emergencyContactName: [],
    emergencyContactNumber: [],
    emergencyContactRelationship: [],
    milesToWork: [],
    licenseCode: [],
    profilePicture: [],
    role: [],
    status: [],
    personalNote: [],
    payrollCycle: [],
    email: [{ type: "Email" }],
    points: [],
    rating: [],
    position: [],
    isTerminated: [],
    lastActivity: [],
    lastActivityNotifications: [],
    adminHold: [],
    permissions: [{ type: "JSON" }],
    type: [],
    availability: [{ type: "JSON" }],
    immunization: [{ type: "JSON" }],
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
          surrogateID: surrogateID ?? null,
          firstName: firstName ?? null,
          lastName: lastName ?? null,
          phoneNumber: phoneNumber ?? null,
          country: country ?? null,
          streetAddress: streetAddress ?? null,
          city: city ?? null,
          state: state ?? null,
          zip: zip ?? null,
          timezone: timezone ?? null,
          language: language ?? null,
          isEmailNotifications: isEmailNotifications ?? null,
          isTextNotification: isTextNotification ?? null,
          effectiveStartDate: effectiveStartDate ?? null,
          driverLicenseNumber: driverLicenseNumber ?? null,
          driverLicenseState: driverLicenseState ?? null,
          SSN: SSN ?? null,
          uniformSize: uniformSize ?? null,
          isCompleteDrugScreening: isCompleteDrugScreening ?? null,
          emergencyContactName: emergencyContactName ?? null,
          emergencyContactNumber: emergencyContactNumber ?? null,
          emergencyContactRelationship: emergencyContactRelationship ?? null,
          milesToWork: milesToWork ?? null,
          licenseCode: licenseCode ?? null,
          profilePicture: profilePicture ?? null,
          role: role ?? null,
          status: status ?? null,
          personalNote: personalNote ?? null,
          payrollCycle: payrollCycle ?? null,
          email: email ?? null,
          points: points ?? null,
          rating: rating ?? null,
          position: position ?? null,
          isTerminated: isTerminated ?? null,
          lastActivity: lastActivity ?? null,
          lastActivityNotifications: lastActivityNotifications ?? null,
          adminHold: adminHold ?? null,
          permissions: permissions ?? null,
          type: type ?? null,
          availability: availability ?? null,
          immunization: immunization ?? null,
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
            query: updatePeople.replaceAll("__typename", ""),
            variables: {
              input: {
                id: peopleRecord.id,
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
      {...getOverrideProps(overrides, "PeopleUpdateForm")}
      {...rest}
    >
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
              surrogateID: value,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
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
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName: value,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName: value,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={false}
        isReadOnly={false}
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber: value,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.phoneNumber ?? value;
          }
          if (errors.phoneNumber?.hasError) {
            runValidationTasks("phoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("phoneNumber", phoneNumber)}
        errorMessage={errors.phoneNumber?.errorMessage}
        hasError={errors.phoneNumber?.hasError}
        {...getOverrideProps(overrides, "phoneNumber")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country: value,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <TextField
        label="Street address"
        isRequired={false}
        isReadOnly={false}
        value={streetAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress: value,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.streetAddress ?? value;
          }
          if (errors.streetAddress?.hasError) {
            runValidationTasks("streetAddress", value);
          }
          setStreetAddress(value);
        }}
        onBlur={() => runValidationTasks("streetAddress", streetAddress)}
        errorMessage={errors.streetAddress?.errorMessage}
        hasError={errors.streetAddress?.hasError}
        {...getOverrideProps(overrides, "streetAddress")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city: value,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state: value,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Zip"
        isRequired={false}
        isReadOnly={false}
        value={zip}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip: value,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.zip ?? value;
          }
          if (errors.zip?.hasError) {
            runValidationTasks("zip", value);
          }
          setZip(value);
        }}
        onBlur={() => runValidationTasks("zip", zip)}
        errorMessage={errors.zip?.errorMessage}
        hasError={errors.zip?.hasError}
        {...getOverrideProps(overrides, "zip")}
      ></TextField>
      <TextField
        label="Timezone"
        isRequired={false}
        isReadOnly={false}
        value={timezone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone: value,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.timezone ?? value;
          }
          if (errors.timezone?.hasError) {
            runValidationTasks("timezone", value);
          }
          setTimezone(value);
        }}
        onBlur={() => runValidationTasks("timezone", timezone)}
        errorMessage={errors.timezone?.errorMessage}
        hasError={errors.timezone?.hasError}
        {...getOverrideProps(overrides, "timezone")}
      ></TextField>
      <TextField
        label="Language"
        isRequired={false}
        isReadOnly={false}
        value={language}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language: value,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.language ?? value;
          }
          if (errors.language?.hasError) {
            runValidationTasks("language", value);
          }
          setLanguage(value);
        }}
        onBlur={() => runValidationTasks("language", language)}
        errorMessage={errors.language?.errorMessage}
        hasError={errors.language?.hasError}
        {...getOverrideProps(overrides, "language")}
      ></TextField>
      <SwitchField
        label="Is email notifications"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isEmailNotifications}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications: value,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.isEmailNotifications ?? value;
          }
          if (errors.isEmailNotifications?.hasError) {
            runValidationTasks("isEmailNotifications", value);
          }
          setIsEmailNotifications(value);
        }}
        onBlur={() =>
          runValidationTasks("isEmailNotifications", isEmailNotifications)
        }
        errorMessage={errors.isEmailNotifications?.errorMessage}
        hasError={errors.isEmailNotifications?.hasError}
        {...getOverrideProps(overrides, "isEmailNotifications")}
      ></SwitchField>
      <SwitchField
        label="Is text notification"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isTextNotification}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification: value,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.isTextNotification ?? value;
          }
          if (errors.isTextNotification?.hasError) {
            runValidationTasks("isTextNotification", value);
          }
          setIsTextNotification(value);
        }}
        onBlur={() =>
          runValidationTasks("isTextNotification", isTextNotification)
        }
        errorMessage={errors.isTextNotification?.errorMessage}
        hasError={errors.isTextNotification?.hasError}
        {...getOverrideProps(overrides, "isTextNotification")}
      ></SwitchField>
      <TextField
        label="Effective start date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={
          effectiveStartDate && convertToLocal(new Date(effectiveStartDate))
        }
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate: value,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.effectiveStartDate ?? value;
          }
          if (errors.effectiveStartDate?.hasError) {
            runValidationTasks("effectiveStartDate", value);
          }
          setEffectiveStartDate(value);
        }}
        onBlur={() =>
          runValidationTasks("effectiveStartDate", effectiveStartDate)
        }
        errorMessage={errors.effectiveStartDate?.errorMessage}
        hasError={errors.effectiveStartDate?.hasError}
        {...getOverrideProps(overrides, "effectiveStartDate")}
      ></TextField>
      <TextField
        label="Driver license number"
        isRequired={false}
        isReadOnly={false}
        value={driverLicenseNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber: value,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.driverLicenseNumber ?? value;
          }
          if (errors.driverLicenseNumber?.hasError) {
            runValidationTasks("driverLicenseNumber", value);
          }
          setDriverLicenseNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("driverLicenseNumber", driverLicenseNumber)
        }
        errorMessage={errors.driverLicenseNumber?.errorMessage}
        hasError={errors.driverLicenseNumber?.hasError}
        {...getOverrideProps(overrides, "driverLicenseNumber")}
      ></TextField>
      <TextField
        label="Driver license state"
        isRequired={false}
        isReadOnly={false}
        value={driverLicenseState}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState: value,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.driverLicenseState ?? value;
          }
          if (errors.driverLicenseState?.hasError) {
            runValidationTasks("driverLicenseState", value);
          }
          setDriverLicenseState(value);
        }}
        onBlur={() =>
          runValidationTasks("driverLicenseState", driverLicenseState)
        }
        errorMessage={errors.driverLicenseState?.errorMessage}
        hasError={errors.driverLicenseState?.hasError}
        {...getOverrideProps(overrides, "driverLicenseState")}
      ></TextField>
      <TextField
        label="Ssn"
        isRequired={false}
        isReadOnly={false}
        value={SSN}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN: value,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.SSN ?? value;
          }
          if (errors.SSN?.hasError) {
            runValidationTasks("SSN", value);
          }
          setSSN(value);
        }}
        onBlur={() => runValidationTasks("SSN", SSN)}
        errorMessage={errors.SSN?.errorMessage}
        hasError={errors.SSN?.hasError}
        {...getOverrideProps(overrides, "SSN")}
      ></TextField>
      <TextField
        label="Uniform size"
        isRequired={false}
        isReadOnly={false}
        value={uniformSize}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize: value,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.uniformSize ?? value;
          }
          if (errors.uniformSize?.hasError) {
            runValidationTasks("uniformSize", value);
          }
          setUniformSize(value);
        }}
        onBlur={() => runValidationTasks("uniformSize", uniformSize)}
        errorMessage={errors.uniformSize?.errorMessage}
        hasError={errors.uniformSize?.hasError}
        {...getOverrideProps(overrides, "uniformSize")}
      ></TextField>
      <SwitchField
        label="Is complete drug screening"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isCompleteDrugScreening}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening: value,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.isCompleteDrugScreening ?? value;
          }
          if (errors.isCompleteDrugScreening?.hasError) {
            runValidationTasks("isCompleteDrugScreening", value);
          }
          setIsCompleteDrugScreening(value);
        }}
        onBlur={() =>
          runValidationTasks("isCompleteDrugScreening", isCompleteDrugScreening)
        }
        errorMessage={errors.isCompleteDrugScreening?.errorMessage}
        hasError={errors.isCompleteDrugScreening?.hasError}
        {...getOverrideProps(overrides, "isCompleteDrugScreening")}
      ></SwitchField>
      <TextField
        label="Emergency contact name"
        isRequired={false}
        isReadOnly={false}
        value={emergencyContactName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName: value,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.emergencyContactName ?? value;
          }
          if (errors.emergencyContactName?.hasError) {
            runValidationTasks("emergencyContactName", value);
          }
          setEmergencyContactName(value);
        }}
        onBlur={() =>
          runValidationTasks("emergencyContactName", emergencyContactName)
        }
        errorMessage={errors.emergencyContactName?.errorMessage}
        hasError={errors.emergencyContactName?.hasError}
        {...getOverrideProps(overrides, "emergencyContactName")}
      ></TextField>
      <TextField
        label="Emergency contact number"
        isRequired={false}
        isReadOnly={false}
        value={emergencyContactNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber: value,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.emergencyContactNumber ?? value;
          }
          if (errors.emergencyContactNumber?.hasError) {
            runValidationTasks("emergencyContactNumber", value);
          }
          setEmergencyContactNumber(value);
        }}
        onBlur={() =>
          runValidationTasks("emergencyContactNumber", emergencyContactNumber)
        }
        errorMessage={errors.emergencyContactNumber?.errorMessage}
        hasError={errors.emergencyContactNumber?.hasError}
        {...getOverrideProps(overrides, "emergencyContactNumber")}
      ></TextField>
      <TextField
        label="Emergency contact relationship"
        isRequired={false}
        isReadOnly={false}
        value={emergencyContactRelationship}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship: value,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.emergencyContactRelationship ?? value;
          }
          if (errors.emergencyContactRelationship?.hasError) {
            runValidationTasks("emergencyContactRelationship", value);
          }
          setEmergencyContactRelationship(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "emergencyContactRelationship",
            emergencyContactRelationship
          )
        }
        errorMessage={errors.emergencyContactRelationship?.errorMessage}
        hasError={errors.emergencyContactRelationship?.hasError}
        {...getOverrideProps(overrides, "emergencyContactRelationship")}
      ></TextField>
      <TextField
        label="Miles to work"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={milesToWork}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork: value,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.milesToWork ?? value;
          }
          if (errors.milesToWork?.hasError) {
            runValidationTasks("milesToWork", value);
          }
          setMilesToWork(value);
        }}
        onBlur={() => runValidationTasks("milesToWork", milesToWork)}
        errorMessage={errors.milesToWork?.errorMessage}
        hasError={errors.milesToWork?.hasError}
        {...getOverrideProps(overrides, "milesToWork")}
      ></TextField>
      <TextField
        label="License code"
        isRequired={false}
        isReadOnly={false}
        value={licenseCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode: value,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.licenseCode ?? value;
          }
          if (errors.licenseCode?.hasError) {
            runValidationTasks("licenseCode", value);
          }
          setLicenseCode(value);
        }}
        onBlur={() => runValidationTasks("licenseCode", licenseCode)}
        errorMessage={errors.licenseCode?.errorMessage}
        hasError={errors.licenseCode?.hasError}
        {...getOverrideProps(overrides, "licenseCode")}
      ></TextField>
      <TextField
        label="Profile picture"
        isRequired={false}
        isReadOnly={false}
        value={profilePicture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture: value,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.profilePicture ?? value;
          }
          if (errors.profilePicture?.hasError) {
            runValidationTasks("profilePicture", value);
          }
          setProfilePicture(value);
        }}
        onBlur={() => runValidationTasks("profilePicture", profilePicture)}
        errorMessage={errors.profilePicture?.errorMessage}
        hasError={errors.profilePicture?.hasError}
        {...getOverrideProps(overrides, "profilePicture")}
      ></TextField>
      <SelectField
        label="Role"
        placeholder="Please select an option"
        isDisabled={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role: value,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
      >
        <option
          children="Lpn"
          value="LPN"
          {...getOverrideProps(overrides, "roleoption0")}
        ></option>
        <option
          children="Rn"
          value="RN"
          {...getOverrideProps(overrides, "roleoption1")}
        ></option>
        <option
          children="Cna"
          value="CNA"
          {...getOverrideProps(overrides, "roleoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status: value,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
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
      ></TextField>
      <TextField
        label="Personal note"
        isRequired={false}
        isReadOnly={false}
        value={personalNote}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote: value,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.personalNote ?? value;
          }
          if (errors.personalNote?.hasError) {
            runValidationTasks("personalNote", value);
          }
          setPersonalNote(value);
        }}
        onBlur={() => runValidationTasks("personalNote", personalNote)}
        errorMessage={errors.personalNote?.errorMessage}
        hasError={errors.personalNote?.hasError}
        {...getOverrideProps(overrides, "personalNote")}
      ></TextField>
      <TextField
        label="Payroll cycle"
        isRequired={false}
        isReadOnly={false}
        value={payrollCycle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle: value,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.payrollCycle ?? value;
          }
          if (errors.payrollCycle?.hasError) {
            runValidationTasks("payrollCycle", value);
          }
          setPayrollCycle(value);
        }}
        onBlur={() => runValidationTasks("payrollCycle", payrollCycle)}
        errorMessage={errors.payrollCycle?.errorMessage}
        hasError={errors.payrollCycle?.hasError}
        {...getOverrideProps(overrides, "payrollCycle")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email: value,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Points"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={points}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points: value,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.points ?? value;
          }
          if (errors.points?.hasError) {
            runValidationTasks("points", value);
          }
          setPoints(value);
        }}
        onBlur={() => runValidationTasks("points", points)}
        errorMessage={errors.points?.errorMessage}
        hasError={errors.points?.hasError}
        {...getOverrideProps(overrides, "points")}
      ></TextField>
      <TextField
        label="Rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rating}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating: value,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.rating ?? value;
          }
          if (errors.rating?.hasError) {
            runValidationTasks("rating", value);
          }
          setRating(value);
        }}
        onBlur={() => runValidationTasks("rating", rating)}
        errorMessage={errors.rating?.errorMessage}
        hasError={errors.rating?.hasError}
        {...getOverrideProps(overrides, "rating")}
      ></TextField>
      <TextField
        label="Position"
        isRequired={false}
        isReadOnly={false}
        value={position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position: value,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.position ?? value;
          }
          if (errors.position?.hasError) {
            runValidationTasks("position", value);
          }
          setPosition(value);
        }}
        onBlur={() => runValidationTasks("position", position)}
        errorMessage={errors.position?.errorMessage}
        hasError={errors.position?.hasError}
        {...getOverrideProps(overrides, "position")}
      ></TextField>
      <SwitchField
        label="Is terminated"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isTerminated}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated: value,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.isTerminated ?? value;
          }
          if (errors.isTerminated?.hasError) {
            runValidationTasks("isTerminated", value);
          }
          setIsTerminated(value);
        }}
        onBlur={() => runValidationTasks("isTerminated", isTerminated)}
        errorMessage={errors.isTerminated?.errorMessage}
        hasError={errors.isTerminated?.hasError}
        {...getOverrideProps(overrides, "isTerminated")}
      ></SwitchField>
      <TextField
        label="Last activity"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={lastActivity && convertToLocal(new Date(lastActivity))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity: value,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.lastActivity ?? value;
          }
          if (errors.lastActivity?.hasError) {
            runValidationTasks("lastActivity", value);
          }
          setLastActivity(value);
        }}
        onBlur={() => runValidationTasks("lastActivity", lastActivity)}
        errorMessage={errors.lastActivity?.errorMessage}
        hasError={errors.lastActivity?.hasError}
        {...getOverrideProps(overrides, "lastActivity")}
      ></TextField>
      <TextField
        label="Last activity notifications"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={
          lastActivityNotifications &&
          convertToLocal(new Date(lastActivityNotifications))
        }
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications: value,
              adminHold,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.lastActivityNotifications ?? value;
          }
          if (errors.lastActivityNotifications?.hasError) {
            runValidationTasks("lastActivityNotifications", value);
          }
          setLastActivityNotifications(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "lastActivityNotifications",
            lastActivityNotifications
          )
        }
        errorMessage={errors.lastActivityNotifications?.errorMessage}
        hasError={errors.lastActivityNotifications?.hasError}
        {...getOverrideProps(overrides, "lastActivityNotifications")}
      ></TextField>
      <SwitchField
        label="Admin hold"
        defaultChecked={false}
        isDisabled={false}
        isChecked={adminHold}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold: value,
              permissions,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.adminHold ?? value;
          }
          if (errors.adminHold?.hasError) {
            runValidationTasks("adminHold", value);
          }
          setAdminHold(value);
        }}
        onBlur={() => runValidationTasks("adminHold", adminHold)}
        errorMessage={errors.adminHold?.errorMessage}
        hasError={errors.adminHold?.hasError}
        {...getOverrideProps(overrides, "adminHold")}
      ></SwitchField>
      <TextAreaField
        label="Permissions"
        isRequired={false}
        isReadOnly={false}
        value={permissions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions: value,
              type,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.permissions ?? value;
          }
          if (errors.permissions?.hasError) {
            runValidationTasks("permissions", value);
          }
          setPermissions(value);
        }}
        onBlur={() => runValidationTasks("permissions", permissions)}
        errorMessage={errors.permissions?.errorMessage}
        hasError={errors.permissions?.hasError}
        {...getOverrideProps(overrides, "permissions")}
      ></TextAreaField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type: value,
              availability,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextAreaField
        label="Availability"
        isRequired={false}
        isReadOnly={false}
        value={availability}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability: value,
              immunization,
            };
            const result = onChange(modelFields);
            value = result?.availability ?? value;
          }
          if (errors.availability?.hasError) {
            runValidationTasks("availability", value);
          }
          setAvailability(value);
        }}
        onBlur={() => runValidationTasks("availability", availability)}
        errorMessage={errors.availability?.errorMessage}
        hasError={errors.availability?.hasError}
        {...getOverrideProps(overrides, "availability")}
      ></TextAreaField>
      <TextAreaField
        label="Immunization"
        isRequired={false}
        isReadOnly={false}
        value={immunization}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              surrogateID,
              firstName,
              lastName,
              phoneNumber,
              country,
              streetAddress,
              city,
              state,
              zip,
              timezone,
              language,
              isEmailNotifications,
              isTextNotification,
              effectiveStartDate,
              driverLicenseNumber,
              driverLicenseState,
              SSN,
              uniformSize,
              isCompleteDrugScreening,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactRelationship,
              milesToWork,
              licenseCode,
              profilePicture,
              role,
              status,
              personalNote,
              payrollCycle,
              email,
              points,
              rating,
              position,
              isTerminated,
              lastActivity,
              lastActivityNotifications,
              adminHold,
              permissions,
              type,
              availability,
              immunization: value,
            };
            const result = onChange(modelFields);
            value = result?.immunization ?? value;
          }
          if (errors.immunization?.hasError) {
            runValidationTasks("immunization", value);
          }
          setImmunization(value);
        }}
        onBlur={() => runValidationTasks("immunization", immunization)}
        errorMessage={errors.immunization?.errorMessage}
        hasError={errors.immunization?.hasError}
        {...getOverrideProps(overrides, "immunization")}
      ></TextAreaField>
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
          isDisabled={!(idProp || peopleModelProp)}
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
              !(idProp || peopleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
