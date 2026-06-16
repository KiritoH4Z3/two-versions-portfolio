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

export const metadata: Metadata = {
  title: "Abdullah Hazeq — Two Versions",
  description:
    "Abdullah Hazeq — AI builder, problem solver and people person. One person, two doors: the professional (the grid) and the human (the garden).",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Abdullah Hazeq — Two Versions",
    description:
      "One person, two doors. The professional (the grid) and the human (the garden).",
    type: "website",
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
