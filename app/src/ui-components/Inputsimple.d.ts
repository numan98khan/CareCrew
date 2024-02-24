/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InputsimpleOverridesProps = {
    Inputsimple?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<ViewProps>;
    user?: PrimitiveOverrideProps<ViewProps>;
    Vector434?: PrimitiveOverrideProps<IconProps>;
    Vector435?: PrimitiveOverrideProps<IconProps>;
    "User Name"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type InputsimpleProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: InputsimpleOverridesProps | undefined | null;
}>;
export default function Inputsimple(props: InputsimpleProps): React.ReactElement;
