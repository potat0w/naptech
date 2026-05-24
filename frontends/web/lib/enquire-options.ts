export const careHomes = [
  { value: "croydon", label: "Naptec – Croydon" },
] as const;

export const enquiryTypes = [
  { value: "email", label: "Email Us" },
  { value: "visit", label: "Book a Visit" },
  { value: "brochure", label: "Request Brochure" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];
