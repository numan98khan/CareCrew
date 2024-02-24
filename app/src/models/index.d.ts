import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum NotificationTypes {
  SHIFT_ASSIGNMENT = "SHIFT_ASSIGNMENT",
  ADMIN_REMINDER = "ADMIN_REMINDER",
  IN_APP = "IN_APP",
  TEXT = "TEXT",
  EMAIL = "EMAIL"
}

export enum AreaTypes {
  DASHBOARD = "DASHBOARD",
  SCHEDULES = "SCHEDULES",
  WHOSON = "WHOSON",
  PEOPLE = "PEOPLE",
  FACILITIES = "FACILITIES",
  MESSAGING = "MESSAGING",
  TIMECARD = "TIMECARD",
  SUPPORT = "SUPPORT",
  SETTINGS = "SETTINGS",
  REPORTS = "REPORTS"
}

export enum Status {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE"
}

export enum PeopleTypes {
  FACILITY = "FACILITY",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  ALL = "ALL"
}

export enum Roles {
  LPN = "LPN",
  RN = "RN",
  CNA = "CNA"
}

type EagerInvoiceFrequencyTypes = {
  readonly Daily?: string | null;
  readonly Weekly?: string | null;
  readonly Monthly?: string | null;
}

type LazyInvoiceFrequencyTypes = {
  readonly Daily?: string | null;
  readonly Weekly?: string | null;
  readonly Monthly?: string | null;
}

export declare type InvoiceFrequencyTypes = LazyLoading extends LazyLoadingDisabled ? EagerInvoiceFrequencyTypes : LazyInvoiceFrequencyTypes

export declare const InvoiceFrequencyTypes: (new (init: ModelInit<InvoiceFrequencyTypes>) => InvoiceFrequencyTypes)

type EagerInvoiceDeliveryTypes = {
  readonly Email?: string | null;
  readonly Mail?: string | null;
  readonly Both?: string | null;
}

type LazyInvoiceDeliveryTypes = {
  readonly Email?: string | null;
  readonly Mail?: string | null;
  readonly Both?: string | null;
}

export declare type InvoiceDeliveryTypes = LazyLoading extends LazyLoadingDisabled ? EagerInvoiceDeliveryTypes : LazyInvoiceDeliveryTypes

export declare const InvoiceDeliveryTypes: (new (init: ModelInit<InvoiceDeliveryTypes>) => InvoiceDeliveryTypes)

type EagerDocument = {
  readonly name?: string | null;
  readonly expiration?: string | null;
  readonly key?: string | null;
}

type LazyDocument = {
  readonly name?: string | null;
  readonly expiration?: string | null;
  readonly key?: string | null;
}

export declare type Document = LazyLoading extends LazyLoadingDisabled ? EagerDocument : LazyDocument

export declare const Document: (new (init: ModelInit<Document>) => Document)

type EagerFloors = {
  readonly floorNumber?: string | null;
}

type LazyFloors = {
  readonly floorNumber?: string | null;
}

export declare type Floors = LazyLoading extends LazyLoadingDisabled ? EagerFloors : LazyFloors

export declare const Floors: (new (init: ModelInit<Floors>) => Floors)

type EagerInvoiceDetails = {
  readonly description?: string | null;
  readonly quantity?: number | null;
  readonly amount?: number | null;
}

type LazyInvoiceDetails = {
  readonly description?: string | null;
  readonly quantity?: number | null;
  readonly amount?: number | null;
}

export declare type InvoiceDetails = LazyLoading extends LazyLoadingDisabled ? EagerInvoiceDetails : LazyInvoiceDetails

export declare const InvoiceDetails: (new (init: ModelInit<InvoiceDetails>) => InvoiceDetails)

type EagerContact = {
  readonly name?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly position?: string | null;
}

type LazyContact = {
  readonly name?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly position?: string | null;
}

export declare type Contact = LazyLoading extends LazyLoadingDisabled ? EagerContact : LazyContact

export declare const Contact: (new (init: ModelInit<Contact>) => Contact)

type EagerCheckList = {
  readonly name?: string | null;
  readonly isBool?: boolean | null;
}

type LazyCheckList = {
  readonly name?: string | null;
  readonly isBool?: boolean | null;
}

export declare type CheckList = LazyLoading extends LazyLoadingDisabled ? EagerCheckList : LazyCheckList

