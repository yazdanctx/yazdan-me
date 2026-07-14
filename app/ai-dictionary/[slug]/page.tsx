import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { notFound } from "next/navigation";
import {
  getAllEntries,
  getEntryBySlug,
  getEntrySlugs,
} from "@/lib/dictionary";
import { CodeBlockEnhancer } from "@/lib/components/code-block-enhancer";
import { DictionaryNav } from "../_components/dictionary-nav";
import { DictionaryBackButton } from "../_components/dictionary-back-button";

export function generateStaticParams() {
  return getEntrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) return {};

  return { title: entry.englishTitle, description: entry.description };
}

function rewriteWikiLinks(content: string): string {
  return content.replace(
    /\]\(\.\/((?:[^)"]+|%.+)*)\.md(x)?\)/g,
    (_, filename: string) => {
      const decoded = decodeURIComponent(filename);
      const linkSlug = decoded
        .toLowerCase()
        .replace(/ /g, "-");
      return `](/ai-dictionary/${linkSlug})`;
    },
  );
}

export default async function DictionaryEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) notFound();

  const allEntries = getAllEntries();
  const currentIndex = allEntries.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const next =
    currentIndex < allEntries.length - 1
      ? allEntries[currentIndex + 1]
      : null;

  const processedContent = rewriteWikiLinks(entry.content);

  return (
    <article className="grid gap-6">
      <DictionaryBackButton />

      <header className="grid gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          {entry.englishTitle}
          {entry.farsiTitle && <span className="text-sm sm:text-base text-secondary-foreground">({entry.farsiTitle})</span>}
        </h1>
      </header>

      <div className="prose prose-invert max-w-none overflow-hidden prose-headings:text-stone-200 prose-em:text-stone-200 prose-code:text-yellow-700 prose-img:w-full">
        <CodeBlockEnhancer>
          <MDXRemote
            source={processedContent}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </CodeBlockEnhancer>
      </div>

      <DictionaryNav
        prev={prev ? { slug: prev.slug, englishTitle: prev.englishTitle } : null}
        next={next ? { slug: next.slug, englishTitle: next.englishTitle } : null}
      />
    </article>
  );
}
