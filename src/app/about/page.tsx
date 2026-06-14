import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Compass, SearchCheck } from "lucide-react";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "About GearSignal, an editorial buying guide site for smart home, creator, travel, and everyday Amazon gear.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/about"),
    title: "About GearSignal",
    description:
      "How GearSignal researches products, builds shortlists, and keeps affiliate recommendations practical.",
  },
};

const principles = [
  {
    icon: Compass,
    title: "Start with the buyer job",
    body: "Every guide begins with the setup, room, trip, or creator workflow the reader is trying to improve.",
  },
  {
    icon: SearchCheck,
    title: "Compare tradeoffs clearly",
    body: "We separate must-have requirements from nice extras so buyers can skip products that only look good on paper.",
  },
  {
    icon: CheckCircle2,
    title: "Keep monetization disclosed",
    body: "Affiliate relationships are disclosed, and commissions should not override product fit or practical caveats.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-16 md:py-20">
        <div className="max-w-4xl space-y-5">
          <p className="text-xs uppercase text-muted">About {siteConfig.name}</p>
          <h1 className="font-serif text-4xl font-semibold text-foreground md:text-6xl">
            We turn crowded product searches into useful first shortlists.
          </h1>
          <p className="text-base leading-8 text-muted md:text-lg">
            GearSignal is an independent buying guide site for smart home,
            creator desk, travel, and everyday Amazon gear. The site is built
            for readers who know the problem they want to solve but do not want
            to sort through dozens of similar listings.
          </p>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article className="surface rounded-lg p-6" key={principle.title}>
                <Icon className="h-5 w-5 text-accent" />
                <h2 className="mt-5 text-lg font-semibold text-foreground">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {principle.body}
                </p>
              </article>
            );
          })}
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="surface rounded-lg p-8 md:p-10">
            <div className="prose">
              <h2>Editorial scope</h2>
              <p>
                GearSignal currently focuses on product categories where buyers
                compare features, setup friction, accessories, and replacement
                cost before purchasing. That includes dehumidifiers, desk
                lighting, action camera kits, small appliances, smart home
                upgrades, and adjacent creator or travel gear.
              </p>
              <h2>How we choose topics</h2>
              <p>
                We prioritize pages where a reader has a clear job: control
                humidity in a basement, build a compact filming setup, pack a
                durable travel kit, or choose a first smart home upgrade. The
                guide format follows that job instead of publishing generic
                product roundups.
              </p>
            </div>
          </div>

          <aside className="surface rounded-lg p-6">
            <p className="text-xs uppercase text-muted">Next step</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground">
              Review the current shortlists.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Start with the public review library and disclosure policy before
              judging whether the site fits a merchant or network program.
            </p>
            <Link
              className={cn(buttonVariants({ className: "mt-5 w-full" }))}
              href="/reviews"
            >
              Browse reviews
            </Link>
          </aside>
        </section>
      </Container>
    </>
  );
}
