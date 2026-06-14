import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Home as HomeIcon,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { BestOfCard } from "@/components/best-of-card";
import { Container } from "@/components/container";
import { ReviewCard } from "@/components/review-card";
import { buttonVariants } from "@/components/ui/button";
import { getAllBestOfs, getAllReviews, getFeaturedReviews } from "@/lib/content";
import { cn } from "@/lib/utils";

const categoryTiles = [
  {
    icon: HomeIcon,
    title: "Smart home and appliances",
    body: "Humidity control, kitchen upgrades, lighting, and cleaning products that shoppers already expect to compare on Amazon.",
  },
  {
    icon: Camera,
    title: "Creator and travel gear",
    body: "Action cameras, desk lighting, mobile accessories, and compact kits for people building a simple content setup.",
  },
  {
    icon: Sparkles,
    title: "DTC consumer brands",
    body: "Beauty, eyewear, wearables, and lifestyle brands where reviews and outfit or routine guides can carry purchase intent.",
  },
  {
    icon: PackageSearch,
    title: "Amazon seller tools",
    body: "Marketplace analytics, link routing, affiliate link management, and publisher tools for the B2B side of the ecosystem.",
  },
];

const brandSignals = [
  {
    name: "GoPro",
    src: "https://www.partnerboost.com/publishers/images/gopro.png",
  },
  {
    name: "Xiaomi",
    src: "https://www.partnerboost.com/publishers/images/xiaomi.png",
  },
  {
    name: "Glossier",
    src: "https://www.partnerboost.com/publishers/images/glossier.png",
  },
  {
    name: "Warby Parker",
    src: "https://www.partnerboost.com/publishers/images/warby.png",
  },
  {
    name: "ColourPop",
    src: "https://www.partnerboost.com/publishers/images/colorpop.png",
  },
  {
    name: "MVMT",
    src: "https://www.partnerboost.com/publishers/images/mvmth.png",
  },
];

export default async function Home() {
  const [featuredReviews, reviews, bestOfs] = await Promise.all([
    getFeaturedReviews(),
    getAllReviews(),
    getAllBestOfs(),
  ]);

  const leadReview = featuredReviews[0] ?? reviews[0];

  return (
    <>
      <Container className="grid gap-8 py-14 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_25rem] lg:gap-10">
        <section className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase text-muted">
              Amazon gear buying guides
            </p>
            <h1 className="max-w-5xl font-serif text-5xl font-semibold text-foreground md:text-7xl">
              Pick the right gear before the Amazon tab gets noisy.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
              GearSignal turns high-intent product research into clear
              shortlists for smart homes, creator desks, travel kits, and
              everyday upgrades that can be monetized through approved Amazon
              affiliate links.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className={cn(buttonVariants({ variant: "default", size: "lg" }))} href="/best">
              Start with shortlists
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }))} href="/reviews">
              Read reviews
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {categoryTiles.map((tile) => {
              const Icon = tile.icon;

              return (
                <article className="surface rounded-lg p-5" key={tile.title}>
                  <Icon className="h-5 w-5 text-accent" />
                  <h2 className="mt-4 text-base font-semibold text-foreground">
                    {tile.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted">{tile.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="surface rounded-lg p-6 md:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <ShieldCheck className="h-4 w-4" />
            PartnerBoost-aligned categories
          </div>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground">
            Consumer brands, Amazon products, and product-feed pages can share
            one content engine.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            The site is structured around review pages, compact shortlists, and
            setup guides. Once publisher access is approved, product CTAs can
            be replaced with PartnerBoost deep links, ASIN links, or brand
            storefront links.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {brandSignals.map((brand) => (
              <div
                className="flex h-20 items-center justify-center rounded-lg border border-line bg-paper-strong p-3"
                key={brand.name}
              >
                <Image
                  alt={`${brand.name} logo`}
                  className="max-h-10 w-auto object-contain"
                  height={64}
                  src={brand.src}
                  width={160}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-line bg-sage/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Zap className="h-4 w-4 text-accent" />
              First monetization step
            </div>
            <p className="mt-2 text-sm leading-7 text-muted">
              Build traffic around product jobs first, then swap placeholder
              Amazon URLs for approved PartnerBoost tracking links.
            </p>
          </div>
        </aside>
      </Container>

      {leadReview ? (
        <Container className="pb-8">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs uppercase text-muted">
                Featured review
              </p>
              <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                Start with product jobs that create repeat comparison demand.
              </h2>
            </div>
            <Link
              className="hidden text-sm font-semibold text-foreground transition hover:text-accent md:inline-flex"
              href={`/reviews/${leadReview.slug}`}
            >
              Open featured review
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </Container>
      ) : null}

      <Container className="pb-20 pt-6">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase text-muted">
              Shortlist pages
            </p>
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Use compact lists where buyers need a confident first cut.
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {bestOfs.map((article) => (
            <BestOfCard article={article} key={article.slug} />
          ))}
        </div>
      </Container>
    </>
  );
}
