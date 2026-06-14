import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Home as HomeIcon,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { BestOfCard } from "@/components/best-of-card";
import { Container } from "@/components/container";
import { ReviewCard } from "@/components/review-card";
import { buttonVariants } from "@/components/ui/button";
import { getAllBestOfs, getAllReviews, getFeaturedReviews } from "@/lib/content";
import { cn } from "@/lib/utils";

const topPicks = [
  {
    label: "Best first pillar",
    title: "Smart dehumidifier setup",
    href: "/reviews/smart-dehumidifier",
    productHref: "https://www.amazon.com/dp/B0GL78KXLF",
    price: "$120-$300",
    reason: "Clear pain, high purchase intent, easy Amazon comparison.",
  },
  {
    label: "Best visual content",
    title: "Creator desk lighting kit",
    href: "/reviews/creator-desk-lighting",
    productHref: "https://www.amazon.com/dp/B0G4BZM13B",
    price: "$45-$220",
    reason: "Strong before/after angle and natural bundle path.",
  },
  {
    label: "Best higher-ticket test",
    title: "Action camera travel kit",
    href: "/reviews/action-camera-travel-kit",
    productHref:
      "https://www.amazon.com/GoPro-HERO13-Black-Compatability-HB/dp/B0DCM34GXX",
    price: "$250-$650",
    reason: "Accessories, cases, mounts, and batteries expand basket size.",
  },
];

const categoryTiles = [
  {
    icon: HomeIcon,
    title: "Smart home fixes",
    href: "/reviews/smart-dehumidifier",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    body: "Humidity, air quality, lighting, cleaning, and small-appliance decisions where shoppers need sizing and setup help.",
  },
  {
    icon: Camera,
    title: "Creator desk gear",
    href: "/reviews/creator-desk-lighting",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    body: "Lighting, webcams, microphones, monitor arms, and desk kits for people who want to look better on camera.",
  },
  {
    icon: Sparkles,
    title: "Travel and DTC add-ons",
    href: "/reviews/action-camera-travel-kit",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
    body: "Action camera kits, chargers, organizers, creator bags, and consumer brands that fit review-led traffic.",
  },
];

const comparisonRows = [
  {
    segment: "Damp room buyer",
    page: "Smart dehumidifier setup",
    trigger: "Apartment, basement, laundry, musty room",
    monetization: "ASIN deep links, filters, drain hose accessories",
    href: "/reviews/smart-dehumidifier",
    productHref: "https://www.amazon.com/dp/B0GL78KXLF",
  },
  {
    segment: "Beginner creator",
    page: "Creator desk lighting kit",
    trigger: "Zoom, YouTube, product shots, livestreams",
    monetization: "Key lights, fill lights, mounts, cable control",
    href: "/reviews/creator-desk-lighting",
    productHref: "https://www.amazon.com/dp/B0G4BZM13B",
  },
  {
    segment: "Trip planner",
    page: "Action camera travel kit",
    trigger: "Vacation, hiking, cycling, family travel",
    monetization: "Camera kits, batteries, cases, mounts, storage",
    href: "/reviews/action-camera-travel-kit",
    productHref:
      "https://www.amazon.com/GoPro-HERO13-Black-Compatability-HB/dp/B0DCM34GXX",
  },
];

const trustSignals = [
  "Clear affiliate disclosure",
  "Task-led recommendations",
  "Price and tradeoff framing",
  "Direct product links are clearly marked",
];

const brandSignals = ["GoPro", "Midea", "NEEWER", "Xiaomi", "Glossier", "Warby Parker"];

