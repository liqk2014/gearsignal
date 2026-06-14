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
      <Container className="py-16 md:py-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase text-muted">
            Review library
          </p>
          <h1 className="font-serif text-4xl font-semibold text-foreground md:text-6xl">
            Practical reviews for buyers choosing gear for a specific setup.
          </h1>
          <p className="text-base leading-8 text-muted md:text-lg">
            Each review frames the job, tradeoffs, and next purchase path so
            the page can carry both organic traffic and future PartnerBoost
            deep links.
          </p>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </Container>
    </>
  );
}
