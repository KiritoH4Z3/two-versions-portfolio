import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Chakra_Petch,
  JetBrains_Mono,
  Manrope,
} from "next/font/google";
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

const SITE_DESCRIPTION =
  "Computer Science (AI) graduate and solutions-focused AI builder in Dubai, turning ideas into shipped systems.";

export const metadata: Metadata = {
  title: "Abdullah Mohammed Hazeq - Portfolio",
  description: SITE_DESCRIPTION,
  metadataBase: new URL(
    "https://two-versions-portfolio-kirito-h4-z3-s-projects.vercel.app"
  ),
  openGraph: {
    title: "Abdullah Mohammed Hazeq - Portfolio",
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Abdullah Mohammed Hazeq - Portfolio",
    description: SITE_DESCRIPTION,
  },
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
      <body>{children}</body>
    </html>
  );
}
