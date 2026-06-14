import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquareText } from "lucide-react";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GearSignal for editorial corrections, product review requests, and affiliate partnership questions.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/contact"),
    title: "Contact GearSignal",
    description:
      "Contact GearSignal for editorial corrections, product review requests, and affiliate partnership questions.",
  },
};

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="surface rounded-lg p-8 md:p-12">
          <p className="text-xs uppercase text-muted">Contact</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-6xl">
            Editorial, product, and partnership questions.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
            Use this contact page for corrections, product review requests,
            merchant partnership questions, and affiliate network review. We
            do not accept paid placement that requires hiding tradeoffs or
            removing disclosure.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-line bg-paper-strong p-5">
              <Mail className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                Email
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                partnerships@gearsignal.co
              </p>
            </div>
            <div className="rounded-lg border border-line bg-paper-strong p-5">
              <MessageSquareText className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                Response focus
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Corrections, source notes, product availability, and affiliate
                program review.
              </p>
            </div>
          </div>
        </section>

        <aside className="surface rounded-lg p-6">
          <p className="text-xs uppercase text-muted">For network review</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground">
            Useful pages to inspect.
          </h2>
          <div className="mt-5 grid gap-3">
            <Link className={cn(buttonVariants({ variant: "outline" }))} href="/about">
              About
            </Link>
            <Link className={cn(buttonVariants({ variant: "outline" }))} href="/disclosure">
              Disclosure
            </Link>
            <Link className={cn(buttonVariants({ variant: "outline" }))} href="/privacy">
              Privacy policy
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
