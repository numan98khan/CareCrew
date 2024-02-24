import { FACILITY, ADMIN, EMPLOYEE } from "./userTypes";

export const FACILITY_PERMISSIONS = {
  access: [
    { name: "Dashboard", isSelected: true },
    { name: "Schedule", isSelected: true },
    { name: "Who's ON", isSelected: true },
    { name: "People", isSelected: true },
    { name: "Messaging", isSelected: true },
    { name: "Timecards", isSelected: true },
    { name: "Support", isSelected: true },
    { name: "Total Billing", isSelected: true },
    { name: "Reports", isSelected: true },
  ],
  permissions: [
    { name: "Create Reminders", isSelected: true },
    { name: "Process Timecard", isSelected: false },
    { name: "Create Schedule", isSelected: true },
    { name: "Report Timecard", isSelected: true },
    { name: "Delete Schedule", isSelected: true },
    { name: "Write Review", isSelected: true },
    { name: "Messaging", isSelected: true },

    // Removed these permissions my self
    // { name: "Messaging", isSelected: false },
    // { name: "Add Points", isSelected: false },
  ],
  notifications: [
    { name: "Text Message", isSelected: false },
    { name: "Email", isSelected: false },
    { name: "In App Notifications", isSelected: false },
  ],
  type: FACILITY,
};
export const EMPLOYEE_PERMISSIONS = {
  access: [
    { name: "Dashboard", isSelected: true },
    { name: "Messaging", isSelected: true },
    { name: "My Availability", isSelected: true },
    { name: "My Schedule", isSelected: true },
    { name: "Facilities", isSelected: true },
    { name: "Marketplace", isSelected: true },
    { name: "Payroll", isSelected: true },
    { name: "Timecards", isSelected: true },
    { name: "Support", isSelected: true },
  ],
  permissions: [
    { name: "Clock In Shifts", isSelected: true },
    { name: "Messaging", isSelected: true },
    { name: "Clock Out Shifts", isSelected: true },
    { name: "Download Timecard", isSelected: true },
    { name: "Cancel Shifts", isSelected: true },
    { name: "Report an Issue", isSelected: true },
    { name: "Signature", isSelected: true },
    { name: "Accepting Shifts", isSelected: true },
  ],
  notifications: [
    { name: "Text Message", isSelected: false },
    { name: "Email", isSelected: false },
    { name: "In App Notifications", isSelected: true },
  ],
  type: EMPLOYEE,
  other: [
    {
      name: "Automatic Clock-In",
      isSelected: false,
    },
    {
      name: "Automatic Clock-Out",
      isSelected: false,
    },
    {
      name: "Restrict Clock-In Before Shift",
      isSelected: true,
      value: 10,
    },
    {
      name: "Restrict Clock-In During Shift",
      isSelected: false,
      value: 10,
    },
    { name: "Point Expiry Days", isSelected: false, value: "1 month" },
    // {
    //   name: "incentives who haven't clock-in",
    //   isSelected: false,
    //   value: null,
    // },
  ],
};

export const STAFF_PERMISSIONS = {
  type: ADMIN,
  access: [
    { name: "Dashboard", isSelected: true },
    { name: "Schedule", isSelected: true },
    { name: "Who's ON", isSelected: true },
    { name: "People", isSelected: true },
    { name: "Facilities", isSelected: true },
    { name: "Messaging", isSelected: true },
    { name: "Timecards", isSelected: true },
    { name: "Support", isSelected: true },
    { name: "Settings", isSelected: true },
    { name: "Invoices", isSelected: true },
    { name: "Reports", isSelected: true },
  ],
  permissions: [
    { name: "Create Reminders", isSelected: true },
    { name: "Create Timecard", isSelected: true },
    { name: "Process Timecard", isSelected: true },
    { name: "Create Schedule", isSelected: true },
    { name: "Report Timecard", isSelected: true },
    { name: "Delete Schedule", isSelected: true },
    { name: "Write Review", isSelected: true },
    { name: "Messaging", isSelected: true },
  ],
  notifications: [
    { name: "Text Message", isSelected: false },
    { name: "Email", isSelected: false },
    { name: "In App Notifications", isSelected: true },
  ],
};

export const SUPER_ADMIN = "admin@instacarenursing.com";
