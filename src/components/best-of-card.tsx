import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BestOfIndexItem } from "@/types/content";
import { formatDate } from "@/lib/utils";

type BestOfCardProps = {
  article: BestOfIndexItem;
};

export function BestOfCard({ article }: BestOfCardProps) {
  return (
    <article className="surface flex h-full flex-col gap-5 rounded-lg p-6">
      <div className="flex items-center gap-3 text-xs uppercase text-muted">
        <span>{article.category}</span>
        <span>{article.picks.length} picks</span>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          <Link className="transition hover:text-accent" href={`/best/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <p className="text-sm leading-7 text-muted">{article.excerpt}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {article.criteria.slice(0, 3).map((criterion) => (
          <span
            className="rounded-full border border-line bg-paper/70 px-3 py-1 text-xs font-medium text-muted"
            key={criterion}
          >
            {criterion}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line/80 pt-4 text-sm text-muted">
        <span>Updated {formatDate(article.updatedDate)}</span>
        <Link
          className="inline-flex items-center gap-2 font-semibold text-foreground transition hover:text-accent"
          href={`/best/${article.slug}`}
        >
          Open shortlist
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
