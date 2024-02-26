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
export declare type FacilityUpdateFormInputValues = {
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
export declare type FacilityUpdateFormValidationValues = {
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
export declare type FacilityUpdateFormOverridesProps = {
    FacilityUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type FacilityUpdateFormProps = React.PropsWithChildren<{
    overrides?: FacilityUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    facility?: any;
    onSubmit?: (fields: FacilityUpdateFormInputValues) => FacilityUpdateFormInputValues;
    onSuccess?: (fields: FacilityUpdateFormInputValues) => void;
    onError?: (fields: FacilityUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FacilityUpdateFormInputValues) => FacilityUpdateFormInputValues;
    onValidate?: FacilityUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FacilityUpdateForm(props: FacilityUpdateFormProps): React.ReactElement;
