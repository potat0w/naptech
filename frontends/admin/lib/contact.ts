export const naptecContact = {
  addressLine1: "111 Winterbourne Road",
  area: "Thornton Heath",
  city: "London",
  postcode: "CR7 7QY",
  country: "United Kingdom",
  phone: "0203 488 4074",
  phoneHref: "tel:+442034884074",
  email: "info@naptechealthcareservices.com",
} as const;

export const naptecFullAddress = `${naptecContact.addressLine1}, ${naptecContact.area}, ${naptecContact.city} ${naptecContact.postcode}`;
