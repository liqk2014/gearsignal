import Link from "next/link";
import { Search, ShieldCheck } from "lucide-react";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper-strong/94 backdrop-blur">
      <Container className="flex items-center justify-between gap-5 py-4">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground font-serif text-lg font-semibold text-paper-strong">
            G
          </span>
          <div>
            <p className="font-serif text-xl font-semibold leading-none text-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs font-bold uppercase text-accent">
              Tested shortlists
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              className="text-sm font-bold text-muted transition hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            aria-label="Browse reviews"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden h-9 w-9 px-0 sm:inline-flex",
            )}
            href="/reviews"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            href="/disclosure"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Disclosure</span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
