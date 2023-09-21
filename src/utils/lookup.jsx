const USER_ROLE = [
  {
    lookupId: 1,
    text: "Super Admin",
    value: "SuperAdmin",
    type: "Role",
    path: "superadmin",
  },
  {
    lookupId: 2,
    text: "Patient",
    value: "Patient",
    order: 2,
    type: "Role",
    path: "patient",
  },
  {
    lookupId: 3,
    type: "Role",
    text: "Physician",
    value: "Physician",
    path: "physician",
  },
  {
    lookupId: 4,
    type: "Role",
    text: "Clinic Admin",
    value: "ClinicAdmin",
    path: "clinicadmin",
  },
  {
    lookupId: 5,
    type: "Role",
    text: "Pharmacy",
    value: "Pharmacy",
    path: "pharmacyadmin",
  },
  {
    lookupId: 6,
    type: "Role",
    text: "Lab",
    value: "Lab",
    path: "labadmin",
  },
];

const LOOKUP = {
  USER_ROLE,
};

export default LOOKUP;

export const LOOKUP_TYPES = {
  ROLE: "role",
  RELATION: "relationShipType",
  GENDER: "gender",
  DIAGNOSED_CONCERN: "diagnoseConcernType",
  SUBSTANCE: "substanceType",
  VITAL: "vitalType",
  SCHEDULE: "scheduleType",
  MEDICINE_REMINDER: "medicineReminderStatusType",
  EDUCATION_TYPE: "educationType",
  DOCTOR_SPECIALITIES: "doctorSpecialityType",
  STATUS_TYPE: "statusType",
  ORDER_STATUS_TYPE: "orderStatusType",
};

export const APPOINTMENT_STATUS_LOOKUP = {
  UPCOMING: 601,
  BOOKED: 602,
  CANCELED: 603,
  COMPLETED: 604,
  MISSED: 605,
};

export const ORDER_STATUS_LOOKUP = {
  PENDING: 1301,
  ONGOING: 1302,
  COMPLETE: 1303,
};
