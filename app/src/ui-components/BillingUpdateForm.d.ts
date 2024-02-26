/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type BillingUpdateFormInputValues = {
    allowOvertime?: boolean;
    maxBillingMonthly?: number;
    remainingBillingMonthly?: number;
    hourlyRate?: string;
    hourlyRateCNA?: string;
    hourlyRateLPN?: string;
    hourlyRateRN?: string;
    weekendHourlyRate?: number;
    holidayHourlyRate?: number;
    maxMonthlyIncentive?: number;
    remainingMonthlyIncentive?: number;
    maxHourlyIncentive?: number;
    maxFixedIncentive?: number;
    billingEmail?: string;
    billingMonth?: string;
    invoiceDelivery?: string;
    invoiceFrequency?: string;
    topUpPercentage?: string;
};
export declare type BillingUpdateFormValidationValues = {
    allowOvertime?: ValidationFunction<boolean>;
    maxBillingMonthly?: ValidationFunction<number>;
    remainingBillingMonthly?: ValidationFunction<number>;
    hourlyRate?: ValidationFunction<string>;
    hourlyRateCNA?: ValidationFunction<string>;
    hourlyRateLPN?: ValidationFunction<string>;
    hourlyRateRN?: ValidationFunction<string>;
    weekendHourlyRate?: ValidationFunction<number>;
    holidayHourlyRate?: ValidationFunction<number>;
    maxMonthlyIncentive?: ValidationFunction<number>;
    remainingMonthlyIncentive?: ValidationFunction<number>;
    maxHourlyIncentive?: ValidationFunction<number>;
    maxFixedIncentive?: ValidationFunction<number>;
    billingEmail?: ValidationFunction<string>;
    billingMonth?: ValidationFunction<string>;
    invoiceDelivery?: ValidationFunction<string>;
    invoiceFrequency?: ValidationFunction<string>;
    topUpPercentage?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BillingUpdateFormOverridesProps = {
    BillingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    allowOvertime?: PrimitiveOverrideProps<SwitchFieldProps>;
    maxBillingMonthly?: PrimitiveOverrideProps<TextFieldProps>;
    remainingBillingMonthly?: PrimitiveOverrideProps<TextFieldProps>;
    hourlyRate?: PrimitiveOverrideProps<TextFieldProps>;
    hourlyRateCNA?: PrimitiveOverrideProps<TextFieldProps>;
    hourlyRateLPN?: PrimitiveOverrideProps<TextFieldProps>;
    hourlyRateRN?: PrimitiveOverrideProps<TextFieldProps>;
    weekendHourlyRate?: PrimitiveOverrideProps<TextFieldProps>;
    holidayHourlyRate?: PrimitiveOverrideProps<TextFieldProps>;
    maxMonthlyIncentive?: PrimitiveOverrideProps<TextFieldProps>;
    remainingMonthlyIncentive?: PrimitiveOverrideProps<TextFieldProps>;
    maxHourlyIncentive?: PrimitiveOverrideProps<TextFieldProps>;
    maxFixedIncentive?: PrimitiveOverrideProps<TextFieldProps>;
    billingEmail?: PrimitiveOverrideProps<TextFieldProps>;
    billingMonth?: PrimitiveOverrideProps<TextFieldProps>;
    invoiceDelivery?: PrimitiveOverrideProps<TextFieldProps>;
    invoiceFrequency?: PrimitiveOverrideProps<TextFieldProps>;
    topUpPercentage?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BillingUpdateFormProps = React.PropsWithChildren<{
    overrides?: BillingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    billing?: any;
    onSubmit?: (fields: BillingUpdateFormInputValues) => BillingUpdateFormInputValues;
    onSuccess?: (fields: BillingUpdateFormInputValues) => void;
    onError?: (fields: BillingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BillingUpdateFormInputValues) => BillingUpdateFormInputValues;
    onValidate?: BillingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BillingUpdateForm(props: BillingUpdateFormProps): React.ReactElement;
