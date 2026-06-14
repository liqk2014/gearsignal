import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BestPick } from "@/types/content";

type BestPicksProps = {
  picks: BestPick[];
};

export function BestPicks({ picks }: BestPicksProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-line bg-line">
      {picks.map((pick, index) => {
        const isExternal = pick.href.startsWith("http");
        const label = `#${index + 1} ${pick.name}`;

        return (
          <article
            className="grid gap-4 border-b border-line bg-paper-strong p-5 last:border-b-0 md:grid-cols-[8rem_minmax(0,1fr)_9rem]"
            key={pick.name}
          >
            <div>
              <span className="inline-flex rounded-md bg-foreground px-3 py-1 text-xs font-bold uppercase text-paper-strong">
                {pick.label}
              </span>
              {pick.note ? <p className="mt-3 text-xs font-bold uppercase text-muted">{pick.note}</p> : null}
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                {label}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-muted">{pick.summary}</p>
            </div>

            <div className="flex items-center md:justify-end">
              {isExternal ? (
                <a
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-bold text-accent-ink transition hover:bg-foreground"
                  href={pick.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open pick
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-bold text-paper-strong transition hover:bg-accent"
                  href={pick.href}
                >
                  Read review
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