export declare const CheckList: (new (init: ModelInit<CheckList>) => CheckList)

type EagerIncentive = {
  readonly incentiveBy?: string | null;
  readonly incentiveType?: string | null;
  readonly incentiveAmount?: number | null;
  readonly notes?: string | null;
}

type LazyIncentive = {
  readonly incentiveBy?: string | null;
  readonly incentiveType?: string | null;
  readonly incentiveAmount?: number | null;
  readonly notes?: string | null;
}

export declare type Incentive = LazyLoading extends LazyLoadingDisabled ? EagerIncentive : LazyIncentive

export declare const Incentive: (new (init: ModelInit<Incentive>) => Incentive)

type EagerRequests = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Requests, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly peopleID: string;
  readonly facilityID: string;
  readonly onAvailability?: boolean | null;
  readonly shiftID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRequests = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Requests, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly peopleID: string;
  readonly facilityID: string;
  readonly onAvailability?: boolean | null;
  readonly shiftID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Requests = LazyLoading extends LazyLoadingDisabled ? EagerRequests : LazyRequests

export declare const Requests: (new (init: ModelInit<Requests>) => Requests) & {
  copyOf(source: Requests, mutator: (draft: MutableModel<Requests>) => MutableModel<Requests> | void): Requests;
}

type EagerBilling = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Billing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly allowOvertime?: boolean | null;
  readonly maxBillingMonthly?: number | null;
  readonly remainingBillingMonthly?: number | null;
  readonly hourlyRate?: string | null;
  readonly hourlyRateCNA?: string | null;
  readonly hourlyRateLPN?: string | null;
  readonly hourlyRateRN?: string | null;
  readonly weekendHourlyRate?: number | null;
  readonly holidayHourlyRate?: number | null;
  readonly maxMonthlyIncentive?: number | null;
  readonly remainingMonthlyIncentive?: number | null;
  readonly maxHourlyIncentive?: number | null;
  readonly maxFixedIncentive?: number | null;
  readonly billingEmail?: string | null;
  readonly billingMonth?: string | null;
  readonly invoiceDelivery?: string | null;
  readonly invoiceFrequency?: string | null;
  readonly topUpPercentage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBilling = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Billing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly allowOvertime?: boolean | null;
  readonly maxBillingMonthly?: number | null;
  readonly remainingBillingMonthly?: number | null;
  readonly hourlyRate?: string | null;
  readonly hourlyRateCNA?: string | null;
  readonly hourlyRateLPN?: string | null;
  readonly hourlyRateRN?: string | null;
  readonly weekendHourlyRate?: number | null;
  readonly holidayHourlyRate?: number | null;
  readonly maxMonthlyIncentive?: number | null;
  readonly remainingMonthlyIncentive?: number | null;
  readonly maxHourlyIncentive?: number | null;
  readonly maxFixedIncentive?: number | null;
  readonly billingEmail?: string | null;
  readonly billingMonth?: string | null;
  readonly invoiceDelivery?: string | null;
  readonly invoiceFrequency?: string | null;
  readonly topUpPercentage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Billing = LazyLoading extends LazyLoadingDisabled ? EagerBilling : LazyBilling

export declare const Billing: (new (init: ModelInit<Billing>) => Billing) & {
  copyOf(source: Billing, mutator: (draft: MutableModel<Billing>) => MutableModel<Billing> | void): Billing;
}

type EagerReviews = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reviews, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly peopleID: string;
  readonly review?: string | null;
  readonly rating?: number | null;
  readonly facilityName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReviews = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reviews, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly peopleID: string;
  readonly review?: string | null;
  readonly rating?: number | null;
  readonly facilityName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reviews = LazyLoading extends LazyLoadingDisabled ? EagerReviews : LazyReviews

export declare const Reviews: (new (init: ModelInit<Reviews>) => Reviews) & {
  copyOf(source: Reviews, mutator: (draft: MutableModel<Reviews>) => MutableModel<Reviews> | void): Reviews;
}

type EagerNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notifications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Receivers?: (NotificationsPeople | null)[] | null;
  readonly peopleID: string;
  readonly type?: string | null;
  readonly subject?: string | null;
  readonly body?: string | null;
  readonly thumbnail?: string | null;
  readonly organization?: string | null;
  readonly receivers?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notifications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Receivers: AsyncCollection<NotificationsPeople>;
  readonly peopleID: string;
  readonly type?: string | null;
  readonly subject?: string | null;
  readonly body?: string | null;
  readonly thumbnail?: string | null;
  readonly organization?: string | null;
  readonly receivers?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Notifications = LazyLoading extends LazyLoadingDisabled ? EagerNotifications : LazyNotifications

export declare const Notifications: (new (init: ModelInit<Notifications>) => Notifications) & {
  copyOf(source: Notifications, mutator: (draft: MutableModel<Notifications>) => MutableModel<Notifications> | void): Notifications;
}

type EagerReminders = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reminders, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly datetime?: string | null;
  readonly receiverType?: PeopleTypes | keyof typeof PeopleTypes | null;
  readonly note?: string | null;
  readonly People?: (RemindersPeople | null)[] | null;
  readonly read?: boolean | null;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReminders = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reminders, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly datetime?: string | null;
  readonly receiverType?: PeopleTypes | keyof typeof PeopleTypes | null;
  readonly note?: string | null;
  readonly People: AsyncCollection<RemindersPeople>;
  readonly read?: boolean | null;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reminders = LazyLoading extends LazyLoadingDisabled ? EagerReminders : LazyReminders

export declare const Reminders: (new (init: ModelInit<Reminders>) => Reminders) & {
  copyOf(source: Reminders, mutator: (draft: MutableModel<Reminders>) => MutableModel<Reminders> | void): Reminders;
}

type EagerFCMLookup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FCMLookup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly other_token?: string | null;
  readonly fcm_token?: string | null;
  readonly apns_token?: string | null;
  readonly topic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFCMLookup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FCMLookup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly other_token?: string | null;
  readonly fcm_token?: string | null;
  readonly apns_token?: string | null;
  readonly topic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FCMLookup = LazyLoading extends LazyLoadingDisabled ? EagerFCMLookup : LazyFCMLookup

export declare const FCMLookup: (new (init: ModelInit<FCMLookup>) => FCMLookup) & {
  copyOf(source: FCMLookup, mutator: (draft: MutableModel<FCMLookup>) => MutableModel<FCMLookup> | void): FCMLookup;
}

type EagerAccountLimitsLookup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AccountLimitsLookup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly facilityID?: string | null;
  readonly attribute?: string | null;
  readonly month?: number | null;
  readonly amount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAccountLimitsLookup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AccountLimitsLookup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly facilityID?: string | null;
  readonly attribute?: string | null;
  readonly month?: number | null;
  readonly amount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AccountLimitsLookup = LazyLoading extends LazyLoadingDisabled ? EagerAccountLimitsLookup : LazyAccountLimitsLookup

export declare const AccountLimitsLookup: (new (init: ModelInit<AccountLimitsLookup>) => AccountLimitsLookup) & {
  copyOf(source: AccountLimitsLookup, mutator: (draft: MutableModel<AccountLimitsLookup>) => MutableModel<AccountLimitsLookup> | void): AccountLimitsLookup;
}

type EagerInvoice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Invoice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dueDate?: string | null;
  readonly amount?: number | null;
  readonly description?: (InvoiceDetails | null)[] | null;
  readonly surrogateID?: number | null;
  readonly receiver?: string | null;
  readonly receiverID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInvoice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Invoice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dueDate?: string | null;
  readonly amount?: number | null;
  readonly description?: (InvoiceDetails | null)[] | null;
  readonly surrogateID?: number | null;
  readonly receiver?: string | null;
  readonly receiverID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Invoice = LazyLoading extends LazyLoadingDisabled ? EagerInvoice : LazyInvoice

export declare const Invoice: (new (init: ModelInit<Invoice>) => Invoice) & {
  copyOf(source: Invoice, mutator: (draft: MutableModel<Invoice>) => MutableModel<Invoice> | void): Invoice;
}

type EagerSupportTickets = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SupportTickets, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly details?: string | null;
  readonly reasonID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySupportTickets = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SupportTickets, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly details?: string | null;
  readonly reasonID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SupportTickets = LazyLoading extends LazyLoadingDisabled ? EagerSupportTickets : LazySupportTickets

