export type UserRole = "admin" | "caregiver" | "client";

export type MockUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  role: UserRole;
};
