/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Employees } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeelistitemOverridesProps = {
    Employeelistitem?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 3"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 16"?: PrimitiveOverrideProps<FlexProps>;
    "0 pts"?: PrimitiveOverrideProps<TextProps>;
    "Rectangle 10"?: PrimitiveOverrideProps<ImageProps>;
    Demi?: PrimitiveOverrideProps<TextProps>;
    RN?: PrimitiveOverrideProps<TextProps>;
    Available?: PrimitiveOverrideProps<TextProps>;
    "Ellipse 2"?: PrimitiveOverrideProps<IconProps>;
    "demi@outlook.com"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type EmployeelistitemProps = React.PropsWithChildren<Partial<ViewProps> & {
    employees?: Employees;
} & {
    overrides?: EmployeelistitemOverridesProps | undefined | null;
}>;
export default function Employeelistitem(props: EmployeelistitemProps): React.ReactElement;
