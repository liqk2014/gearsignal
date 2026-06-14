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
      <Container className="py-10 md:py-14">
        <div className="grid gap-6 rounded-lg border border-line bg-paper-strong p-6 md:grid-cols-[minmax(0,1fr)_20rem] md:p-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase text-accent">
              Shortlist pages
            </p>
            <h1 className="font-serif text-4xl font-semibold text-foreground md:text-6xl">
              Listicles that make the first buying cut obvious.
            </h1>
            <p className="text-base leading-8 text-muted md:text-lg">
              These pages group products around a job: stabilizing a home
              office, building a creator desk, packing a travel kit, or choosing
              a first smart home upgrade.
            </p>
          </div>

          <div className="rounded-lg bg-blue-soft p-5">
            <p className="text-xs font-bold uppercase text-blue">
              Why this works
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground">
              Affiliate shortlists convert best when each pick has a role:
              best overall, best value, upgrade, compact, or beginner setup.
            </p>
          </div>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <BestOfCard article={article} key={article.slug} />
          ))}
        </div>
      </Container>
    </>
  );
}
