"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/lib/components/ui/input";

interface Entry {
  slug: string;
  englishTitle: string;
  farsiTitle: string;
  description: string;
  category: string;
  order: number;
  content: string;
}

function rankEntry(entry: Entry, q: string): number {
  if (!q) return 0;
  const title = entry.englishTitle.toLowerCase();
  if (title === q) return 0;
  if (title.startsWith(q)) return 1;
  if (title.includes(q)) return 2;
  if (entry.farsiTitle.toLowerCase().includes(q)) return 3;
  if (entry.description.toLowerCase().includes(q)) return 4;
  return 5;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-700/30 text-yellow-200">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function DictionarySearch({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const entry of entries) {
      const list = map.get(entry.category) ?? [];
      list.push(entry);
      map.set(entry.category, list);
    }
    return Array.from(map.entries()).sort(([, a], [, b]) => {
      const minOrder = (arr: Entry[]) => Math.min(...arr.map((e) => e.order));
      return minOrder(a) - minOrder(b);
    });
  }, [entries]);

  const q = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!q) return categories;
    return categories
      .map(([category, items]) => {
        const filtered = items
          .filter(
            (e) =>
              e.englishTitle.toLowerCase().includes(q) ||
              e.farsiTitle.toLowerCase().includes(q) ||
              e.description.toLowerCase().includes(q) ||
              e.content.toLowerCase().includes(q),
          )
          .sort((a, b) => rankEntry(a, q) - rankEntry(b, q));
        return [category, filtered] as const;
      })
      .filter(([, items]) => items.length > 0);
  }, [categories, q]);

  return (
    <div className="grid gap-6">
      <Input
        type="text"
        placeholder="جست و جو ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredCategories.map(([category, items]) => (
        <div key={category} className="grid gap-5">
          <h2 className="text-lg font-semibold text-left">
            {category}
            <span className="text-yellow-700 text-xl"> #</span>
          </h2>
          <div className="grid gap-1 md:grid-cols-2">
            {items.map((entry) => (
              <Link
                className="p-5 bg-muted border border-muted hover:border-yellow-700"
                key={entry.slug}
                href={`/ai-dictionary/${entry.slug}`}
              >
                <span className="font-medium w-full">
                  {highlight(entry.englishTitle, q)}
                </span>
                {entry.description && (
                  <p className="text-secondary-foreground text-sm">
                    {highlight(entry.description, q)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && (
        <p className="text-sm text-secondary-foreground py-4 text-center">
          No terms found.
        </p>
      )}
    </div>
  );
}
