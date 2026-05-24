import { images } from "@/lib/images";

export type TeamMemberSocial = {
  facebook?: string;
  instagram?: string;
  x?: string;
  linkedin?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  social?: TeamMemberSocial;
};

export const naptecSocialLinks = {
  facebook: "https://www.facebook.com/share/18jDnPvHeS/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com",
  x: "https://x.com",
  linkedin: "https://www.linkedin.com",
} as const;

const social = naptecSocialLinks;

export const teamMembers: TeamMember[] = [
  {
    id: "pliaka",
    name: "Eintzel Pliaka",
    role: "Director",
    bio: "Eintzel is the Director, bringing over many years of senior leadership experience in adult social care—specifically in domiciliary care operations and budget management.",
    image: images.teamPliaka,
    imageAlt: "Eintzel Pliaka, Director at Naptec",
    social,
  },
  {
    id: "janet",
    name: "Janet Olutu-Adegbuyi",
    role: "Nominated Individual",
    bio: "Janet serves as the Nominated Individual, acting on behalf of the provider to supervise the management of the regulated activity. She brings more than 15 years of sector experience. Her primary focus is ensuring strict regulatory compliance, overseeing quality assurance, and holding the Proposed Register Manager to account.",
    image: images.teamJanet,
    imageAlt: "Janet Olutu-Adegbuyi, Nominated Individual at Naptec",
    social: {
      ...social,
      linkedin: "https://www.linkedin.com/in/janet-olutu-adegbuyi-4405a732b",
    },
  },
  {
    id: "rafin",
    name: "Alam Rafin",
    role: "Proposed Register Manager",
    bio: "Alam is the Proposed Register Manager responsible for day-to-day operations, safer recruitment, safeguarding, and the delivery of person-centred care. Driven by a lifelong dedication to community service and grassroots charity work, Alam ensures that care is delivered with dignity, compassion, and the highest ethical standards.",
    image: images.teamRafin,
    imageAlt: "Alam Rafin, Proposed Register Manager at Naptec",
    social: {
      ...social,
      linkedin: "https://www.linkedin.com/in/iftaker-alam-rafin-a558b9155",
    },
  },
];
