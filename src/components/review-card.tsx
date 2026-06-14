import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Star } from "lucide-react";

import type { ReviewIndexItem } from "@/types/content";
import { getReviewProductAsset } from "@/lib/product-assets";
import { formatDate } from "@/lib/utils";

type ReviewCardProps = {
  review: ReviewIndexItem;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const productAsset = getReviewProductAsset(review.slug);

  return (
    <article className="surface flex h-full flex-col overflow-hidden rounded-lg">
      {productAsset ? (
        <div className="relative h-44 border-b border-line">
          <Image
            alt={productAsset.imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            src={productAsset.image}
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-b border-line bg-paper-strong px-5 py-4 text-xs font-bold uppercase text-muted">
        <span>{review.category}</span>
        {review.featured ? (
          <span className="rounded-md bg-accent-soft px-2.5 py-1 text-accent">
            Featured
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="space-y-3">
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            <Link className="transition hover:text-accent" href={`/reviews/${review.slug}`}>
              {review.title}
            </Link>
          </h3>
          <p className="text-sm leading-7 text-muted">{review.excerpt}</p>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line text-sm">
          <div className="bg-paper-strong p-4">
            <dt className="text-xs font-bold uppercase text-muted">Fit score</dt>
            <dd className="mt-2 flex items-center gap-2 font-bold text-foreground">
              <Star className="h-4 w-4 fill-amber text-amber" />
              {review.rating.toFixed(1)}
            </dd>
          </div>
          <div className="bg-paper-strong p-4">
            <dt className="text-xs font-bold uppercase text-muted">Street price</dt>
            <dd className="mt-2 font-bold text-foreground">{review.priceLabel}</dd>
          </div>
        </dl>

        <div className="rounded-md bg-green-soft p-4">
          <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" />
            Best for {review.bestFor.slice(0, 2).join(" and ")}.
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4 text-sm text-muted">
          <span>Updated {formatDate(review.updatedDate)}</span>
          <div className="flex items-center gap-3">
            <Link className="transition hover:text-accent" href={`/reviews/${review.slug}`}>
              <span className="inline-flex items-center gap-2 font-bold text-foreground transition hover:text-accent">
                Review
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <a
              className="inline-flex items-center gap-2 font-bold text-blue transition hover:text-accent"
              href={review.affiliateHref}
              rel="noreferrer"
              target="_blank"
            >
              Product
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
