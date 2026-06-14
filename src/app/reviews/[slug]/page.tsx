import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorCard } from "@/components/author-card";
import { Container } from "@/components/container";
import { CtaCard } from "@/components/cta-card";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { ProsConsCard } from "@/components/pros-cons-card";
import { Toc } from "@/components/toc";
import { getAllReviews, getReviewBySlug } from "@/lib/content";
import { renderArticle } from "@/lib/mdx";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

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
        <header className="surface grid gap-8 rounded-lg p-8 md:p-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase text-muted">
              <span>{review.category}</span>
              <span>Updated {formatDate(review.updatedDate)}</span>
              <span>{review.readingTime}</span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl font-serif text-4xl font-semibold text-foreground md:text-6xl">
                {review.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
                {review.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {review.bestFor.map((item) => (
                <span
                  className="rounded-full border border-line bg-paper/70 px-3 py-1 text-xs font-medium text-muted"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-lg bg-foreground p-6 text-paper-strong">
            <p className="text-xs uppercase text-paper-strong/70">
              Fit score
            </p>
            <p className="mt-3 text-5xl font-semibold">
              {review.rating.toFixed(1)}
            </p>
            <p className="mt-3 text-sm leading-7 text-paper-strong/80">
              {review.verdict}
            </p>
            <div className="mt-6 border-t border-paper-strong/15 pt-4">
              <p className="text-xs uppercase text-paper-strong/70">
                Pricing
              </p>
              <p className="mt-2 text-lg font-semibold">{review.priceLabel}</p>
            </div>
          </aside>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <DisclosureBanner />
            <ProsConsCard cons={review.cons} pros={review.pros} />

            <div className="prose">{content}</div>

            <AuthorCard author={review.author} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Toc headings={review.headings} />
            <CtaCard
              compact
              description={review.verdict}
              href={review.affiliateHref}
              label="View Amazon options"
              title="Compare current options"
            />
          </aside>
        </div>
      </article>
    </Container>
  );
}
