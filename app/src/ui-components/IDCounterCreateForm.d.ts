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
export declare type IDCounterCreateFormInputValues = {
    people?: number;
    facility?: number;
    invoice?: number;
};
export declare type IDCounterCreateFormValidationValues = {
    people?: ValidationFunction<number>;
    facility?: ValidationFunction<number>;
    invoice?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IDCounterCreateFormOverridesProps = {
    IDCounterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    people?: PrimitiveOverrideProps<TextFieldProps>;
    facility?: PrimitiveOverrideProps<TextFieldProps>;
    invoice?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IDCounterCreateFormProps = React.PropsWithChildren<{
    overrides?: IDCounterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: IDCounterCreateFormInputValues) => IDCounterCreateFormInputValues;
    onSuccess?: (fields: IDCounterCreateFormInputValues) => void;
    onError?: (fields: IDCounterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IDCounterCreateFormInputValues) => IDCounterCreateFormInputValues;
    onValidate?: IDCounterCreateFormValidationValues;
} & React.CSSProperties>;
export default function IDCounterCreateForm(props: IDCounterCreateFormProps): React.ReactElement;
