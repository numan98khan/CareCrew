/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FacilityCreateFormInputValues = {
    imgSrc?: string;
    facilityName?: string;
    aboutFacility?: string;
    streetAddress?: string;
    country?: string;
    city?: string;
    state?: string;
    zip?: string;
    email?: string;
    isHidden?: boolean;
    permissions?: string;
    adminHold?: boolean;
    lat?: number;
    lng?: number;
};
export declare type FacilityCreateFormValidationValues = {
    imgSrc?: ValidationFunction<string>;
    facilityName?: ValidationFunction<string>;
    aboutFacility?: ValidationFunction<string>;
    streetAddress?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zip?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    isHidden?: ValidationFunction<boolean>;
    permissions?: ValidationFunction<string>;
    adminHold?: ValidationFunction<boolean>;
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FacilityCreateFormOverridesProps = {
    FacilityCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    imgSrc?: PrimitiveOverrideProps<TextFieldProps>;
    facilityName?: PrimitiveOverrideProps<TextFieldProps>;
    aboutFacility?: PrimitiveOverrideProps<TextFieldProps>;
    streetAddress?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zip?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    isHidden?: PrimitiveOverrideProps<SwitchFieldProps>;
    permissions?: PrimitiveOverrideProps<TextFieldProps>;
    adminHold?: PrimitiveOverrideProps<SwitchFieldProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FacilityCreateFormProps = React.PropsWithChildren<{
    overrides?: FacilityCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FacilityCreateFormInputValues) => FacilityCreateFormInputValues;
    onSuccess?: (fields: FacilityCreateFormInputValues) => void;
    onError?: (fields: FacilityCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FacilityCreateFormInputValues) => FacilityCreateFormInputValues;
    onValidate?: FacilityCreateFormValidationValues;
} & React.CSSProperties>;
export default function FacilityCreateForm(props: FacilityCreateFormProps): React.ReactElement;
