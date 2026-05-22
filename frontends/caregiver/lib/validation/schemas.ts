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
});

export const bookCareSchema = yup.object({
  addressLine1: yup
    .string()
    .trim()
    .required("Street address is required.")
    .max(120, "Please enter a shorter address."),
  addressLine2: yup.string().trim().max(120, "Please enter a shorter address.").optional().default(""),
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
  careNotes: yup
    .string()
    .trim()
    .max(500, "Notes must be 500 characters or fewer.")
    .optional()
    .default(""),
});

function isGoogleDriveUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const host = new URL(value).hostname.replace(/^www\./, "");
    return host === "drive.google.com" || host === "docs.google.com";
  } catch {
    return false;
  }
}

const cvDriveUrlField = yup
  .string()
  .trim()
  .required("Please provide a Google Drive link to your CV.")
  .url("Please enter a valid URL.")
  .max(500, "Please enter a shorter link.")
  .test(
    "google-drive",
    "CV must be a Google Drive share link (drive.google.com or docs.google.com).",
    (value) => isGoogleDriveUrl(value)
  );

const recruitmentFieldsBase = {
  firstName: nameField.label("First name"),
  lastName: nameField.label("Last name"),
  email: emailField,
  telephone: phoneField.label("Mobile number"),
  position: yup
    .string()
    .required("Please select a position.")
    .oneOf(["part-time", "full-time", "live-in"], "Please select a position."),
  experience: yup
    .string()
    .required("Please select your care experience.")
    .oneOf(["new", "some", "experienced"], "Please select your care experience."),
  availability: yup
    .string()
    .trim()
    .max(500, "Please enter fewer than 500 characters.")
    .optional()
    .default(""),
  message: yup
    .string()
    .trim()
    .max(2000, "Please enter fewer than 2000 characters.")
    .optional()
    .default(""),
  cvDriveUrl: cvDriveUrlField,
  rightToWork: yup
    .mixed()
    .required("Please confirm you have the right to work in the UK.")
    .test(
      "rightToWork",
      "Please confirm you have the right to work in the UK.",
      (value) => value === "on" || value === true || value === "yes"
    ),
};

export const recruitmentFieldsSchema = yup.object(recruitmentFieldsBase);

export const recruitmentApplySchema = recruitmentFieldsSchema;

export type LoginFormValues = yup.InferType<typeof loginSchema>;
export type SignupFormValues = yup.InferType<typeof signupSchema>;
export type EnquireFormValues = yup.InferType<typeof enquireSchema>;
export type BookCareFormValues = yup.InferType<typeof bookCareSchema>;
export type RecruitmentApplyFormValues = yup.InferType<typeof recruitmentApplySchema>;
