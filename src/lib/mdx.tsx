import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { CtaCard } from "@/components/cta-card";
import { Callout } from "@/components/mdx/callout";
import { cn } from "@/lib/utils";

const mdxComponents: MDXComponents = {
  a: ({ children, className, href }) => {
    const resolvedHref = href ?? "#";
    const sharedClassName = cn(
      "font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition hover:text-foreground",
      className,
    );

    if (resolvedHref.startsWith("/")) {
      return (
        <Link className={sharedClassName} href={resolvedHref}>
          {children}
        </Link>
      );
    }

    return (
      <a
        className={sharedClassName}
        href={resolvedHref}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
  Callout,
  CtaCard,
};

export async function renderArticle(body: string) {
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  return content;
}
