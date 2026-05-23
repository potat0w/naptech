import SiteLogo from "@/components/SiteLogo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";
import { containerClass } from "@/lib/layout";
import { naptecContact, naptecLocationLines } from "@/lib/contact";
import { naptecSocialLinks } from "@/lib/team";
import Link from "next/link";

const socialLinks = [
  { label: "Facebook", href: naptecSocialLinks.facebook, icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedInIcon },
  { label: "YouTube", href: "https://www.youtube.com", icon: YouTubeIcon },
] as const;

const navColumns = [
  {
    title: "What We Do",
    links: [
      { label: "Domiciliary Care", href: "/what-we-do/domiciliary-care" },
      { label: "Companionship", href: "/what-we-do/companionship" },
      { label: "Home Help & Housekeeping", href: "/what-we-do/home-help-and-housekeeping" },
      { label: "Personal Care", href: "/what-we-do/personal-care" },
    ],
  },
  {
    title: "How It Works",
    links: [
      { label: "Get in touch", href: "/how-it-works#find-your-team" },
      { label: "Initial chat", href: "/how-it-works#initial-chat" },
      { label: "Home visit", href: "/how-it-works#home-visit" },
      { label: "Meet your Care Professionals", href: "/how-it-works#meet-care-professionals" },
      { label: "Get to know each other", href: "/how-it-works#get-to-know-each-other" },
    ],
  },
  {
    title: "Enquire now",
    links: [
      { label: "Care Enquiry", href: "/enquire" },
      { label: "Contact Us", href: "/enquire" },
    ],
  },
  {
    title: "Meet team",
    links: [{ label: "Meet our team", href: "/why-us/our-team" }],
  },
  {
    title: "Advice & Support",
    links: [
      { label: "Advice & Support", href: "/advice-and-care" },
      { label: "News & Events", href: "/advice-and-care/news-events" },
      { label: "Cost Of Care", href: "/advice-and-care/cost-of-care" },
      { label: "FAQs", href: "/advice-and-care/faqs" },
      { label: "How To Age Well", href: "/advice-and-care/how-to-age-well" },
      { label: "Articles", href: "/advice-and-care/articles" },
    ],
  },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm leading-snug text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-brand-deeper text-white">
      <div className={`${containerClass} py-12 lg:py-16`}>
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
          <div className="w-full shrink-0 lg:w-[min(100%,280px)] xl:w-[300px]">
            <SiteLogo
              className="h-11 w-auto sm:h-12"
              width={180}
              height={56}
              inverted
            />

            <p className="mt-5 text-sm leading-relaxed text-white/70">
              {naptecLocationLines[0]}
              <br />
              {naptecLocationLines[1]}
            </p>

            <div className="mt-6 space-y-3">
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  Email
                </p>
                <a
                  href={`mailto:${naptecContact.email}`}
                  className="mt-1 block text-sm leading-relaxed text-white underline underline-offset-4 transition-colors hover:text-white/90"
                >
                  {naptecContact.email}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  Phone
                </p>
                <a
                  href={naptecContact.phoneHref}
                  className="mt-1 block text-sm leading-relaxed text-white underline underline-offset-4 transition-colors hover:text-white/90"
                >
                  {naptecContact.phone}
                </a>
              </div>
            </div>

            <Link
              href="/recruitment"
              className="mt-6 block text-sm font-semibold text-white transition-colors hover:text-white/85"
            >
              Apply to be a Care Professional
            </Link>

            <div className="mt-8 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5 xl:gap-x-8">
            {navColumns.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
