import type { Metadata } from "next";

import { BestOfCard } from "@/components/best-of-card";
import { Container } from "@/components/container";
import { getAllBestOfs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shortlists",
  description:
    "Compact gear shortlists for Amazon shoppers comparing the first few serious options.",
  alternates: {
    canonical: absoluteUrl("/best"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/best"),
    title: "Shortlists",
    description:
      "Compact gear shortlists for Amazon shoppers comparing the first few serious options.",
  },
};

export default async function BestPage() {
  const articles = await getAllBestOfs();

  return (
    <>
      <Container className="py-16 md:py-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase text-muted">
            Shortlist pages
          </p>
          <h1 className="font-serif text-4xl font-semibold text-foreground md:text-6xl">
            Shortlists for buyers who want a confident first cut.
          </h1>
          <p className="text-base leading-8 text-muted md:text-lg">
            These pages group products around a job: stabilizing a home office,
            building a creator desk, packing a travel kit, or comparing a
            first smart home upgrade.
          </p>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <BestOfCard article={article} key={article.slug} />
          ))}
        </div>
      </Container>
    </>
  );
}
