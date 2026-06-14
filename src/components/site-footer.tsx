import Link from "next/link";

import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-paper-strong py-10">
      <Container className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)]">
        <div className="max-w-2xl space-y-3">
          <p className="font-serif text-2xl font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="text-sm leading-7 text-muted">
            Affiliate-ready buying guides for smart home, creator, travel, and
            everyday Amazon gear. Recommendations are organized around buyer
            jobs, tradeoffs, and clear purchase paths.
          </p>
          <p className="text-xs leading-6 text-muted">
            Product links open retailer pages in a new tab. Prices,
            availability, and offers can change.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted md:justify-end">
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
          <p className="basis-full text-xs font-normal md:text-right">
            © {new Date().getFullYear()} GearSignal.
          </p>
        </div>
      </Container>
    </footer>
  );
}
