/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type RemindersCreateFormInputValues = {
    date?: string;
    time?: string;
    datetime?: string;
    receiverType?: string;
    note?: string;
    read?: boolean;
    message?: string;
};
export declare type RemindersCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    datetime?: ValidationFunction<string>;
    receiverType?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
    read?: ValidationFunction<boolean>;
    message?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RemindersCreateFormOverridesProps = {
    RemindersCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    datetime?: PrimitiveOverrideProps<TextFieldProps>;
    receiverType?: PrimitiveOverrideProps<SelectFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    read?: PrimitiveOverrideProps<SwitchFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RemindersCreateFormProps = React.PropsWithChildren<{
    overrides?: RemindersCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RemindersCreateFormInputValues) => RemindersCreateFormInputValues;
    onSuccess?: (fields: RemindersCreateFormInputValues) => void;
    onError?: (fields: RemindersCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RemindersCreateFormInputValues) => RemindersCreateFormInputValues;
    onValidate?: RemindersCreateFormValidationValues;
} & React.CSSProperties>;
export default function RemindersCreateForm(props: RemindersCreateFormProps): React.ReactElement;
