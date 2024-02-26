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
export declare type ChatRoomUpdateFormInputValues = {
    title?: string;
    latestMessage?: string;
    latestMessageTime?: string;
};
export declare type ChatRoomUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    latestMessage?: ValidationFunction<string>;
    latestMessageTime?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChatRoomUpdateFormOverridesProps = {
    ChatRoomUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    latestMessage?: PrimitiveOverrideProps<TextFieldProps>;
    latestMessageTime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChatRoomUpdateFormProps = React.PropsWithChildren<{
    overrides?: ChatRoomUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    chatRoom?: any;
    onSubmit?: (fields: ChatRoomUpdateFormInputValues) => ChatRoomUpdateFormInputValues;
    onSuccess?: (fields: ChatRoomUpdateFormInputValues) => void;
    onError?: (fields: ChatRoomUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChatRoomUpdateFormInputValues) => ChatRoomUpdateFormInputValues;
    onValidate?: ChatRoomUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ChatRoomUpdateForm(props: ChatRoomUpdateFormProps): React.ReactElement;
