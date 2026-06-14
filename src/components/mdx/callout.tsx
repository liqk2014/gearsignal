import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutProps = {
  children: ReactNode;
  title?: string;
  tone?: "note" | "caution";
};

export function Callout({
  children,
  title = "Note",
  tone = "note",
}: CalloutProps) {
  return (
    <aside
      className={cn(
        "my-8 rounded-lg border px-5 py-4",
        tone === "note"
          ? "border-sage bg-sage/40"
          : "border-accent/25 bg-accent/8",
      )}
    >
      <p className="text-xs uppercase text-muted">{title}</p>
      <div className="mt-3 text-sm leading-7 text-foreground">{children}</div>
    </aside>
  );
}
