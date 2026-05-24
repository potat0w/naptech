export const images = {
  logo: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1779202191/logo1_ctw4rm.png",
  favicon:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/w_48,h_48,c_limit,f_png/v1779202191/logo1_ctw4rm.png",
  hero: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
  handsCare:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
  dancing:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
  crafts:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
  caregiver:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
  garden:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
  community:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
  companionship:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg",
  teamPliaka:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1779278141/Generated_Image_May_20_2026_-_5_54PM_acc1pp.png",
  teamJanet:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1779634084/Generated_Image_May_24_2026_-_8_12PM_dxd4al.png",
  teamRafin:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1779634094/Generated_Image_May_24_2026_-_8_35PM_nhdxwd.png",
} as const;

export const careGallery = [
  images.handsCare,
  images.dancing,
  images.crafts,
  images.caregiver,
  images.garden,
  images.community,
  images.companionship,
  images.hero,
] as const;

export function careImage(index: number): string {
  return careGallery[index % careGallery.length];
}
