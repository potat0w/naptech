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
import type { ReactNode } from "react";

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
    title: "Enquire Now",
    links: [
      { label: "Care Enquiry", href: "/enquire" },
      { label: "Contact Us", href: "/enquire" },
    ],
  },
  {
    title: "Meet the Team",
    links: [{ label: "Meet our team", href: "/why-us/our-team" }],
  },
  {
    title: "Advice & Support",
    links: [
      { label: "Advice & Support", href: "/advice-and-care" },
      { label: "News & Events", href: "/advice-and-care/news-events" },
      { label: "Cost of Care", href: "/advice-and-care/cost-of-care" },
      { label: "FAQs", href: "/advice-and-care/faqs" },
      { label: "How to Age Well", href: "/advice-and-care/how-to-age-well" },
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/60">
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-deeper text-white">
      <div className={`${containerClass} py-14 lg:py-16`}>
        <div className="flex w-full flex-col gap-14 lg:flex-row lg:items-start lg:gap-0">
          <div className="w-full shrink-0 lg:w-72 lg:pr-12 xl:w-80 xl:pr-16">
            <SiteLogo className="h-10 w-auto sm:h-12" width={180} height={56} inverted />

            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Compassionate, professional home care delivered across the United Kingdom.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <SectionLabel>Our Address</SectionLabel>
              <address className="not-italic text-sm leading-relaxed text-white/70">
                {naptecLocationLines[0]}
                <br />
                {naptecLocationLines[1]}
              </address>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <SectionLabel>Contact</SectionLabel>
              <div className="space-y-3 text-sm">
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
            </div>

            <Link
              href="/recruitment"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/20"
            >
              Apply as a Care Professional
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden w-px shrink-0 self-stretch bg-white/10 lg:block" />

          <div className="min-w-0 flex-1 lg:pl-12 xl:pl-16">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
              {navColumns.map((col) => (
                <FooterColumn key={col.title} title={col.title} links={col.links} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div
          className={`${containerClass} flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between`}
        >
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} NapTech Healthcare Services Ltd. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Registered in England &amp; Wales
            <span className="mx-2 text-white/20">·</span>
            CQC Regulated
          </p>
        </div>
      </div>
    </footer>
  );
}
