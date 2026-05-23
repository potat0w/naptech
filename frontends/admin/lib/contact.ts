export const naptecContact = {
  companyName: "NapTech Healthcare Services Ltd",
  addressLine1: "111 Winterbourne Road",
  area: "Thornton Heath",
  city: "London",
  postcode: "CR7 7QY",
  country: "United Kingdom",
  phone: "+44 203 488 4074",
  phoneHref: "tel:+442034884074",
  email: "naptechealthcareservicesltd@gmail.com",
} as const;

export const naptecFullAddress = `${naptecContact.addressLine1}, ${naptecContact.area}, ${naptecContact.city} ${naptecContact.postcode}`;

export const naptecLocationLines = [
  `${naptecContact.addressLine1}, ${naptecContact.area}`,
  `${naptecContact.city} ${naptecContact.postcode}, ${naptecContact.country}`,
] as const;
