/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Reason } from "../models";
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
export declare type ReasonUpdateFormInputValues = {
    area?: string;
    status?: string;
    reason?: string;
};
export declare type ReasonUpdateFormValidationValues = {
    area?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReasonUpdateFormOverridesProps = {
    ReasonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    area?: PrimitiveOverrideProps<SelectFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReasonUpdateFormProps = React.PropsWithChildren<{
    overrides?: ReasonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    reason?: Reason;
    onSubmit?: (fields: ReasonUpdateFormInputValues) => ReasonUpdateFormInputValues;
    onSuccess?: (fields: ReasonUpdateFormInputValues) => void;
    onError?: (fields: ReasonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReasonUpdateFormInputValues) => ReasonUpdateFormInputValues;
    onValidate?: ReasonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ReasonUpdateForm(props: ReasonUpdateFormProps): React.ReactElement;
