import * as yup from "yup";

const nameField = yup
  .string()
  .trim()
  .required("This field is required.")
  .min(2, "Please enter at least 2 characters.")
  .max(80, "Please enter fewer than 80 characters.");

const emailField = yup
  .string()
  .trim()
  .required("Email is required.")
  .email("Please enter a valid email address.");

const phoneField = yup
  .string()
  .trim()
  .required("Phone number is required.")
  .min(10, "Please enter a valid phone number.")
  .max(20, "Please enter a valid phone number.");

const passwordField = yup
  .string()
  .required("Password is required.")
  .min(8, "Password must be at least 8 characters.");

export const loginSchema = yup.object({
  email: emailField,
  password: yup.string().required("Password is required."),
});

export const signupSchema = yup.object({
  firstName: nameField.label("First name"),
  lastName: nameField.label("Last name"),
  email: emailField,
  phone: phoneField,
  password: passwordField,
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

export const enquireSchema = yup.object({
  fullName: nameField.label("Full name"),
  phone: phoneField,
  email: emailField,
  message: yup
    .string()
    .trim()
    .max(2000, "Message must be 2000 characters or fewer.")
    .optional()
    .default(""),
  privacyConsent: yup
    .mixed()
    .required("Please confirm you have read the privacy notice.")
    .test(
      "privacyConsent",
      "Please confirm you have read the privacy notice.",
      (value) => value === "yes" || value === true
    ),
  marketingConsent: yup.mixed().optional(),
  enquiryType: yup.string().oneOf(["email", "visit", "brochure"]).optional(),
  careHomeSlug: yup.string().max(50).optional(),
});

export const bookCareSchema = yup.object({
  addressLine1: yup
    .string()
    .trim()
    .required("Street address is required.")
    .max(120, "Please enter a shorter address."),
  addressLine2: yup.string().trim().max(120).optional().default(""),
  city: yup
    .string()
    .trim()
    .required("Town or city is required.")
    .max(80, "Please enter a valid town or city."),
  postcode: yup
    .string()
    .trim()
    .required("Postcode is required.")
    .max(12, "Please enter a valid postcode."),
  careFor: yup
    .string()
    .required("Please select who the care is for.")
    .oneOf(["loved-one", "me"], "Please select who the care is for."),
  preferredDate: yup.string().trim().optional().default(""),
  careNotes: yup.string().trim().max(500).optional().default(""),
});

export const updateProfileSchema = yup.object({
  firstName: nameField.optional(),
  lastName: nameField.optional(),
  email: emailField.optional(),
  phone: phoneField.optional(),
  addressLine1: yup.string().trim().max(120).optional(),
  addressLine2: yup.string().trim().max(120).optional(),
  city: yup.string().trim().max(80).optional(),
  postcode: yup.string().trim().max(12, "Please enter a valid postcode.").optional(),
});

export const forgotPasswordSchema = yup.object({
  email: emailField,
});

export const resetPasswordSchema = yup.object({
  token: yup.string().required("Token is required."),
  password: passwordField,
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

export const requestPasswordOtpSchema = yup.object({
  email: emailField,
});

export const resetPasswordOtpSchema = yup.object({
  email: emailField,
  code: yup
    .string()
    .trim()
    .required("Enter the code from your email.")
    .matches(/^\d{6}$/, "Enter the 6-digit code from your email."),
  password: passwordField,
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

export const createAssignmentSchema = yup.object({
  caregiverUserId: yup.string().uuid("Invalid caregiver id.").required(),
  clientName: yup.string().trim().required().max(160),
  serviceAddress: yup.string().trim().required().max(500),
  shiftDate: yup.string().required(),
  shiftStart: yup.string().required(),
  shiftEnd: yup.string().required(),
  priority: yup.string().oneOf(["low", "medium", "high"]).default("medium"),
  tasks: yup.array().of(yup.string().trim().max(500)).default([]),
  careRequestId: yup.string().uuid().optional(),
  clientUserId: yup.string().uuid().optional(),
});

export const reassignAssignmentSchema = yup.object({
  caregiverUserId: yup.string().uuid("Invalid caregiver id.").required(),
});

export const updateAssignmentStatusSchema = yup.object({
  status: yup
    .string()
    .oneOf(["scheduled", "in_progress", "completed", "pending_report", "cancelled"])
    .required(),
});

export const submitReportSchema = yup.object({
  assignmentId: yup.string().uuid().required(),
  rawNotes: yup.string().trim().required("Visit notes are required.").max(10000),
});

export const recruitmentFieldsSchema = yup.object({
  firstName: nameField.label("First name"),
  lastName: nameField.label("Last name"),
  email: emailField,
  telephone: phoneField.label("Mobile number"),
  position: yup
    .string()
    .required("Please select a position.")
    .oneOf(["part-time", "full-time", "live-in"]),
  experience: yup
    .string()
    .required("Please select your care experience.")
    .oneOf(["new", "some", "experienced"]),
  availability: yup.string().trim().max(500).optional().default(""),
  message: yup.string().trim().max(2000).optional().default(""),
  cvDriveUrl: yup
    .string()
    .trim()
    .required("Please provide a Google Drive link to your CV.")
    .url("Please enter a valid URL.")
    .max(500, "Please enter a shorter link.")
    .test(
      "google-drive",
      "CV must be a Google Drive share link (drive.google.com or docs.google.com).",
      (value) => {
        if (!value) return false;
        try {
          const host = new URL(value).hostname.replace(/^www\./, "");
          return host === "drive.google.com" || host === "docs.google.com";
        } catch {
          return false;
        }
      }
    ),
  rightToWork: yup
    .mixed()
    .required("Please confirm you have the right to work in the UK.")
    .test(
      "rightToWork",
      "Please confirm you have the right to work in the UK.",
      (value) => value === "on" || value === true || value === "yes"
    ),
});

export const createCaregiverSchema = yup.object({
  firstName: nameField,
  lastName: nameField,
  email: emailField,
  phone: phoneField,
  password: passwordField,
});
