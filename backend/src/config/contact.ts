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

export function naptecEmailFooterHtml() {
  return `<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:#3f2d62;">Naptec Care</p>
              <p style="margin:0 0 12px;font-size:12px;line-height:1.5;color:#6b6560;">
                ${naptecContact.addressLine1},<br />
                ${naptecContact.area}, ${naptecContact.city} ${naptecContact.postcode}, ${naptecContact.country}
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:#6b6560;">
                <a href="${naptecContact.phoneHref}" style="color:#644596;text-decoration:none;font-weight:bold;">${naptecContact.phone}</a>
              </p>
              <p style="margin:0;font-size:12px;color:#6b6560;">
                <a href="mailto:${naptecContact.email}" style="color:#644596;text-decoration:none;font-weight:bold;">${naptecContact.email}</a>
              </p>`;
}
