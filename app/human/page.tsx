import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { SITE } from "@/data/portfolio";

export const metadata: Metadata = {
  title: SITE.titles.human,
  description: SITE.descriptions.human,
  alternates: { canonical: SITE.routes.human },
  openGraph: {
    title: SITE.titles.human,
    description: SITE.descriptions.human,
    url: SITE.routes.human,
    type: "profile",
  },
};

export default function Page() {
  return <Portfolio startWorld="human" petalDensity={25} reduceMotion={false} />;
}
