import type { Metadata } from "next";

import { Container } from "@/components/container";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How GearSignal handles affiliate commissions, editorial independence, and product links.",
  alternates: {
    canonical: absoluteUrl("/disclosure"),
  },
  openGraph: {
    type: "article",
    url: absoluteUrl("/disclosure"),
    title: "Affiliate Disclosure",
    description:
      "How GearSignal handles affiliate commissions, editorial independence, and product links.",
  },
};

export default function DisclosurePage() {
  return (
    <Container className="py-16 md:py-20">
      <section className="surface max-w-4xl rounded-lg p-8 md:p-12">
        <p className="text-xs uppercase text-muted">
          Trust and disclosure
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-5xl">
          Affiliate links should be obvious before a reader clicks.
        </h1>
        <div className="prose mt-8">
          <p>
            Some outbound links on GearSignal may become monetized through
            Amazon, PartnerBoost, or another approved affiliate program. We
            disclose that relationship near the top of review and shortlist
            pages.
          </p>
          <p>
            The stronger rule is editorial independence: verdicts should be
            shaped by the buyer job, the product fit, and the tradeoffs. A
            higher commission should not flatten the difference between two
            products.
          </p>
          <h2>Practical house rules</h2>
          <ul>
            <li>Disclose affiliate relationships on review and shortlist pages.</li>
            <li>Keep pros and tradeoffs visible before the CTA cluster.</li>
            <li>Use internal links to help readers compare adjacent options.</li>
            <li>Do not invent availability, discounts, ratings, or customer proof.</li>
          </ul>
        </div>
      </section>
    </Container>
  );
}
