import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllEntries } from "@/lib/dictionary";
import { DictionarySearch } from "@/lib/components/dictionary-search";

export const metadata: Metadata = {
  title: "AI Dictionary",
  description: "Searchable dictionary of AI terms.",
};

export default function DictionaryPage() {
  const entries = getAllEntries().map((e) => ({
    slug: e.slug,
    englishTitle: e.englishTitle,
    farsiTitle: e.farsiTitle,
    description: e.description,
    category: e.category,
    order: e.order,
    content: e.content,
  }));

  return (
    <Suspense>
      <DictionarySearch entries={entries} />
    </Suspense>
  );
}
