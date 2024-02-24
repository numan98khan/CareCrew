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
export declare type FCMLookupCreateFormInputValues = {
    other_token?: string;
    fcm_token?: string;
    apns_token?: string;
    topic?: string;
};
export declare type FCMLookupCreateFormValidationValues = {
    other_token?: ValidationFunction<string>;
    fcm_token?: ValidationFunction<string>;
    apns_token?: ValidationFunction<string>;
    topic?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FCMLookupCreateFormOverridesProps = {
    FCMLookupCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    other_token?: PrimitiveOverrideProps<TextFieldProps>;
    fcm_token?: PrimitiveOverrideProps<TextFieldProps>;
    apns_token?: PrimitiveOverrideProps<TextFieldProps>;
    topic?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FCMLookupCreateFormProps = React.PropsWithChildren<{
    overrides?: FCMLookupCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FCMLookupCreateFormInputValues) => FCMLookupCreateFormInputValues;
    onSuccess?: (fields: FCMLookupCreateFormInputValues) => void;
    onError?: (fields: FCMLookupCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FCMLookupCreateFormInputValues) => FCMLookupCreateFormInputValues;
    onValidate?: FCMLookupCreateFormValidationValues;
} & React.CSSProperties>;
export default function FCMLookupCreateForm(props: FCMLookupCreateFormProps): React.ReactElement;
