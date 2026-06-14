import type { Author } from "@/types/content";

type AuthorCardProps = {
  author: Author;
};

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <section className="surface rounded-lg p-6">
      <p className="text-xs uppercase text-muted">Written by</p>
      <div className="mt-4 flex items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage font-serif text-lg font-semibold text-foreground">
          {author.name.charAt(0)}
        </span>
        <div className="space-y-1">
          <p className="font-semibold text-foreground">{author.name}</p>
          <p className="text-sm leading-7 text-muted">{author.role}</p>
        </div>
      </div>
    </section>
  );
}
