import Link from "next/link";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Container className="py-24">
      <section className="surface max-w-3xl rounded-lg p-8 md:p-12">
        <p className="text-xs uppercase text-muted">
          Page not found
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-5xl">
          That page is missing from the buying path.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          The route may not exist yet, or the guide has not been published.
          Browse the current gear pages below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={cn(buttonVariants({ variant: "default" }))} href="/reviews">
            Browse reviews
          </Link>
          <Link className={cn(buttonVariants({ variant: "outline" }))} href="/best">
            Open shortlists
          </Link>
        </div>
      </section>
    </Container>
  );
}
