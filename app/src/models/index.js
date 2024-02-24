// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationTypes = {
  "SHIFT_ASSIGNMENT": "SHIFT_ASSIGNMENT",
  "ADMIN_REMINDER": "ADMIN_REMINDER",
  "IN_APP": "IN_APP",
  "TEXT": "TEXT",
  "EMAIL": "EMAIL"
};

const AreaTypes = {
  "DASHBOARD": "DASHBOARD",
  "SCHEDULES": "SCHEDULES",
  "WHOSON": "WHOSON",
  "PEOPLE": "PEOPLE",
  "FACILITIES": "FACILITIES",
  "MESSAGING": "MESSAGING",
  "TIMECARD": "TIMECARD",
  "SUPPORT": "SUPPORT",
  "SETTINGS": "SETTINGS",
  "REPORTS": "REPORTS"
};

const Status = {
  "ACTIVE": "ACTIVE",
  "UNACTIVE": "UNACTIVE"
};

const PeopleTypes = {
  "FACILITY": "FACILITY",
  "ADMIN": "ADMIN",
  "EMPLOYEE": "EMPLOYEE",
  "ALL": "ALL"
};

const Roles = {
  "LPN": "LPN",
  "RN": "RN",
  "CNA": "CNA"
};

const { Requests, Billing, Reviews, Notifications, Reminders, FCMLookup, AccountLimitsLookup, Invoice, SupportTickets, Reason, Points, Templates, News, ManualTimecard, Timecard, Message, ChatRoom, Shifts, Facility, IDCounter, Documents, TimecardGEOEvents, People, NotificationsPeople, RemindersPeople, ChatRoomPeople, PeopleFacility, InvoiceFrequencyTypes, InvoiceDeliveryTypes, Document, Floors, InvoiceDetails, Contact, CheckList, Incentive } = initSchema(schema);

export {
  Requests,
  Billing,
  Reviews,
  Notifications,
  Reminders,
  FCMLookup,
  AccountLimitsLookup,
  Invoice,
  SupportTickets,
  Reason,
  Points,
  Templates,
  News,
  ManualTimecard,
  Timecard,
  Message,
  ChatRoom,
  Shifts,
  Facility,
  IDCounter,
  Documents,
  TimecardGEOEvents,
  People,
  NotificationsPeople,
  RemindersPeople,
  ChatRoomPeople,
  PeopleFacility,
  NotificationTypes,
  AreaTypes,
  Status,
  PeopleTypes,
  Roles,
  InvoiceFrequencyTypes,
  InvoiceDeliveryTypes,
  Document,
  Floors,
  InvoiceDetails,
  Contact,
  CheckList,
  Incentive
};