/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { FCMLookup } from "../models";
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
export declare type FCMLookupUpdateFormInputValues = {
    other_token?: string;
    fcm_token?: string;
    apns_token?: string;
    topic?: string;
};
export declare type FCMLookupUpdateFormValidationValues = {
    other_token?: ValidationFunction<string>;
    fcm_token?: ValidationFunction<string>;
    apns_token?: ValidationFunction<string>;
    topic?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FCMLookupUpdateFormOverridesProps = {
    FCMLookupUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    other_token?: PrimitiveOverrideProps<TextFieldProps>;
    fcm_token?: PrimitiveOverrideProps<TextFieldProps>;
    apns_token?: PrimitiveOverrideProps<TextFieldProps>;
    topic?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FCMLookupUpdateFormProps = React.PropsWithChildren<{
    overrides?: FCMLookupUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    fCMLookup?: FCMLookup;
    onSubmit?: (fields: FCMLookupUpdateFormInputValues) => FCMLookupUpdateFormInputValues;
    onSuccess?: (fields: FCMLookupUpdateFormInputValues) => void;
    onError?: (fields: FCMLookupUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FCMLookupUpdateFormInputValues) => FCMLookupUpdateFormInputValues;
    onValidate?: FCMLookupUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FCMLookupUpdateForm(props: FCMLookupUpdateFormProps): React.ReactElement;
