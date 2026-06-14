import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";

import type { BestOfIndexItem } from "@/types/content";
import { formatDate } from "@/lib/utils";

type BestOfCardProps = {
  article: BestOfIndexItem;
};

export function BestOfCard({ article }: BestOfCardProps) {
  return (
    <article className="surface flex h-full flex-col overflow-hidden rounded-lg">
      <div className="flex items-center gap-3 border-b border-line bg-paper-strong px-5 py-4 text-xs font-bold uppercase text-muted">
        <ListChecks className="h-4 w-4 text-blue" />
        <span>{article.category}</span>
        <span>{article.picks.length} picks</span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="space-y-3">
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            <Link className="transition hover:text-accent" href={`/best/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
          <p className="text-sm leading-7 text-muted">{article.excerpt}</p>
        </div>

        <div className="grid gap-2">
          {article.picks.slice(0, 3).map((pick, index) => (
            <div
              className="flex items-start gap-3 rounded-md border border-line bg-paper-strong p-3"
              key={pick.name}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-bold text-paper-strong">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{pick.name}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{pick.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4 text-sm text-muted">
          <span>Updated {formatDate(article.updatedDate)}</span>
          <Link
            className="inline-flex items-center gap-2 font-bold text-foreground transition hover:text-accent"
            href={`/best/${article.slug}`}
          >
            Open shortlist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
