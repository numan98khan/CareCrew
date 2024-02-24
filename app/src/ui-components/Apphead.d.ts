/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, ImageProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AppheadOverridesProps = {
    Apphead?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 6"?: PrimitiveOverrideProps<ViewProps>;
    bell?: PrimitiveOverrideProps<ViewProps>;
    Vector15?: PrimitiveOverrideProps<IconProps>;
    Vector16?: PrimitiveOverrideProps<IconProps>;
    "Ellipse 39"?: PrimitiveOverrideProps<IconProps>;
    menu?: PrimitiveOverrideProps<ViewProps>;
    Vector19?: PrimitiveOverrideProps<IconProps>;
    Vector110?: PrimitiveOverrideProps<IconProps>;
    Vector111?: PrimitiveOverrideProps<IconProps>;
    "logo 1"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type AppheadProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: AppheadOverridesProps | undefined | null;
}>;
export default function Apphead(props: AppheadProps): React.ReactElement;
