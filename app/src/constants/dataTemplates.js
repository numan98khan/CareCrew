import { EMPLOYEE, ADMIN, FACILITY } from "./userTypes";

export const people = {
  // id: null,
  // firstName: "null",
  // lastName: "null",
  // email: "null@null.com",
  // phoneNumber: "1234567890",
  // documents: null,
  // country: "Pakistan",
  // city: "null",
  // state: "null",
  // zip: "44400",
  // role: "CNA",

  // timezone: "America/New_York",
  // language: "English",

  // isEmailNotifications: true,
  // isTextNotification: true,
  // effectiveStartDate: null,
  // driverLicenseNumber: null,
  // driverLicenseState: null,
  // SSN: null,
  // uniformSize: null,
  // isCompleteDrugScreening: false,
  // emergencyContactName: null,
  // emergencyContactNumber: null,
  // emergencyContactRelationship: null,
  // milesToWork: null,
  // licenseCode: null,
  // profilePicture: null,
  // role: null,

  payrollCycle: "Weekly",
  status: "Available",
  points: 0,
  rating: 5,
  type: EMPLOYEE,
  empCheckList: [
    {
      name: "IL W-4 (Withholding / Exemptions)",
      isBool: false,
    },
    {
      name: "Employment Verification",
      isBool: false,
    },
    {
      name: "Background Check Authentication Form",
      isBool: false,
    },
    {
      name: "Direct Deposit Form",
      isBool: false,
    },
    {
      name: "Health Insurance Acknowledgement Form",
      isBool: false,
    },
    {
      name: "8850",
      isBool: false,
    },
    {
      name: "CPR Certification",
      isBool: false,
    },
    {
      name: "Employee Handbook",
      isBool: false,
    },
  ],

  permissions: null,
  immunization: {
    isVerifyTB: false,
    startTBDate: null,
    lastTBDate: null,
    covidDate: null,
    infVaccineConsent: false,
    religiousExemption: false,
    medicalExemption: false,
  },
};

export const facility = {
  imgSrc: null,
  facilityName: null, //"Abeeha' Derma", //null,
  aboutFacility: null,

  streetAddress: null,
  country: null,
  city: null,
  state: null,
  zip: null,
  email: null,
  // streetAddress: "Street # 63",
  // country: "United States",
  // city: "Orange Town",
  // state: "IL",
  // zip: "44000",
  // email: null,
  // lat: 1.222222,
  // lng: 1.222222,

  floors: [
    {
      floorNumber: null,
    },
  ],
  contacts: [
    {
      name: undefined,
      phone: undefined,
      email: undefined,
      position: "Facility Admin",
    },
    // {
    //   name: undefined,
    //   firstName: "Salar",
    //   lastName: "Hussain",
    //   phone: "+12345678900",
    //   email: "salar241297@gmail.com",
    //   position: "General Manager",
    // },
  ],
};

export const staff = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  documents: null,
  country: null,
  city: null,
  state: null,
  zip: null,
  timezone: null,
  language: "English",
  isEmailNotifications: true,
  isTextNotification: true,
  effectiveStartDate: null,
  driverLicenseNumber: null,
  driverLicenseState: null,
  SSN: null,
  uniformSize: null,
  isCompleteDrugScreening: false,
  emergencyContactName: null,
  emergencyContactNumber: null,
  emergencyContactRelationship: null,
  milesToWork: null,
  licenseCode: null,
  profilePicture: null,
  role: null,
  status: "Available",
  points: null,
  rating: null,
  type: ADMIN,
  empCheckList: [
    {
      name: "IL W-4 (Withholding / Exemptions)",
      isBool: false,
    },
    {
      name: "Employment Verification",
      isBool: false,
    },
    {
      name: "Background Check Authentication Form",
      isBool: false,
    },
    {
      name: "Direct Deposit Form",
      isBool: false,
    },
    {
      name: "Health Insurance Acknowledgement Form",
      isBool: false,
    },
    {
      name: "8850",
      isBool: false,
    },
    {
      name: "CPR Certification",
      isBool: false,
    },
    {
      name: "Employee Handbook",
      isBool: false,
    },
  ],
  permissions: null,
};

export const shift = {
  numOfPositions: null,
  facilityID: null,
  shiftStart: null,
  shiftEnd: null,
  date: null,
  roleRequired: null,
  rate: null,
  floorNumber: null,
  supervisor: null,
  incentives: {
    incentiveBy: null,
    incentiveType: null,
    incentiveAmount: null,
    notes: null,
  },
  cancellationGuarantee: false,
  isAssigned: false,
  isIncentive: false,
  isGuarantee: false,
  isLate: false,
  isCallOff: false,
  isSelected: false,
  recurringSchedule: null,
};

// Enumerated types for better clarity and validation (assuming some values here):
export const InvoiceDeliveryTypes = {
  EMAIL: "Email",
  MAIL: "Mail",
  BOTH: "Both",
  // ... any other types as needed
};

export const InvoiceFrequencyTypes = {
  MONTHLY: "Monthly",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  // ... any other types as needed
};
export const billing = {
  allowOvertime: false,
  maxBillingMonthly: 0,
  hourlyRate: "0",
  hourlyRateCNA: "0",
  hourlyRateRN: "0",
  hourlyRateLPN: "0",
  weekendHourlyRate: 0,
  holidayHourlyRate: 0,

  maxMonthlyIncentive: 0,
  maxHourlyIncentive: 0,
  maxFixedIncentive: 0,
  // invoiceDelivery: "EMAIL", // Assuming the enum value is "EMAIL"
  // invoiceFrequency: "MONTHLY", // Assuming the enum value is "MONTHLY"
  topUpPercentage: "30",
};
