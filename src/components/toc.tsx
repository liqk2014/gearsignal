import type { TocHeading } from "@/types/content";

type TocProps = {
  headings: TocHeading[];
};

export function Toc({ headings }: TocProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="surface rounded-lg p-5">
      <p className="text-xs uppercase text-muted">On this page</p>
      <ul className="mt-4 space-y-3">
        {headings.map((heading) => (
          <li key={`${heading.level}-${heading.id}`}>
            <a
              className="block text-sm leading-6 text-muted transition hover:text-foreground"
              href={`#${heading.id}`}
            >
              {heading.level === 3 ? "• " : ""}
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
