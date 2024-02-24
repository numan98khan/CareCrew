/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ReasonCreateFormInputValues = {
    area?: string;
    status?: string;
    reason?: string;
};
export declare type ReasonCreateFormValidationValues = {
    area?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReasonCreateFormOverridesProps = {
    ReasonCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    area?: PrimitiveOverrideProps<SelectFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReasonCreateFormProps = React.PropsWithChildren<{
    overrides?: ReasonCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReasonCreateFormInputValues) => ReasonCreateFormInputValues;
    onSuccess?: (fields: ReasonCreateFormInputValues) => void;
    onError?: (fields: ReasonCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReasonCreateFormInputValues) => ReasonCreateFormInputValues;
    onValidate?: ReasonCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReasonCreateForm(props: ReasonCreateFormProps): React.ReactElement;
