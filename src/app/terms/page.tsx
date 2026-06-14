import type { Metadata } from "next";

import { Container } from "@/components/container";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "GearSignal terms covering editorial information, outbound links, affiliate relationships, and acceptable use.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    type: "article",
    url: absoluteUrl("/terms"),
    title: "Terms",
    description:
      "GearSignal terms covering editorial information, outbound links, affiliate relationships, and acceptable use.",
  },
};

export default function TermsPage() {
  return (
    <Container className="py-16 md:py-20">
      <article className="surface max-w-4xl rounded-lg p-8 md:p-12">
        <p className="text-xs uppercase text-muted">Terms</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-5xl">
          Terms of Use
        </h1>
        <div className="prose mt-8">
          <p>
            GearSignal publishes product research, comparison notes, and buying
            guides for general informational use. By using the site, you agree
            to read product details, warranty terms, safety instructions, and
            retailer policies before purchasing.
          </p>
          <h2>Editorial information</h2>
          <p>
            We work to keep product guidance practical and current, but prices,
            availability, specifications, and merchant offers can change. The
            final purchase decision remains with the reader.
          </p>
          <h2>Affiliate relationships</h2>
          <p>
            GearSignal may earn commissions from qualifying purchases through
            Amazon, PartnerBoost, or other approved affiliate programs. These
            relationships are disclosed on the site and should not remove the
            need for independent product judgment.
          </p>
          <h2>Outbound sites</h2>
          <p>
            Links may send readers to third-party retailers, merchant pages,
            tools, or product listings. Those sites are responsible for their
            own content, pricing, checkout, shipping, returns, and privacy
            practices.
          </p>
          <h2>Acceptable use</h2>
          <p>
            Do not scrape, copy, or republish substantial portions of the site
            as a competing service without permission. Short quotes with clear
            attribution are acceptable.
          </p>
        </div>
      </article>
    </Container>
  );
}
