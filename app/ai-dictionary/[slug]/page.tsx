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

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return { title, description: entry.description };
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

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const processedContent = rewriteWikiLinks(entry.content);

  return (
    <article className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {entry.description && (
          <p className="text-sm sm:text-base text-secondary-foreground">
            {entry.description}
          </p>
        )}
      </header>

      <div className="prose prose-invert max-w-none prose-headings:text-stone-200 prose-em:text-stone-200 prose-code:text-yellow-700 prose-img:w-full">
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
    </article>
  );
}
