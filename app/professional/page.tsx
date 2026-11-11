import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { SITE } from "@/data/portfolio";

// The professional world at its own address: the link to send a client or a
// recruiter, and the page a crawler can read without choosing a door.
export const metadata: Metadata = {
  title: SITE.titles.professional,
  description: SITE.descriptions.professional,
  alternates: { canonical: SITE.routes.professional },
  openGraph: {
    title: SITE.titles.professional,
    description: SITE.descriptions.professional,
    url: SITE.routes.professional,
    type: "profile",
  },
};

export default function Page() {
  return (
    <>
      {/* The faint circuit photo behind the hero is this route's largest
          paint and lives in CSS, where the preload scanner cannot see it. */}
      <link
        rel="preload"
        as="image"
        href="/assets/grid-circuit.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <Portfolio startWorld="professional" petalDensity={25} reduceMotion={false} />
    </>
  );
}
