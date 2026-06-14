type ProsConsCardProps = {
  pros: string[];
  cons: string[];
};

export function ProsConsCard({ pros, cons }: ProsConsCardProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="surface rounded-lg p-6">
        <p className="text-xs uppercase text-muted">Pros</p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground">
          {pros.map((item) => (
            <li className="flex gap-3" key={item}>
              <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="surface rounded-lg p-6">
        <p className="text-xs uppercase text-muted">Tradeoffs</p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground">
          {cons.map((item) => (
            <li className="flex gap-3" key={item}>
              <span className="mt-2 h-2 w-2 rounded-full bg-foreground/35" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
