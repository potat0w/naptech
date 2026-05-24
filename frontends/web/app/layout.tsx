import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import EnquireProvider from "@/components/EnquireProvider";
import AuthorCreditComment from "@/components/AuthorCreditComment";
import SiteChrome from "@/components/SiteChrome";
import { webAppBase } from "@/lib/app-urls";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo/json-ld";
import { SEO } from "@/lib/seo/config";
import { siteLogo } from "@/lib/site-logo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(webAppBase()),
  title: {
    default: SEO.defaultTitle,
    template: "%s",
  },
  description: SEO.defaultDescription,
  openGraph: {
    type: "website",
    locale: SEO.locale,
    siteName: SEO.siteName,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
  },
  icons: {
    icon: siteLogo.favicon,
    apple: siteLogo.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`${outfit.className} flex min-h-full flex-col bg-white text-neutral-900 antialiased`}
        suppressHydrationWarning
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <AuthProvider>
          <EnquireProvider>
            <SiteChrome>{children}</SiteChrome>
          </EnquireProvider>
        </AuthProvider>
        <AuthorCreditComment />
      </body>
    </html>
  );
}