export declare const SupportTickets: (new (init: ModelInit<SupportTickets>) => SupportTickets) & {
  copyOf(source: SupportTickets, mutator: (draft: MutableModel<SupportTickets>) => MutableModel<SupportTickets> | void): SupportTickets;
}

type EagerReason = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reason, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly area?: AreaTypes | keyof typeof AreaTypes | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly reason?: string | null;
  readonly SupportTickets?: (SupportTickets | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReason = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reason, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly area?: AreaTypes | keyof typeof AreaTypes | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly reason?: string | null;
  readonly SupportTickets: AsyncCollection<SupportTickets>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reason = LazyLoading extends LazyLoadingDisabled ? EagerReason : LazyReason

export declare const Reason: (new (init: ModelInit<Reason>) => Reason) & {
  copyOf(source: Reason, mutator: (draft: MutableModel<Reason>) => MutableModel<Reason> | void): Reason;
}

type EagerPoints = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Points, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reason?: string | null;
  readonly point?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPoints = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Points, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reason?: string | null;
  readonly point?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Points = LazyLoading extends LazyLoadingDisabled ? EagerPoints : LazyPoints

export declare const Points: (new (init: ModelInit<Points>) => Points) & {
  copyOf(source: Points, mutator: (draft: MutableModel<Points>) => MutableModel<Points> | void): Points;
}

type EagerTemplates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Templates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subject?: string | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly body?: string | null;
  readonly alt?: string | null;
  readonly type?: string | null;
  readonly peopleID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTemplates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Templates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subject?: string | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly body?: string | null;
  readonly alt?: string | null;
  readonly type?: string | null;
  readonly peopleID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Templates = LazyLoading extends LazyLoadingDisabled ? EagerTemplates : LazyTemplates

export declare const Templates: (new (init: ModelInit<Templates>) => Templates) & {
  copyOf(source: Templates, mutator: (draft: MutableModel<Templates>) => MutableModel<Templates> | void): Templates;
}

type EagerNews = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<News, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly peopleID: string;
  readonly datetime?: string | null;
  readonly headline?: string | null;
  readonly news?: string | null;
  readonly receivers?: string | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly alt?: string | null;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNews = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<News, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly peopleID: string;
  readonly datetime?: string | null;
  readonly headline?: string | null;
  readonly news?: string | null;
  readonly receivers?: string | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly alt?: string | null;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type News = LazyLoading extends LazyLoadingDisabled ? EagerNews : LazyNews

export declare const News: (new (init: ModelInit<News>) => News) & {
  copyOf(source: News, mutator: (draft: MutableModel<News>) => MutableModel<News> | void): News;
}

type EagerManualTimecard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ManualTimecard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clockInTime?: string | null;
  readonly clockOutTime?: string | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly role?: Roles | keyof typeof Roles | null;
  readonly notes?: string | null;
  readonly timeType?: string | null;
  readonly hours?: number | null;
  readonly minutes?: number | null;
  readonly status?: string | null;
  readonly isBreak?: boolean | null;
  readonly isOvertime?: boolean | null;
  readonly payrollCycle?: string | null;
  readonly incentiveAmount?: number | null;
  readonly incentiveBy?: string | null;
  readonly incentiveType?: string | null;
  readonly rate?: number | null;
  readonly peopleSurrogateID?: number | null;
  readonly invoiceProcessedFacility?: boolean | null;
  readonly invoiceProcessedEmployee?: boolean | null;
  readonly peopleID: string;
  readonly facilityID: string;
  readonly timecardID?: string | null;
  readonly Timecard?: Timecard | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly manualTimecardTimecardId?: string | null;
}

type LazyManualTimecard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ManualTimecard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clockInTime?: string | null;
  readonly clockOutTime?: string | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  readonly role?: Roles | keyof typeof Roles | null;
  readonly notes?: string | null;
  readonly timeType?: string | null;
  readonly hours?: number | null;
  readonly minutes?: number | null;
  readonly status?: string | null;
  readonly isBreak?: boolean | null;
  readonly isOvertime?: boolean | null;
  readonly payrollCycle?: string | null;
  readonly incentiveAmount?: number | null;
  readonly incentiveBy?: string | null;
  readonly incentiveType?: string | null;
  readonly rate?: number | null;
  readonly peopleSurrogateID?: number | null;
  readonly invoiceProcessedFacility?: boolean | null;
  readonly invoiceProcessedEmployee?: boolean | null;
  readonly peopleID: string;
  readonly facilityID: string;
  readonly timecardID?: string | null;
  readonly Timecard: AsyncItem<Timecard | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly manualTimecardTimecardId?: string | null;
}

