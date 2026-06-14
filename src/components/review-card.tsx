import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import type { ReviewIndexItem } from "@/types/content";
import { formatDate } from "@/lib/utils";

type ReviewCardProps = {
  review: ReviewIndexItem;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="surface flex h-full flex-col gap-5 rounded-lg p-6">
      <div className="flex items-center gap-3 text-xs uppercase text-muted">
        <span>{review.category}</span>
        {review.featured ? (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
            Featured
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          <Link className="transition hover:text-accent" href={`/reviews/${review.slug}`}>
            {review.title}
          </Link>
        </h3>
        <p className="text-sm leading-7 text-muted">{review.excerpt}</p>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-lg bg-paper/70 p-4 text-sm">
        <div>
          <dt className="text-xs uppercase text-muted">Fit</dt>
          <dd className="mt-2 flex items-center gap-2 font-semibold text-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {review.rating.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-muted">Pricing</dt>
          <dd className="mt-2 font-semibold text-foreground">{review.priceLabel}</dd>
        </div>
      </dl>

      <div className="mt-auto space-y-4 border-t border-line/80 pt-4">
        <p className="text-sm text-muted">
          Best for {review.bestFor.slice(0, 2).join(" and ")}.
        </p>
        <div className="flex items-center justify-between text-sm text-muted">
          <span>Updated {formatDate(review.updatedDate)}</span>
          <Link
            className="inline-flex items-center gap-2 font-semibold text-foreground transition hover:text-accent"
            href={`/reviews/${review.slug}`}
          >
            Read review
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
