export const careHomes = [
  { value: "warrington", label: "Naptec – Warrington" },
] as const;

export const enquiryTypes = [
  { value: "email", label: "Email Us" },
  { value: "visit", label: "Book a Visit" },
  { value: "brochure", label: "Request Brochure" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];
