import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/SocialIcons";
import type { TeamMemberSocial } from "@/lib/team";

const platforms = [
  { key: "facebook" as const, label: "Facebook", Icon: FacebookIcon },
  { key: "instagram" as const, label: "Instagram", Icon: InstagramIcon },
  { key: "x" as const, label: "X", Icon: XIcon },
  { key: "linkedin" as const, label: "LinkedIn", Icon: LinkedInIcon },
];

type TeamMemberSocialProps = {
  social?: TeamMemberSocial;
  align?: "start" | "end";
};

export default function TeamMemberSocial({
  social,
  align = "start",
}: TeamMemberSocialProps) {
  const links = platforms.filter((p) => social?.[p.key]);

  if (links.length === 0) return null;

  return (
    <ul
      className={`mt-8 flex flex-wrap gap-3 ${align === "end" ? "justify-end" : "justify-start"}`}
      aria-label="Social profiles"
    >
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={social![key]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-brand hover:bg-brand/5 hover:text-brand"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
