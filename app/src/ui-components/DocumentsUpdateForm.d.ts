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
export declare type DocumentsUpdateFormInputValues = {
    docURL?: string;
    name?: string;
};
export declare type DocumentsUpdateFormValidationValues = {
    docURL?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DocumentsUpdateFormOverridesProps = {
    DocumentsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    docURL?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DocumentsUpdateFormProps = React.PropsWithChildren<{
    overrides?: DocumentsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    documents?: any;
    onSubmit?: (fields: DocumentsUpdateFormInputValues) => DocumentsUpdateFormInputValues;
    onSuccess?: (fields: DocumentsUpdateFormInputValues) => void;
    onError?: (fields: DocumentsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DocumentsUpdateFormInputValues) => DocumentsUpdateFormInputValues;
    onValidate?: DocumentsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DocumentsUpdateForm(props: DocumentsUpdateFormProps): React.ReactElement;
