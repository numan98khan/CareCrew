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
export declare type AccountLimitsLookupUpdateFormInputValues = {
    facilityID?: string;
    attribute?: string;
    month?: number;
    amount?: number;
};
export declare type AccountLimitsLookupUpdateFormValidationValues = {
    facilityID?: ValidationFunction<string>;
    attribute?: ValidationFunction<string>;
    month?: ValidationFunction<number>;
    amount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccountLimitsLookupUpdateFormOverridesProps = {
    AccountLimitsLookupUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    facilityID?: PrimitiveOverrideProps<TextFieldProps>;
    attribute?: PrimitiveOverrideProps<TextFieldProps>;
    month?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AccountLimitsLookupUpdateFormProps = React.PropsWithChildren<{
    overrides?: AccountLimitsLookupUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    accountLimitsLookup?: any;
    onSubmit?: (fields: AccountLimitsLookupUpdateFormInputValues) => AccountLimitsLookupUpdateFormInputValues;
    onSuccess?: (fields: AccountLimitsLookupUpdateFormInputValues) => void;
    onError?: (fields: AccountLimitsLookupUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AccountLimitsLookupUpdateFormInputValues) => AccountLimitsLookupUpdateFormInputValues;
    onValidate?: AccountLimitsLookupUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AccountLimitsLookupUpdateForm(props: AccountLimitsLookupUpdateFormProps): React.ReactElement;
