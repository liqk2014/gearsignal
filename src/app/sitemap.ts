import type { MetadataRoute } from "next";

import { getAllBestOfs, getAllReviews } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [reviews, bestOfs] = await Promise.all([getAllReviews(), getAllBestOfs()]);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/reviews"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/best"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/disclosure"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: new Date(),
    },
    ...reviews.map((review) => ({
      url: absoluteUrl(`/reviews/${review.slug}`),
      lastModified: new Date(review.updatedDate),
    })),
    ...bestOfs.map((article) => ({
      url: absoluteUrl(`/best/${article.slug}`),
      lastModified: new Date(article.updatedDate),
    })),
  ];
}