export default async function Home() {
  const [featuredReviews, reviews, bestOfs] = await Promise.all([
    getFeaturedReviews(),
    getAllReviews(),
    getAllBestOfs(),
  ]);

  const reviewRail = featuredReviews.length > 0 ? featuredReviews : reviews;

  return (
    <>
      <Container className="py-8 md:py-10">
        <section className="grid overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-[minmax(0,1.05fr)_24rem]">
          <div className="bg-paper-strong p-6 md:p-9">
            <div className="flex flex-wrap gap-2">
              <span className="editorial-label">Affiliate buying guide</span>
              <span className="editorial-label text-accent">Amazon-ready categories</span>
            </div>

            <div className="mt-8 max-w-4xl space-y-5">
              <h1 className="font-serif text-4xl font-semibold leading-[1.02] text-foreground md:text-6xl">
                Gear shortlists that move shoppers from research to a confident click.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
                GearSignal is built like a product-review publisher: quick verdicts,
                price context, comparison tables, and buyer-job pages for smart
                home, creator, travel, and everyday Amazon gear.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link className={cn(buttonVariants({ variant: "default", size: "lg" }))} href="/best">
                See best picks
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }))} href="/reviews">
                Browse reviews
              </Link>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              {[
                ["3", "review-led buying paths"],
                ["4", "retail-ready categories"],
                ["0", "medical or finance claims"],
              ].map(([value, label]) => (
                <div className="bg-paper p-4" key={label}>
                  <p className="font-serif text-3xl font-semibold text-foreground">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-slab p-5 text-paper-strong md:p-6">
            <div className="flex items-center gap-2 text-sm font-bold text-accent-soft">
              <Star className="h-4 w-4 fill-accent text-accent" />
              Start here
            </div>
            <h2 className="mt-3 font-serif text-3xl font-semibold">
              First pages to show affiliate network reviewers.
            </h2>

            <div className="mt-5 space-y-3">
              {topPicks.map((pick, index) => (
                <article
                  className="rounded-lg border border-white/12 bg-white/7 p-4 transition hover:border-accent hover:bg-white/10"
                  key={pick.title}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase text-accent-soft">
                        {index + 1}. {pick.label}
                      </p>
                      <Link
                        className="mt-2 block font-serif text-xl font-semibold transition hover:text-accent-soft"
                        href={pick.href}
                      >
                        {pick.title}
                      </Link>
                    </div>
                    <span className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-foreground">
                      {pick.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-paper-strong/75">
                    {pick.reason}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                    <Link
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-2 text-paper-strong transition hover:border-accent hover:text-accent-soft"
                      href={pick.href}
                    >
                      Review
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      className="inline-flex items-center gap-1.5 rounded-md bg-paper-strong px-3 py-2 text-foreground transition hover:bg-accent-soft"
                      href={pick.productHref}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Product
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-white/12 bg-white/7 p-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <ShieldCheck className="h-4 w-4 text-green-soft" />
                Monetization note
              </div>
              <p className="mt-2 text-sm leading-6 text-paper-strong/75">
                Product buttons point to live retailer detail pages. Tracking can
                be added later without changing the page structure.
              </p>
            </div>
          </aside>
        </section>
      </Container>

      <Container className="pb-12">
        <div className="grid gap-5 md:grid-cols-3">
          {categoryTiles.map((tile) => {
            const Icon = tile.icon;

            return (
              <Link
                className="group surface overflow-hidden rounded-lg bg-paper-strong"
                href={tile.href}
                key={tile.title}
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    alt={`${tile.title} product setup`}
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={tile.image}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Icon className="h-4 w-4 text-accent" />
                    {tile.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">{tile.body}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-foreground">
                    Open buying path
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      <Container className="pb-14">
        <section className="overflow-hidden rounded-lg border border-line bg-paper-strong">
          <div className="grid gap-5 border-b border-line p-5 md:grid-cols-[minmax(0,1fr)_18rem] md:p-7">
            <div>
              <p className="text-xs font-bold uppercase text-accent">Comparison map</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
                The site is organized around buyer intent, not random products.
              </h2>
            </div>
            <div className="rounded-lg bg-blue-soft p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-blue">
                <ListChecks className="h-4 w-4" />
                Affiliate pattern
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Each row can become a listicle, a review, a product feed block,
                and a future tracked CTA.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="commerce-table min-w-[760px]">
              <thead>
                <tr>
                  <th>Buyer segment</th>
                  <th>Page to build</th>
                  <th>Purchase trigger</th>
                  <th>Link path</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.page}>
                    <td>
                      <strong className="text-foreground">{row.segment}</strong>
                    </td>
                    <td>{row.page}</td>
                    <td>{row.trigger}</td>
                    <td>{row.monetization}</td>
                    <td>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          className="inline-flex items-center gap-2 font-bold text-foreground transition hover:text-accent"
                          href={row.href}
                        >
                          Review
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                          className="inline-flex items-center gap-2 font-bold text-blue transition hover:text-accent"
                          href={row.productHref}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Product
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>

      <Container className="pb-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <section>
            <div className="mb-5 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase text-accent">Featured reviews</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
                  Product pages with the CTA close to the verdict.
                </h2>
              </div>
              <Link
                className="hidden text-sm font-bold text-foreground transition hover:text-accent md:inline-flex"
                href="/reviews"
              >
                All reviews
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {reviewRail.slice(0, 3).map((review) => (
                <ReviewCard key={review.slug} review={review} />
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="surface rounded-lg p-5">
              <p className="text-xs font-bold uppercase text-accent">Trust checklist</p>
              <ul className="mt-4 space-y-3">
                {trustSignals.map((signal) => (
                  <li className="flex gap-3 text-sm leading-6 text-foreground" key={signal}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                    {signal}
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface rounded-lg p-5">
              <p className="text-xs font-bold uppercase text-muted">Brand fit examples</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {brandSignals.map((brand) => (
                  <span
                    className="rounded-md border border-line bg-paper-strong px-3 py-2 text-center text-xs font-bold text-foreground"
                    key={brand}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase text-accent">Shortlist pages</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Listicles for buyers who want the first serious cut.
            </h2>
          </div>
          <BadgeCheck className="hidden h-8 w-8 text-blue md:block" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {bestOfs.map((article) => (
            <BestOfCard article={article} key={article.slug} />
          ))}
        </div>
      </Container>
    </>
  );
}
