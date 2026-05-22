import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/SocialIcons";
import { naptecSocialLinks } from "@/lib/team";
import { containerClass, headingFont, sectionPy } from "@/lib/layout";

const links = [
  { label: "Facebook", href: naptecSocialLinks.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: naptecSocialLinks.instagram, Icon: InstagramIcon },
  { label: "X", href: naptecSocialLinks.x, Icon: XIcon },
  { label: "LinkedIn", href: naptecSocialLinks.linkedin, Icon: LinkedInIcon },
] as const;

export default function NaptecSocialBar() {
  return (
    <section
      className={`border-t border-neutral-100 bg-surface-alt ${sectionPy}`}
      aria-labelledby="naptec-social-heading"
    >
      <div className={`${containerClass} text-center`}>
        <h2
          id="naptec-social-heading"
          className="text-2xl font-normal text-neutral-900 sm:text-3xl"
          style={headingFont}
        >
          Follow Naptec
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Stay connected for news, care tips, and updates from our team.
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm ring-1 ring-neutral-200/80 transition-colors hover:bg-brand hover:text-white hover:ring-brand"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
