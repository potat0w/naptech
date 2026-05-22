import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
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
  title: "Naptec Care",
  description: "Naptec caregiver portal",
  icons: {
    icon: siteLogo.src,
    apple: siteLogo.src,
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
        className={`${outfit.className} min-h-full bg-white text-neutral-900 antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
