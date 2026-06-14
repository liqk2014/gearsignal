import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, ShoppingBag, Star } from "lucide-react";

import { AuthorCard } from "@/components/author-card";
import { Container } from "@/components/container";
import { CtaCard } from "@/components/cta-card";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { ProsConsCard } from "@/components/pros-cons-card";
import { Toc } from "@/components/toc";
import { buttonVariants } from "@/components/ui/button";
import { getAllReviews, getReviewBySlug } from "@/lib/content";
import { renderArticle } from "@/lib/mdx";
import { getReviewProductAsset } from "@/lib/product-assets";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata(
  props: PageProps<"/reviews/[slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    return {};
  }

  return {
    title: review.title,
    description: review.excerpt,
    alternates: {
      canonical: absoluteUrl(`/reviews/${review.slug}`),
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(`/reviews/${review.slug}`),
      title: review.title,
      description: review.excerpt,
      publishedTime: review.publishDate,
      modifiedTime: review.updatedDate,
      authors: [review.author.name],
    },
  };
}

export default async function ReviewPage(props: PageProps<"/reviews/[slug]">) {
  const params = await props.params;
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  const productAsset = getReviewProductAsset(review.slug);
  const content = await renderArticle(review.body);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    headline: review.title,
    description: review.excerpt,
    url: absoluteUrl(`/reviews/${review.slug}`),
    datePublished: review.publishDate,
    dateModified: review.updatedDate,
    author: {
      "@type": "Person",
      name: review.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    itemReviewed: {
      "@type": "Product",
      name: review.title,
    },
  };

  return (
    <Container className="py-12 md:py-16">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        suppressHydrationWarning
        type="application/ld+json"
      />

      <article className="space-y-8">
        <header className="grid overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="bg-paper-strong p-6 md:p-9">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase text-muted">
              <span>{review.category}</span>
              <span>Updated {formatDate(review.updatedDate)}</span>
              <span>{review.readingTime}</span>
            </div>

            <div className="mt-5 space-y-4">
              <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.04] text-foreground md:text-6xl">
                {review.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
                {review.excerpt}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {review.bestFor.map((item) => (
                <span
                  className="rounded-md border border-line bg-paper px-3 py-1.5 text-xs font-bold text-foreground"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              <div className="bg-paper p-4">
                <p className="text-xs font-bold uppercase text-muted">Verdict</p>
                <p className="mt-2 flex items-center gap-2 font-bold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green" />
                  Recommended path
                </p>
              </div>
              <div className="bg-paper p-4">
                <p className="text-xs font-bold uppercase text-muted">Fit score</p>
                <p className="mt-2 flex items-center gap-2 font-bold text-foreground">
                  <Star className="h-4 w-4 fill-amber text-amber" />
                  {review.rating.toFixed(1)} / 5
                </p>
              </div>
              <div className="bg-paper p-4">
                <p className="text-xs font-bold uppercase text-muted">Price range</p>
                <p className="mt-2 font-bold text-foreground">{review.priceLabel}</p>
              </div>
            </div>
          </div>

          <aside className="bg-slab p-6 text-paper-strong">
            {productAsset ? (
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg border border-white/12">
                <Image
                  alt={productAsset.imageAlt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  src={productAsset.image}
                />
              </div>
            ) : null}
            <div className="flex items-center gap-2 text-sm font-bold text-accent-soft">
              <ShoppingBag className="h-4 w-4 text-accent" />
              Quick buying call
            </div>
            <p className="mt-4 font-serif text-2xl font-semibold">
              {review.verdict}
            </p>
            <div className="mt-6 space-y-3">
              <a
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
                href={review.affiliateHref}
                rel="noreferrer"
                target="_blank"
              >
                View product on Amazon
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full border-white/20 bg-white/8 text-paper-strong hover:border-white",
                )}
                href="#details"
              >
                Read the evidence
              </Link>
            </div>
            <p className="mt-4 text-xs leading-6 text-paper-strong/65">
              Product links open retailer detail pages in a new tab. Prices and
              availability can change.
            </p>
          </aside>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <DisclosureBanner />
            <ProsConsCard cons={review.cons} pros={review.pros} />

            <div className="prose" id="details">
              {content}
            </div>

            <AuthorCard author={review.author} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Toc headings={review.headings} />
            <CtaCard
              compact
              description={review.verdict}
              href={review.affiliateHref}
              label="View product on Amazon"
              title="Check current product page"
            />
          </aside>
        </div>
      </article>
    </Container>
  );
}
