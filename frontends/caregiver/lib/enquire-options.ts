export const careHomes = [
  { value: "london", label: "Naptec – London (Thornton Heath)" },
] as const;

export const enquiryTypes = [
  { value: "email", label: "Email Us" },
  { value: "visit", label: "Book a Visit" },
  { value: "brochure", label: "Request Brochure" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];
