export const naptecContact = {
  companyName: "NapTech Healthcare Services Ltd",
  addressLine1: "Suite 123",
  addressLine2: "Challenge House",
  street: "616 Mitcham Road",
  city: "Croydon",
  postcode: "CR0 3AA",
  country: "United Kingdom",
  phone: "+44 203 488 4074",
  phoneHref: "tel:+442034884074",
  email: "naptechealthcareservicesltd@gmail.com",
} as const;

export const naptecFullAddress = `${naptecContact.addressLine1}, ${naptecContact.addressLine2}, ${naptecContact.street}, ${naptecContact.city} ${naptecContact.postcode}`;

export const naptecLocationLines = [
  naptecContact.addressLine1,
  naptecContact.addressLine2,
  naptecContact.street,
  naptecContact.city,
  naptecContact.postcode,
] as const;
