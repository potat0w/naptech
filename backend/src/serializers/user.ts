import type { UserWithAddress } from "../utils/mappers.js";

export function serializeUserMe(user: UserWithAddress) {
  return {
    id: user.id,
    role: user.role === "client" ? "client" : user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? "",
    emailVerified: Boolean(user.emailVerifiedAt),
    address: user.address
      ? {
          addressLine1: user.address.addressLine1,
          addressLine2: user.address.addressLine2 ?? "",
          city: user.address.city,
          postcode: user.address.postcode,
        }
      : {
          addressLine1: "",
          addressLine2: "",
          city: "",
          postcode: "",
        },
  };
}
