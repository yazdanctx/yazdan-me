"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/lib/components/ui/input";

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
      <Input
        type="text"
        placeholder="جست و جو ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid gap-2 md:grid-cols-2">
        {displayEntries.map((entry) => (
          <Link
            className="p-5 bg-muted border border-muted hover:border-yellow-700"
            key={entry.slug}
            href={`/ai-dictionary/${entry.slug}`}
          >
            <span className="font-medium">{entry.title}</span>
            {entry.description && (
              <p className="text-secondary-foreground">{entry.description}</p>
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