export declare type ManualTimecard = LazyLoading extends LazyLoadingDisabled ? EagerManualTimecard : LazyManualTimecard

export declare const ManualTimecard: (new (init: ModelInit<ManualTimecard>) => ManualTimecard) & {
  copyOf(source: ManualTimecard, mutator: (draft: MutableModel<ManualTimecard>) => MutableModel<ManualTimecard> | void): ManualTimecard;
}

type EagerTimecard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Timecard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clockInTime?: string | null;
  readonly clockOutTime?: string | null;
  readonly desiredClockInTime?: string | null;
  readonly desiredClockOutTime?: string | null;
  readonly isAutoClockOut?: boolean | null;
  readonly isAutoClockIn?: boolean | null;
  readonly allowedDelay?: number | null;
  readonly allowedDelayClockIn?: number | null;
  readonly allowedDelayClockOut?: number | null;
  readonly isCallOff?: boolean | null;
  readonly peopleID: string;
  readonly shiftsID: string;
  readonly TimecardGEOEvents?: (TimecardGEOEvents | null)[] | null;
  readonly isLate?: boolean | null;
  readonly isOvertime?: boolean | null;
  readonly lateReason?: string | null;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimecard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Timecard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clockInTime?: string | null;
  readonly clockOutTime?: string | null;
  readonly desiredClockInTime?: string | null;
  readonly desiredClockOutTime?: string | null;
  readonly isAutoClockOut?: boolean | null;
  readonly isAutoClockIn?: boolean | null;
  readonly allowedDelay?: number | null;
  readonly allowedDelayClockIn?: number | null;
  readonly allowedDelayClockOut?: number | null;
  readonly isCallOff?: boolean | null;
  readonly peopleID: string;
  readonly shiftsID: string;
  readonly TimecardGEOEvents: AsyncCollection<TimecardGEOEvents>;
  readonly isLate?: boolean | null;
  readonly isOvertime?: boolean | null;
  readonly lateReason?: string | null;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Timecard = LazyLoading extends LazyLoadingDisabled ? EagerTimecard : LazyTimecard

export declare const Timecard: (new (init: ModelInit<Timecard>) => Timecard) & {
  copyOf(source: Timecard, mutator: (draft: MutableModel<Timecard>) => MutableModel<Timecard> | void): Timecard;
}

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly document?: Document | null;
  readonly peopleID: string;
  readonly chatroomID: string;
  readonly platform?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly document?: Document | null;
  readonly peopleID: string;
  readonly chatroomID: string;
  readonly platform?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly People?: (ChatRoomPeople | null)[] | null;
  readonly Messages?: (Message | null)[] | null;
  readonly title?: string | null;
  readonly latestMessage?: string | null;
  readonly latestMessageTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly People: AsyncCollection<ChatRoomPeople>;
  readonly Messages: AsyncCollection<Message>;
  readonly title?: string | null;
  readonly latestMessage?: string | null;
  readonly latestMessageTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerShifts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shifts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly numOfPositions?: string | null;
  readonly shiftStart?: string | null;
  readonly shiftEnd?: string | null;
  readonly shiftStartDT?: string | null;
  readonly shiftEndDT?: string | null;
  readonly date?: string | null;
  readonly roleRequired?: Roles | keyof typeof Roles | null;
  readonly rate?: number | null;
  readonly floorNumber?: string | null;
  readonly supervisor?: string | null;
  readonly incentives?: Incentive | null;
  readonly cancellationGuarantee?: boolean | null;
  readonly isAssigned?: boolean | null;
  readonly isIncentive?: boolean | null;
  readonly isGuarantee?: boolean | null;
  readonly isLate?: boolean | null;
  readonly isCallOff?: boolean | null;
  readonly isSelected?: boolean | null;
  readonly isHoliday?: boolean | null;
  readonly isArchive?: boolean | null;
  readonly recurringSchedule?: string | null;
  readonly facilityID: string;
  readonly Timecards?: (Timecard | null)[] | null;
  readonly hide?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShifts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shifts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly numOfPositions?: string | null;
  readonly shiftStart?: string | null;
  readonly shiftEnd?: string | null;
  readonly shiftStartDT?: string | null;
  readonly shiftEndDT?: string | null;
  readonly date?: string | null;
  readonly roleRequired?: Roles | keyof typeof Roles | null;
  readonly rate?: number | null;
  readonly floorNumber?: string | null;
  readonly supervisor?: string | null;
  readonly incentives?: Incentive | null;
  readonly cancellationGuarantee?: boolean | null;
  readonly isAssigned?: boolean | null;
  readonly isIncentive?: boolean | null;
  readonly isGuarantee?: boolean | null;
  readonly isLate?: boolean | null;
  readonly isCallOff?: boolean | null;
  readonly isSelected?: boolean | null;
  readonly isHoliday?: boolean | null;
  readonly isArchive?: boolean | null;
  readonly recurringSchedule?: string | null;
  readonly facilityID: string;
  readonly Timecards: AsyncCollection<Timecard>;
  readonly hide?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shifts = LazyLoading extends LazyLoadingDisabled ? EagerShifts : LazyShifts

