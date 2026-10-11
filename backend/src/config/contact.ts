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

export function naptecEmailFooterHtml() {
  return `<p style="margin:0 0 12px;font-size:12px;line-height:1.6;color:#6b6560;">
                ${naptecLocationLines.join("<br />")}
              </p>
              <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#6b6560;">
                Email: <a href="mailto:${naptecContact.email}" style="color:#644596;text-decoration:none;font-weight:bold;">${naptecContact.email}</a>
              </p>
              <p style="margin:0;font-size:12px;line-height:1.6;color:#6b6560;">
                Phone: <a href="${naptecContact.phoneHref}" style="color:#644596;text-decoration:none;font-weight:bold;">${naptecContact.phone}</a>
              </p>`;
}
