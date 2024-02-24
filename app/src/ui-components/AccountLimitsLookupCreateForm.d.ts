/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AccountLimitsLookupCreateFormInputValues = {
    facilityID?: string;
    attribute?: string;
    month?: number;
    amount?: number;
};
export declare type AccountLimitsLookupCreateFormValidationValues = {
    facilityID?: ValidationFunction<string>;
    attribute?: ValidationFunction<string>;
    month?: ValidationFunction<number>;
    amount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccountLimitsLookupCreateFormOverridesProps = {
    AccountLimitsLookupCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    facilityID?: PrimitiveOverrideProps<TextFieldProps>;
    attribute?: PrimitiveOverrideProps<TextFieldProps>;
    month?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AccountLimitsLookupCreateFormProps = React.PropsWithChildren<{
    overrides?: AccountLimitsLookupCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AccountLimitsLookupCreateFormInputValues) => AccountLimitsLookupCreateFormInputValues;
    onSuccess?: (fields: AccountLimitsLookupCreateFormInputValues) => void;
    onError?: (fields: AccountLimitsLookupCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AccountLimitsLookupCreateFormInputValues) => AccountLimitsLookupCreateFormInputValues;
    onValidate?: AccountLimitsLookupCreateFormValidationValues;
} & React.CSSProperties>;
export default function AccountLimitsLookupCreateForm(props: AccountLimitsLookupCreateFormProps): React.ReactElement;
