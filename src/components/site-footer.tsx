import Link from "next/link";

import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line/80 py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="font-serif text-2xl font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="text-sm leading-7 text-muted">
            Smart home, creator, and everyday gear shortlists written around
            buyer jobs, tradeoffs, and practical setup decisions.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted md:max-w-md md:justify-end">
          <Link className="transition hover:text-foreground" href="/about">
            About
          </Link>
          <Link className="transition hover:text-foreground" href="/contact">
            Contact
          </Link>
          <Link className="transition hover:text-foreground" href="/disclosure">
            Affiliate disclosure
          </Link>
          <Link className="transition hover:text-foreground" href="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-foreground" href="/terms">
            Terms
          </Link>
          <p>© {new Date().getFullYear()} GearSignal.</p>
        </div>
      </Container>
    </footer>
  );
}
