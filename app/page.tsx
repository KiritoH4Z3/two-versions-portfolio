import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { SITE } from "@/data/portfolio";

export const metadata: Metadata = {
  title: SITE.titles.landing,
  description: SITE.descriptions.landing,
  alternates: { canonical: SITE.routes.landing },
};

export default function Page() {
  return <Portfolio startWorld="landing" petalDensity={25} reduceMotion={false} />;
}
