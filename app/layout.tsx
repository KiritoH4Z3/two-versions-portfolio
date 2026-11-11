import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Chakra_Petch,
  JetBrains_Mono,
  Manrope,
} from "next/font/google";
import { CONTACT, SITE, ZEQLAR } from "@/data/portfolio";
import "./globals.css";

// Garden display & quotes — non-variable, needs explicit weights + italics.
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

// Cyber display, eyebrows, labels, UI — non-variable.
const chakra = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
});

// Code lines, stats labels, mono accents — variable font.
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

// Body copy — variable font.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    url: "/",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary",
    title: SITE.title,
    description: SITE.description,
  },
};

/**
 * Who this is, for search engines and assistants: a person, the company he
 * founded, and the profiles that are his. Composed from the same content
 * module the page renders, so the two cannot disagree.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": SITE.url + "/#person",
      name: SITE.name,
      url: SITE.url + SITE.routes.professional,
      jobTitle: "Founder",
      description: SITE.description,
      address: { "@type": "PostalAddress", addressCountry: "AE" },
      worksFor: { "@id": ZEQLAR.url + "/#organization" },
      sameAs: [CONTACT.linkedin, CONTACT.github],
    },
    {
      "@type": "Organization",
      "@id": ZEQLAR.url + "/#organization",
      name: ZEQLAR.wordmark,
      legalName: ZEQLAR.legalName,
      url: ZEQLAR.url,
      founder: { "@id": SITE.url + "/#person" },
    },
    {
      "@type": "WebSite",
      "@id": SITE.url + "/#website",
      url: SITE.url,
      name: SITE.title,
      author: { "@id": SITE.url + "/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${chakra.variable} ${jbmono.variable} ${manrope.variable}`}
    >
      <body>
        {children}
        {/* Static JSON built from our own constants above, no user input:
            the one place raw HTML is set, and "<" is escaped regardless. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
