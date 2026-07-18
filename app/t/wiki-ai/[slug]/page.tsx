import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { notFound } from "next/navigation";
import { getAllEntries, getEntryBySlug, getEntrySlugs } from "@/lib/dictionary";
import { CodeBlockEnhancer } from "@/lib/components/code-block-enhancer";
import { DictionaryNav } from "../_components/dictionary-nav";
import { DictionaryActions } from "../_components/dictionary-actions";

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
    currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  return (
    <article className="grid gap-6">
      <DictionaryActions slug={slug} content={entry.content} />

      <header className="grid gap-2 p-5 md:p-10 border border-border">
        <h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
          {entry.englishTitle}
        </h1>
        <p className="text-sm sm:text-base text-secondary-foreground">
          {entry.description}
        </p>
      </header>

      <div className="prose prose-invert max-w-none overflow-hidden prose-headings:text-stone-200 prose-em:text-stone-200 prose-code:text-yellow-700 prose-img:w-full">
        <CodeBlockEnhancer>
          <MDXRemote
            source={entry.content}
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
        prev={
          prev ? { slug: prev.slug, englishTitle: prev.englishTitle } : null
        }
        next={
          next ? { slug: next.slug, englishTitle: next.englishTitle } : null
        }
      />
    </article>
  );
}
