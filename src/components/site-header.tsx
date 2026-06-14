import Link from "next/link";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="border-b border-line/80">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper-strong font-serif text-lg font-semibold text-accent">
            G
          </span>
          <div>
            <p className="font-serif text-xl font-semibold text-foreground">
              {siteConfig.name}
            </p>
            <p className="text-xs uppercase text-muted">
              Buying guides
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              className="text-sm font-medium text-muted transition hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          href="/reviews"
        >
          Compare gear
        </Link>
      </Container>
    </header>
  );
}
