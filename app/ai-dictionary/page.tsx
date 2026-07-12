import type { Metadata } from "next";
import { getAllEntries } from "@/lib/dictionary";
import { DictionarySearch } from "@/lib/components/dictionary-search";

export const metadata: Metadata = {
  title: "AI Dictionary",
  description: "Searchable dictionary of AI terms.",
};

export default function DictionaryPage() {
  const entries = getAllEntries().map((e) => ({
    slug: e.slug,
    title: e.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: e.description,
    content: e.content,
  }));

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          AI Dictionary
        </h1>
        <p className="text-sm text-secondary-foreground mt-1">
          Search AI terms and concepts.
        </p>
      </header>

      <DictionarySearch entries={entries} />
    </div>
  );
}
