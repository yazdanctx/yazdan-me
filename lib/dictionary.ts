import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dictionaryDir = path.join(
  process.cwd(),
  "app/t/wiki-ai/dictionary",
);

export interface DictionaryEntry {
  slug: string;
  englishTitle: string;
  farsiTitle: string;
  description: string;
  category: string;
  order: number;
  content: string;
}

export interface DictionaryEntryIndex {
  slug: string;
  englishTitle: string;
  farsiTitle: string;
  description: string;
  category: string;
  order: number;
  content: string;
}

export function filenameToSlug(filename: string): string {
  return filename
    .replace(/\.mdx?$/, "")
    .toLowerCase()
    .replace(/ /g, "-");
}

export function slugToFilename(slug: string): string | null {
  if (!fs.existsSync(dictionaryDir)) return null;

  const files = fs.readdirSync(dictionaryDir);
  for (const file of files) {
    if (filenameToSlug(file) === slug) return file;
  }
  return null;
}

export function getAllEntries(): DictionaryEntry[] {
  if (!fs.existsSync(dictionaryDir)) return [];

  const files = fs.readdirSync(dictionaryDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const entries: DictionaryEntry[] = [];

  for (const file of files) {
    const filePath = path.join(dictionaryDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);

    entries.push({
      slug: filenameToSlug(file),
      englishTitle: String(data["english-title"] ?? ""),
      farsiTitle: String(data["farsi-title"] ?? ""),
      description: String(data.description ?? ""),
      category: String(data.category ?? "uncategorized"),
      order: Number(data.order ?? 0),
      content,
    });
  }

  return entries.sort((a, b) => {
    const catCmp = a.category.localeCompare(b.category);
    if (catCmp !== 0) return catCmp;
    return a.order - b.order;
  });
}

export function getEntryBySlug(slug: string): DictionaryEntry | null {
  const filename = slugToFilename(slug);
  if (!filename) return null;

  const filePath = path.join(dictionaryDir, filename);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    englishTitle: String(data["english-title"] ?? ""),
    farsiTitle: String(data["farsi-title"] ?? ""),
    description: String(data.description ?? ""),
    category: String(data.category ?? "uncategorized"),
    order: Number(data.order ?? 0),
    content,
  };
}

export function getEntrySlugs(): string[] {
  if (!fs.existsSync(dictionaryDir)) return [];

  return fs
    .readdirSync(dictionaryDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => filenameToSlug(f));
}
