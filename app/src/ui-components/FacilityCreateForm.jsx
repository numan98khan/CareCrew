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
import { Facility } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function FacilityCreateForm(props) {
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
    imgSrc: "",
    facilityName: "",
    aboutFacility: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    isHidden: false,
    permissions: "",
    adminHold: false,
    lat: "",
    lng: "",
  };
  const [imgSrc, setImgSrc] = React.useState(initialValues.imgSrc);
  const [facilityName, setFacilityName] = React.useState(
    initialValues.facilityName
  );
  const [aboutFacility, setAboutFacility] = React.useState(
    initialValues.aboutFacility
  );
  const [streetAddress, setStreetAddress] = React.useState(
    initialValues.streetAddress
  );
  const [country, setCountry] = React.useState(initialValues.country);
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [zip, setZip] = React.useState(initialValues.zip);
  const [email, setEmail] = React.useState(initialValues.email);
  const [isHidden, setIsHidden] = React.useState(initialValues.isHidden);
  const [permissions, setPermissions] = React.useState(
    initialValues.permissions
  );
  const [adminHold, setAdminHold] = React.useState(initialValues.adminHold);
  const [lat, setLat] = React.useState(initialValues.lat);
  const [lng, setLng] = React.useState(initialValues.lng);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setImgSrc(initialValues.imgSrc);
    setFacilityName(initialValues.facilityName);
    setAboutFacility(initialValues.aboutFacility);
    setStreetAddress(initialValues.streetAddress);
    setCountry(initialValues.country);
    setCity(initialValues.city);
    setState(initialValues.state);
    setZip(initialValues.zip);
    setEmail(initialValues.email);
    setIsHidden(initialValues.isHidden);
    setPermissions(initialValues.permissions);
    setAdminHold(initialValues.adminHold);
    setLat(initialValues.lat);
    setLng(initialValues.lng);
    setErrors({});
  };
  const validations = {
    imgSrc: [],
    facilityName: [],
    aboutFacility: [],
    streetAddress: [],
    country: [],
    city: [],
    state: [],
    zip: [],
    email: [{ type: "Email" }],
    isHidden: [],
    permissions: [],
    adminHold: [],
    lat: [],
    lng: [],
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
          imgSrc,
          facilityName,
          aboutFacility,
          streetAddress,
          country,
          city,
          state,
          zip,
          email,
          isHidden,
          permissions,
          adminHold,
          lat,
          lng,
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
          await DataStore.save(new Facility(modelFields));
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
      {...getOverrideProps(overrides, "FacilityCreateForm")}
      {...rest}
    >
      <TextField
        label="Img src"
        isRequired={false}
        isReadOnly={false}
        value={imgSrc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imgSrc: value,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
            };
            const result = onChange(modelFields);
            value = result?.imgSrc ?? value;
          }
          if (errors.imgSrc?.hasError) {
            runValidationTasks("imgSrc", value);
          }
          setImgSrc(value);
        }}
        onBlur={() => runValidationTasks("imgSrc", imgSrc)}
        errorMessage={errors.imgSrc?.errorMessage}
        hasError={errors.imgSrc?.hasError}
        {...getOverrideProps(overrides, "imgSrc")}
      ></TextField>
      <TextField
        label="Facility name"
        isRequired={false}
        isReadOnly={false}
        value={facilityName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName: value,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
            };
            const result = onChange(modelFields);
            value = result?.facilityName ?? value;
          }
          if (errors.facilityName?.hasError) {
            runValidationTasks("facilityName", value);
          }
          setFacilityName(value);
        }}
        onBlur={() => runValidationTasks("facilityName", facilityName)}
        errorMessage={errors.facilityName?.errorMessage}
        hasError={errors.facilityName?.hasError}
        {...getOverrideProps(overrides, "facilityName")}
      ></TextField>
      <TextField
        label="About facility"
        isRequired={false}
        isReadOnly={false}
        value={aboutFacility}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility: value,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
            };
            const result = onChange(modelFields);
            value = result?.aboutFacility ?? value;
          }
          if (errors.aboutFacility?.hasError) {
            runValidationTasks("aboutFacility", value);
          }
          setAboutFacility(value);
        }}
        onBlur={() => runValidationTasks("aboutFacility", aboutFacility)}
        errorMessage={errors.aboutFacility?.errorMessage}
        hasError={errors.aboutFacility?.hasError}
        {...getOverrideProps(overrides, "aboutFacility")}
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
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress: value,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
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
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country: value,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
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
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city: value,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
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
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state: value,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
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
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip: value,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email: value,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng,
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
      <SwitchField
        label="Is hidden"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isHidden}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden: value,
              permissions,
              adminHold,
              lat,
              lng,
            };
            const result = onChange(modelFields);
            value = result?.isHidden ?? value;
          }
          if (errors.isHidden?.hasError) {
            runValidationTasks("isHidden", value);
          }
          setIsHidden(value);
        }}
        onBlur={() => runValidationTasks("isHidden", isHidden)}
        errorMessage={errors.isHidden?.errorMessage}
        hasError={errors.isHidden?.hasError}
        {...getOverrideProps(overrides, "isHidden")}
      ></SwitchField>
      <TextField
        label="Permissions"
        isRequired={false}
        isReadOnly={false}
        value={permissions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions: value,
              adminHold,
              lat,
              lng,
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
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold: value,
              lat,
              lng,
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
      <TextField
        label="Lat"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lat}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat: value,
              lng,
            };
            const result = onChange(modelFields);
            value = result?.lat ?? value;
          }
          if (errors.lat?.hasError) {
            runValidationTasks("lat", value);
          }
          setLat(value);
        }}
        onBlur={() => runValidationTasks("lat", lat)}
        errorMessage={errors.lat?.errorMessage}
        hasError={errors.lat?.hasError}
        {...getOverrideProps(overrides, "lat")}
      ></TextField>
      <TextField
        label="Lng"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lng}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              imgSrc,
              facilityName,
              aboutFacility,
              streetAddress,
              country,
              city,
              state,
              zip,
              email,
              isHidden,
              permissions,
              adminHold,
              lat,
              lng: value,
            };
            const result = onChange(modelFields);
            value = result?.lng ?? value;
          }
          if (errors.lng?.hasError) {
            runValidationTasks("lng", value);
          }
          setLng(value);
        }}
        onBlur={() => runValidationTasks("lng", lng)}
        errorMessage={errors.lng?.errorMessage}
        hasError={errors.lng?.hasError}
        {...getOverrideProps(overrides, "lng")}
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
