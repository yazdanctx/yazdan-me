"use client";

import type { TocEntry } from "@/lib/mdx";
import { ArrowLeft, MoveLeft } from "lucide-react";

function TocList({ items, depth = 0 }: { items: TocEntry[]; depth?: number }) {
  if (items.length === 0) return null;

  return (
    <ul className={depth > 0 ? "mr-4" : undefined}>
      {items.map((entry) => (
        <li key={entry.id}>
          <button
            onClick={() => {
              document
                .getElementById(entry.id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full py-1 flex items-center gap-2  text-right cursor-pointer hover:text-secondary-foreground"
          >
            <MoveLeft size={14} />
            {entry.value}
          </button>
          <TocList items={entry.children} depth={depth + 1} />
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ items }: { items: TocEntry[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="border border-border p-4">
      <TocList items={items} />
    </nav>
  );
}