export declare const Shifts: (new (init: ModelInit<Shifts>) => Shifts) & {
  copyOf(source: Shifts, mutator: (draft: MutableModel<Shifts>) => MutableModel<Shifts> | void): Shifts;
}

type EagerFacility = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Facility, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FacilityPeople?: (PeopleFacility | null)[] | null;
  readonly imgSrc?: string | null;
  readonly facilityName?: string | null;
  readonly aboutFacility?: string | null;
  readonly streetAddress?: string | null;
  readonly country?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly contacts?: (Contact | null)[] | null;
  readonly email?: string | null;
  readonly isHidden?: boolean | null;
  readonly permissions?: string | null;
  readonly adminHold?: boolean | null;
  readonly Shifts?: (Shifts | null)[] | null;
  readonly ManualTimecards?: (ManualTimecard | null)[] | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly floors?: (Floors | null)[] | null;
  readonly documents?: Document | null;
  readonly Billing?: Billing | null;
  readonly Requests?: (Requests | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly facilityBillingId?: string | null;
}

type LazyFacility = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Facility, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FacilityPeople: AsyncCollection<PeopleFacility>;
  readonly imgSrc?: string | null;
  readonly facilityName?: string | null;
  readonly aboutFacility?: string | null;
  readonly streetAddress?: string | null;
  readonly country?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly contacts?: (Contact | null)[] | null;
  readonly email?: string | null;
  readonly isHidden?: boolean | null;
  readonly permissions?: string | null;
  readonly adminHold?: boolean | null;
  readonly Shifts: AsyncCollection<Shifts>;
  readonly ManualTimecards: AsyncCollection<ManualTimecard>;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly floors?: (Floors | null)[] | null;
  readonly documents?: Document | null;
  readonly Billing: AsyncItem<Billing | undefined>;
  readonly Requests: AsyncCollection<Requests>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly facilityBillingId?: string | null;
}

export declare type Facility = LazyLoading extends LazyLoadingDisabled ? EagerFacility : LazyFacility

export declare const Facility: (new (init: ModelInit<Facility>) => Facility) & {
  copyOf(source: Facility, mutator: (draft: MutableModel<Facility>) => MutableModel<Facility> | void): Facility;
}

type EagerIDCounter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IDCounter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly people?: number | null;
  readonly facility?: number | null;
  readonly invoice?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIDCounter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IDCounter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly people?: number | null;
  readonly facility?: number | null;
  readonly invoice?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type IDCounter = LazyLoading extends LazyLoadingDisabled ? EagerIDCounter : LazyIDCounter

export declare const IDCounter: (new (init: ModelInit<IDCounter>) => IDCounter) & {
  copyOf(source: IDCounter, mutator: (draft: MutableModel<IDCounter>) => MutableModel<IDCounter> | void): IDCounter;
}

type EagerDocuments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Documents, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly docURL?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDocuments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Documents, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly docURL?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Documents = LazyLoading extends LazyLoadingDisabled ? EagerDocuments : LazyDocuments

export declare const Documents: (new (init: ModelInit<Documents>) => Documents) & {
  copyOf(source: Documents, mutator: (draft: MutableModel<Documents>) => MutableModel<Documents> | void): Documents;
}

