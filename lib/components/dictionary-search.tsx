"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Entry {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export function DictionarySearch({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return entries
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.content.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(q) ? 0 : 1;
        const bTitle = b.title.toLowerCase().includes(q) ? 0 : 1;
        return aTitle - bTitle;
      });
  }, [query, entries]);

  const displayEntries = results ?? entries;

  return (
    <div className="grid gap-6">
      <input
        type="text"
        placeholder="Search terms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
      />

      <div className="grid gap-1">
        {displayEntries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/ai-dictionary/${entry.slug}`}
            className="link border border-border px-3 py-2 hover:bg-muted transition-colors"
          >
            <span className="font-medium text-sm">{entry.title}</span>
            {entry.description && (
              <p className="text-xs text-secondary-foreground mt-1 line-clamp-2">
                {entry.description}
              </p>
            )}
          </Link>
        ))}

        {displayEntries.length === 0 && (
          <p className="text-sm text-secondary-foreground py-4 text-center">
            No terms found.
          </p>
        )}
      </div>
    </div>
  );
}
