export const ROLE_LIST = {
  admin: 1,
  customer: "Customer",
};

export const SERVICE_TYPE = {
  signup: "signup",
  signin: "signin",
  forget: "forget-password",
};

export const ACTION_TYPE = {
  update: "update",
  create: "create",
};

export const APPLICATION_STATUS = {
  APPROVED: { label: "Approved", value: "APPROVED", color: "success.main" },
  APPLICATION_DRAFT: {
    label: "Draft",
    value: "APPLICATION_DRAFT",
    color: "#A5ADB3",
  },
  APPLICATION_RECORDED: {
    label: "Application Recorded",
    value: "APPLICATION_RECORDED",
    color: "accent1.main",
  },
  PAYMENT_PENDING: {
    label: "Payment Pending",
    value: "PAYMENT_PENDING",
    color: "warning.main",
  },
  PAYMENT_COMPLETED: {
    label: "Payment Completed",
    value: "PAYMENT_COMPLETED",
    color: "accent1.main",
  },
  APPLICATION_SUBMITTED: {
    label: "Application Submitted",
    value: "APPLICATION_SUBMITTED",
    color: "warning.main",
  },
  PENDING_FOR_APPROVAL: {
    label: "Pending for approval",
    value: "PENDING_FOR_APPROVAL",
    color: "warning.main",
  },
  REJECTED: { label: "Rejected", value: "REJECTED", color: "error.main" },
  CANCELED: { label: "Canceled", value: "CANCELED", color: "error.main" },
};
export const PAYMENT_STATUS = {
  PAYMENT_PENDING: {
    label: "Payment Pending",
    value: "PAYMENT_PENDING",
    color: "warning.main",
  },
  PAYMENT_COMPLETED: {
    label: "Payment Completed",
    value: "PAYMENT_COMPLETED",
    color: "accent1.main",
  },
  PAYMENT_UNPAID: {
    label: "Unpaid",
    value: "PAYMENT_UNPAID",
    color: "error.main",
  },
  PAYMENT_CANCEL: {
    label: "Cancel",
    value: "PAYMENT_CANCEL",
    color: "error.main",
  },
  PAYMENT_COUNTER_SELECT: {
    label: "Counter Select,Unpaid",
    value: "PAYMENT_COUNTER_SELECT",
    color: "error.main",
  },
  PAYMENT_ERROR_DATA_NOT_PROCESS: {
    label: "Error data not Process",
    value: "PAYMENT_ERROR_DATA_NOT_PROCESS",
    color: "error.main",
  },
};
export const ACTIVE_STATUS = {
  true: { label: "Active", color: "green" },
  false: { label: "Inactive", color: "red" },
};
