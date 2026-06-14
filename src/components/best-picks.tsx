import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BestPick } from "@/types/content";

type BestPicksProps = {
  picks: BestPick[];
};

export function BestPicks({ picks }: BestPicksProps) {
  return (
    <section className="space-y-4">
      {picks.map((pick, index) => {
        const isExternal = pick.href.startsWith("http");
        const label = `#${index + 1} ${pick.name}`;

        return (
          <article className="surface rounded-lg p-5" key={pick.name}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase text-accent">
                {pick.label}
              </span>
              {pick.note ? (
                <span className="text-xs uppercase text-muted">
                  {pick.note}
                </span>
              ) : null}
            </div>

            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {label}
                </h3>
                <p className="max-w-2xl text-sm leading-7 text-muted">{pick.summary}</p>
              </div>

              {isExternal ? (
                <a
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-accent"
                  href={pick.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open pick
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-accent"
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
