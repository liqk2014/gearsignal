import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

import type {
  Author,
  BestOfDocument,
  BestOfIndexItem,
  BestOfFrontmatter,
  BestPick,
  ReviewDocument,
  ReviewIndexItem,
  ReviewFrontmatter,
  TocHeading,
} from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function requireString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Expected non-empty string for "${field}".`);
  }

  return value.trim();
}

function requireNumber(value: unknown, field: string) {
  const parsed = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Expected numeric value for "${field}".`);
  }

  return parsed;
}

function requireDateString(value: unknown, field: string) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return requireString(value, field);
}

function requireStringArray(value: unknown, field: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Expected string[] for "${field}".`);
  }

  return value.map((item) => item.trim()).filter(Boolean);
}

function requireAuthor(value: unknown, field: string): Author {
  if (!value || typeof value !== "object") {
    throw new Error(`Expected object for "${field}".`);
  }

  const author = value as Record<string, unknown>;

  return {
    name: requireString(author.name, `${field}.name`),
    role: requireString(author.role, `${field}.role`),
  };
}

function requireBestPicks(value: unknown, field: string): BestPick[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array for "${field}".`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Expected object for "${field}[${index}]".`);
    }

    const pick = item as Record<string, unknown>;

    return {
      name: requireString(pick.name, `${field}[${index}].name`),
      label: requireString(pick.label, `${field}[${index}].label`),
      href: requireString(pick.href, `${field}[${index}].href`),
      summary: requireString(pick.summary, `${field}[${index}].summary`),
      note:
        typeof pick.note === "string" && pick.note.trim().length > 0
          ? pick.note.trim()
          : undefined,
    };
  });
}

function asBoolean(value: unknown) {
  return value === true;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\:;"'<>,.?/]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(body: string): TocHeading[] {
  return body
    .split("\n")
    .map((line) => {
      const match = /^(##|###)\s+(.*)$/.exec(line.trim());

      if (!match) {
        return null;
      }

      const text = match[2].replace(/\[(.*?)\]\(.*?\)/g, "$1").trim();

      return {
        id: slugify(text),
        text,
        level: match[1].length as 2 | 3,
      };
    })
    .filter((item): item is TocHeading => item !== null);
}

async function readCollectionFiles(collection: "reviews" | "best") {
  const directory = path.join(CONTENT_ROOT, collection);
  const entries = await fs.readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(directory, entry.name));
}

function compareByPublishDate<T extends { publishDate: string }>(a: T, b: T) {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
}

function parseReview(_filePath: string, source: string): ReviewDocument {
  const { data, content } = matter(source);
  const frontmatter = data as Record<string, unknown>;

  const parsed: ReviewFrontmatter = {
    title: requireString(frontmatter.title, "title"),
    slug: requireString(frontmatter.slug, "slug"),
    excerpt: requireString(frontmatter.excerpt, "excerpt"),
    category: requireString(frontmatter.category, "category"),
    publishDate: requireDateString(frontmatter.publishDate, "publishDate"),
    updatedDate: requireDateString(frontmatter.updatedDate, "updatedDate"),
    featured: asBoolean(frontmatter.featured),
    rating: requireNumber(frontmatter.rating, "rating"),
    priceLabel: requireString(frontmatter.priceLabel, "priceLabel"),
    affiliateHref: requireString(frontmatter.affiliateHref, "affiliateHref"),
    verdict: requireString(frontmatter.verdict, "verdict"),
    bestFor: requireStringArray(frontmatter.bestFor, "bestFor"),
    pros: requireStringArray(frontmatter.pros, "pros"),
    cons: requireStringArray(frontmatter.cons, "cons"),
    alternatives: requireStringArray(frontmatter.alternatives, "alternatives"),
    author: requireAuthor(frontmatter.author, "author"),
  };

  return {
    ...parsed,
    body: content,
    headings: extractHeadings(content),
    readingTime: readingTime(content).text,
  };
}

function parseBestOf(_filePath: string, source: string): BestOfDocument {
  const { data, content } = matter(source);
  const frontmatter = data as Record<string, unknown>;

  const parsed: BestOfFrontmatter = {
    title: requireString(frontmatter.title, "title"),
    slug: requireString(frontmatter.slug, "slug"),
    excerpt: requireString(frontmatter.excerpt, "excerpt"),
    category: requireString(frontmatter.category, "category"),
    publishDate: requireDateString(frontmatter.publishDate, "publishDate"),
    updatedDate: requireDateString(frontmatter.updatedDate, "updatedDate"),
    featured: asBoolean(frontmatter.featured),
    intro: requireString(frontmatter.intro, "intro"),
    criteria: requireStringArray(frontmatter.criteria, "criteria"),
    picks: requireBestPicks(frontmatter.picks, "picks"),
    author: requireAuthor(frontmatter.author, "author"),
  };

  return {
    ...parsed,
    body: content,
    headings: extractHeadings(content),
    readingTime: readingTime(content).text,
  };
}

const getAllReviewDocuments = cache(async () => {
  const files = await readCollectionFiles("reviews");
  const documents = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      return parseReview(filePath, source);
    }),
  );

  return documents.sort(compareByPublishDate);
});

const getAllBestOfDocuments = cache(async () => {
  const files = await readCollectionFiles("best");
  const documents = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      return parseBestOf(filePath, source);
    }),
  );

  return documents.sort(compareByPublishDate);
});

export const getAllReviews = cache(async (): Promise<ReviewIndexItem[]> => {
  const documents = await getAllReviewDocuments();

  return documents.map((document) => {
    const summary: ReviewIndexItem = {
      title: document.title,
      slug: document.slug,
      excerpt: document.excerpt,
      category: document.category,
      publishDate: document.publishDate,
      updatedDate: document.updatedDate,
      featured: document.featured,
      rating: document.rating,
      priceLabel: document.priceLabel,
      affiliateHref: document.affiliateHref,
      verdict: document.verdict,
      bestFor: document.bestFor,
      pros: document.pros,
      cons: document.cons,
      alternatives: document.alternatives,
      author: document.author,
      readingTime: document.readingTime,
    };

    return summary;
  });
});

export const getFeaturedReviews = cache(async (): Promise<ReviewIndexItem[]> => {
  const reviews = await getAllReviews();
  return reviews.filter((review) => review.featured);
});

export const getReviewBySlug = cache(
  async (slug: string): Promise<ReviewDocument | null> => {
    const documents = await getAllReviewDocuments();
    return documents.find((document) => document.slug === slug) ?? null;
  },
);

export const getAllBestOfs = cache(async (): Promise<BestOfIndexItem[]> => {
  const documents = await getAllBestOfDocuments();

  return documents.map((document) => {
    const summary: BestOfIndexItem = {
      title: document.title,
      slug: document.slug,
      excerpt: document.excerpt,
      category: document.category,
      publishDate: document.publishDate,
      updatedDate: document.updatedDate,
      featured: document.featured,
      intro: document.intro,
      criteria: document.criteria,
      picks: document.picks,
      author: document.author,
      readingTime: document.readingTime,
    };

    return summary;
  });
});

export const getBestOfBySlug = cache(
  async (slug: string): Promise<BestOfDocument | null> => {
    const documents = await getAllBestOfDocuments();
    return documents.find((document) => document.slug === slug) ?? null;
  },
);
