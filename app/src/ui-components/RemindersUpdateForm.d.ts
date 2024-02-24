/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Reminders } from "../models";
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
export declare type RemindersUpdateFormInputValues = {
    date?: string;
    time?: string;
    datetime?: string;
    receiverType?: string;
    note?: string;
    read?: boolean;
    message?: string;
};
export declare type RemindersUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    datetime?: ValidationFunction<string>;
    receiverType?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
    read?: ValidationFunction<boolean>;
    message?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RemindersUpdateFormOverridesProps = {
    RemindersUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    datetime?: PrimitiveOverrideProps<TextFieldProps>;
    receiverType?: PrimitiveOverrideProps<SelectFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    read?: PrimitiveOverrideProps<SwitchFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RemindersUpdateFormProps = React.PropsWithChildren<{
    overrides?: RemindersUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    reminders?: Reminders;
    onSubmit?: (fields: RemindersUpdateFormInputValues) => RemindersUpdateFormInputValues;
    onSuccess?: (fields: RemindersUpdateFormInputValues) => void;
    onError?: (fields: RemindersUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RemindersUpdateFormInputValues) => RemindersUpdateFormInputValues;
    onValidate?: RemindersUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RemindersUpdateForm(props: RemindersUpdateFormProps): React.ReactElement;
