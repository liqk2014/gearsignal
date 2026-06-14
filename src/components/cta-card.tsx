import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaCardProps = {
  title: string;
  description: string;
  href: string;
  label?: string;
  eyebrow?: string;
  compact?: boolean;
  className?: string;
};

export function CtaCard({
  title,
  description,
  href,
  label = "Visit offer",
  eyebrow = "Primary recommendation",
  compact = false,
  className,
}: CtaCardProps) {
  const isExternal = href.startsWith("http");
  const actionClassName = cn(buttonVariants({ variant: "default" }), "w-full");

  return (
    <section
      className={cn(
        "surface rounded-lg border-accent/30 bg-paper-strong p-6",
        compact ? "space-y-4" : "space-y-5",
        className,
      )}
    >
      <p className="text-xs font-bold uppercase text-accent">{eyebrow}</p>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-7 text-muted">{description}</p>
      </div>

      {isExternal ? (
        <a className={actionClassName} href={href} rel="noreferrer" target="_blank">
          {label}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : (
        <Link className={actionClassName} href={href}>
          {label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </section>
  );
}