type EagerTimecardGEOEvents = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimecardGEOEvents, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly event?: string | null;
  readonly timecardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimecardGEOEvents = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimecardGEOEvents, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly event?: string | null;
  readonly timecardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimecardGEOEvents = LazyLoading extends LazyLoadingDisabled ? EagerTimecardGEOEvents : LazyTimecardGEOEvents

export declare const TimecardGEOEvents: (new (init: ModelInit<TimecardGEOEvents>) => TimecardGEOEvents) & {
  copyOf(source: TimecardGEOEvents, mutator: (draft: MutableModel<TimecardGEOEvents>) => MutableModel<TimecardGEOEvents> | void): TimecardGEOEvents;
}

type EagerPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<People, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly surrogateID?: number | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phoneNumber?: string | null;
  readonly documents?: (Document | null)[] | null;
  readonly country?: string | null;
  readonly streetAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly timezone?: string | null;
  readonly language?: string | null;
  readonly isEmailNotifications?: boolean | null;
  readonly isTextNotification?: boolean | null;
  readonly effectiveStartDate?: string | null;
  readonly driverLicenseNumber?: string | null;
  readonly driverLicenseState?: string | null;
  readonly SSN?: string | null;
  readonly uniformSize?: string | null;
  readonly isCompleteDrugScreening?: boolean | null;
  readonly emergencyContactName?: string | null;
  readonly emergencyContactNumber?: string | null;
  readonly emergencyContactRelationship?: string | null;
  readonly milesToWork?: number | null;
  readonly licenseCode?: string | null;
  readonly profilePicture?: string | null;
  readonly role?: Roles | keyof typeof Roles | null;
  readonly status?: string | null;
  readonly personalNote?: string | null;
  readonly payrollCycle?: string | null;
  readonly email?: string | null;
  readonly points?: number | null;
  readonly rating?: number | null;
  readonly position?: string | null;
  readonly isTerminated?: boolean | null;
  readonly lastActivity?: string | null;
  readonly lastActivityNotifications?: string | null;
  readonly adminHold?: boolean | null;
  readonly PeopleFacility?: (PeopleFacility | null)[] | null;
  readonly chatrooms?: (ChatRoomPeople | null)[] | null;
  readonly Messages?: (Message | null)[] | null;
  readonly empCheckList?: (CheckList | null)[] | null;
  readonly permissions?: string | null;
  readonly Timecards?: (Timecard | null)[] | null;
  readonly ManualTimecards?: (ManualTimecard | null)[] | null;
  readonly News?: (News | null)[] | null;
  readonly Templates?: (Templates | null)[] | null;
  readonly type?: string | null;
  readonly availability?: string | null;
  readonly reminderss?: (RemindersPeople | null)[] | null;
  readonly notificationss?: (NotificationsPeople | null)[] | null;
  readonly Notifications?: (Notifications | null)[] | null;
  readonly immunization?: string | null;
  readonly Reviews?: (Reviews | null)[] | null;
  readonly Requests?: (Requests | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<People, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly surrogateID?: number | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phoneNumber?: string | null;
  readonly documents?: (Document | null)[] | null;
  readonly country?: string | null;
  readonly streetAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly timezone?: string | null;
  readonly language?: string | null;
  readonly isEmailNotifications?: boolean | null;
  readonly isTextNotification?: boolean | null;
  readonly effectiveStartDate?: string | null;
  readonly driverLicenseNumber?: string | null;
  readonly driverLicenseState?: string | null;
  readonly SSN?: string | null;
  readonly uniformSize?: string | null;
  readonly isCompleteDrugScreening?: boolean | null;
  readonly emergencyContactName?: string | null;
  readonly emergencyContactNumber?: string | null;
  readonly emergencyContactRelationship?: string | null;
  readonly milesToWork?: number | null;
  readonly licenseCode?: string | null;
  readonly profilePicture?: string | null;
  readonly role?: Roles | keyof typeof Roles | null;
  readonly status?: string | null;
  readonly personalNote?: string | null;
  readonly payrollCycle?: string | null;
  readonly email?: string | null;
  readonly points?: number | null;
  readonly rating?: number | null;
  readonly position?: string | null;
  readonly isTerminated?: boolean | null;
  readonly lastActivity?: string | null;
  readonly lastActivityNotifications?: string | null;
  readonly adminHold?: boolean | null;
  readonly PeopleFacility: AsyncCollection<PeopleFacility>;
  readonly chatrooms: AsyncCollection<ChatRoomPeople>;
  readonly Messages: AsyncCollection<Message>;
  readonly empCheckList?: (CheckList | null)[] | null;
  readonly permissions?: string | null;
  readonly Timecards: AsyncCollection<Timecard>;
  readonly ManualTimecards: AsyncCollection<ManualTimecard>;
  readonly News: AsyncCollection<News>;
  readonly Templates: AsyncCollection<Templates>;
  readonly type?: string | null;
  readonly availability?: string | null;
  readonly reminderss: AsyncCollection<RemindersPeople>;
  readonly notificationss: AsyncCollection<NotificationsPeople>;
  readonly Notifications: AsyncCollection<Notifications>;
  readonly immunization?: string | null;
  readonly Reviews: AsyncCollection<Reviews>;
  readonly Requests: AsyncCollection<Requests>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type People = LazyLoading extends LazyLoadingDisabled ? EagerPeople : LazyPeople

export declare const People: (new (init: ModelInit<People>) => People) & {
  copyOf(source: People, mutator: (draft: MutableModel<People>) => MutableModel<People> | void): People;
}

type EagerNotificationsPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NotificationsPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly notificationsId?: string | null;
  readonly peopleId?: string | null;
  readonly notifications: Notifications;
  readonly people: People;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotificationsPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NotificationsPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly notificationsId?: string | null;
  readonly peopleId?: string | null;
  readonly notifications: AsyncItem<Notifications>;
  readonly people: AsyncItem<People>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NotificationsPeople = LazyLoading extends LazyLoadingDisabled ? EagerNotificationsPeople : LazyNotificationsPeople

export declare const NotificationsPeople: (new (init: ModelInit<NotificationsPeople>) => NotificationsPeople) & {
  copyOf(source: NotificationsPeople, mutator: (draft: MutableModel<NotificationsPeople>) => MutableModel<NotificationsPeople> | void): NotificationsPeople;
}

type EagerRemindersPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RemindersPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly remindersId?: string | null;
  readonly peopleId?: string | null;
  readonly reminders: Reminders;
  readonly people: People;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRemindersPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RemindersPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly remindersId?: string | null;
  readonly peopleId?: string | null;
  readonly reminders: AsyncItem<Reminders>;
  readonly people: AsyncItem<People>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RemindersPeople = LazyLoading extends LazyLoadingDisabled ? EagerRemindersPeople : LazyRemindersPeople

export declare const RemindersPeople: (new (init: ModelInit<RemindersPeople>) => RemindersPeople) & {
  copyOf(source: RemindersPeople, mutator: (draft: MutableModel<RemindersPeople>) => MutableModel<RemindersPeople> | void): RemindersPeople;
}

type EagerChatRoomPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoomPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly peopleId?: string | null;
  readonly chatRoom: ChatRoom;
  readonly people: People;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChatRoomPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoomPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly peopleId?: string | null;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly people: AsyncItem<People>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChatRoomPeople = LazyLoading extends LazyLoadingDisabled ? EagerChatRoomPeople : LazyChatRoomPeople

export declare const ChatRoomPeople: (new (init: ModelInit<ChatRoomPeople>) => ChatRoomPeople) & {
  copyOf(source: ChatRoomPeople, mutator: (draft: MutableModel<ChatRoomPeople>) => MutableModel<ChatRoomPeople> | void): ChatRoomPeople;
}

type EagerPeopleFacility = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PeopleFacility, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly facilityId?: string | null;
  readonly peopleId?: string | null;
  readonly facility: Facility;
  readonly people: People;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPeopleFacility = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PeopleFacility, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly facilityId?: string | null;
  readonly peopleId?: string | null;
  readonly facility: AsyncItem<Facility>;
  readonly people: AsyncItem<People>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PeopleFacility = LazyLoading extends LazyLoadingDisabled ? EagerPeopleFacility : LazyPeopleFacility

export declare const PeopleFacility: (new (init: ModelInit<PeopleFacility>) => PeopleFacility) & {
  copyOf(source: PeopleFacility, mutator: (draft: MutableModel<PeopleFacility>) => MutableModel<PeopleFacility> | void): PeopleFacility;
}