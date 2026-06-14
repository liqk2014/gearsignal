import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorCard } from "@/components/author-card";
import { BestPicks } from "@/components/best-picks";
import { Container } from "@/components/container";
import { CtaCard } from "@/components/cta-card";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { Toc } from "@/components/toc";
import { getAllBestOfs, getBestOfBySlug } from "@/lib/content";
import { renderArticle } from "@/lib/mdx";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllBestOfs();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/best/[slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const article = await getBestOfBySlug(params.slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: absoluteUrl(`/best/${article.slug}`),
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(`/best/${article.slug}`),
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate,
      authors: [article.author.name],
    },
  };
}

export default async function BestDetailPage(props: PageProps<"/best/[slug]">) {
  const params = await props.params;
  const article = await getBestOfBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const content = await renderArticle(article.body);
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: article.title,
    description: article.excerpt,
    url: absoluteUrl(`/best/${article.slug}`),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    itemListElement: article.picks.map((pick, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: pick.name,
      url: pick.href.startsWith("http") ? pick.href : absoluteUrl(pick.href),
    })),
  };

  return (
    <Container className="py-12 md:py-16">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        suppressHydrationWarning
        type="application/ld+json"
      />

      <article className="space-y-8">
        <header className="surface space-y-6 rounded-lg p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase text-muted">
            <span>{article.category}</span>
            <span>{article.picks.length} picks</span>
            <span>Updated {formatDate(article.updatedDate)}</span>
            <span>{article.readingTime}</span>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl font-serif text-4xl font-semibold text-foreground md:text-6xl">
              {article.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
              {article.intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.criteria.map((criterion) => (
              <span
                className="rounded-full border border-line bg-paper/70 px-3 py-1 text-xs font-medium text-muted"
                key={criterion}
              >
                {criterion}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <DisclosureBanner />
            <BestPicks picks={article.picks} />
            <div className="prose">{content}</div>
            <AuthorCard author={article.author} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Toc headings={article.headings} />
            <CtaCard
              compact
              description="Open the detailed review before choosing a product path."
              href="/reviews"
              label="Browse reviews"
              title="Need a closer look?"
            />
          </aside>
        </div>
      </article>
    </Container>
  );
}
