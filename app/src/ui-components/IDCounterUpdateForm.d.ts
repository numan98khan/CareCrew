/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { IDCounter } from "../models";
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
export declare type IDCounterUpdateFormInputValues = {
    people?: number;
    facility?: number;
    invoice?: number;
};
export declare type IDCounterUpdateFormValidationValues = {
    people?: ValidationFunction<number>;
    facility?: ValidationFunction<number>;
    invoice?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IDCounterUpdateFormOverridesProps = {
    IDCounterUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    people?: PrimitiveOverrideProps<TextFieldProps>;
    facility?: PrimitiveOverrideProps<TextFieldProps>;
    invoice?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IDCounterUpdateFormProps = React.PropsWithChildren<{
    overrides?: IDCounterUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    iDCounter?: IDCounter;
    onSubmit?: (fields: IDCounterUpdateFormInputValues) => IDCounterUpdateFormInputValues;
    onSuccess?: (fields: IDCounterUpdateFormInputValues) => void;
    onError?: (fields: IDCounterUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IDCounterUpdateFormInputValues) => IDCounterUpdateFormInputValues;
    onValidate?: IDCounterUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IDCounterUpdateForm(props: IDCounterUpdateFormProps): React.ReactElement;
