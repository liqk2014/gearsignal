export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Author = {
  name: string;
  role: string;
};

export type ReviewFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishDate: string;
  updatedDate: string;
  featured?: boolean;
  rating: number;
  priceLabel: string;
  affiliateHref: string;
  verdict: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  author: Author;
};

export type ReviewIndexItem = ReviewFrontmatter & {
  readingTime: string;
};

export type ReviewDocument = ReviewIndexItem & {
  body: string;
  headings: TocHeading[];
};

export type BestPick = {
  name: string;
  label: string;
  href: string;
  summary: string;
  note?: string;
};

export type BestOfFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishDate: string;
  updatedDate: string;
  featured?: boolean;
  intro: string;
  criteria: string[];
  picks: BestPick[];
  author: Author;
};

export type BestOfIndexItem = BestOfFrontmatter & {
  readingTime: string;
};

export type BestOfDocument = BestOfIndexItem & {
  body: string;
  headings: TocHeading[];
};
