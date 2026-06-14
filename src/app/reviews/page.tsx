import type { Metadata } from "next";

import { Container } from "@/components/container";
import { ReviewCard } from "@/components/review-card";
import { getAllReviews } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Gear reviews for buyers comparing smart home, creator, and everyday Amazon products.",
  alternates: {
    canonical: absoluteUrl("/reviews"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/reviews"),
    title: "Reviews",
    description:
      "Gear reviews for buyers comparing smart home, creator, and everyday Amazon products.",
  },
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <>
      <Container className="py-10 md:py-14">
        <div className="grid gap-6 rounded-lg border border-line bg-paper-strong p-6 md:grid-cols-[minmax(0,1fr)_20rem] md:p-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase text-accent">
              Review library
            </p>
            <h1 className="font-serif text-4xl font-semibold text-foreground md:text-6xl">
              Reviews built around the moment a shopper is ready to compare.
            </h1>
            <p className="text-base leading-8 text-muted md:text-lg">
              Every page leads with the buyer job, the useful tradeoffs, and a
              clear next step to a matching product page.
            </p>
          </div>

          <div className="rounded-lg bg-slab p-5 text-paper-strong">
            <p className="text-xs font-bold uppercase text-accent-soft">
              Page formula
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-paper-strong/80">
              <li>Quick verdict above the fold</li>
              <li>Price range before feature detail</li>
              <li>Pros, watchouts, and purchase triggers</li>
              <li>CTA near the decision point</li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </Container>
    </>
  );
}
