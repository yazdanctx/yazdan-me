import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

function convertObsidianImageWikilinks(content: string): string {
  return content.replace(/!\[\[([^\]]+\.\w+)\]\]/g, (_, filename: string) => {
    const encoded = filename.replace(/ /g, "%20");
    return `![${filename}](/assets/${encoded})`;
  });
}
import {
  getAllArticles,
  getArticleBySlug,
  getSeriesNavigation,
} from "@/lib/mdx";
import { notFound } from "next/navigation";
import { formatPersianDate } from "@/lib/date";

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      images: [`/og/${slug}.png`],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          {article.frontmatter.title}
        </h1>
        <p className="mt-2 text-sm">
          <time dateTime={article.frontmatter.date}>
            {formatPersianDate(article.frontmatter.date)}
          </time>
        </p>
        {article.frontmatter.description && (
          <p className="mt-4 text-lg">
            {article.frontmatter.description}
          </p>
        )}
      </header>
      <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-[#60a5fa] prose-a:underline-offset-4 prose-strong:text-[#fbbf24] prose-em:text-white prose-img:mx-auto prose-img:rounded-lg">
        <MDXRemote
          source={convertObsidianImageWikilinks(article.content)}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      <SeriesNav slug={slug} />
    </article>
  );
}

function SeriesNav({ slug }: { slug: string }) {
  const nav = getSeriesNavigation(slug);

  if (!nav) return null;

  return (
    <nav className="mt-12 flex items-center justify-between pt-6">
      {nav.prev ? (
        <div data-testid="series-prev">
          <Link
            href={`/b/${nav.prev.slug}`}
            className="text-sm hover:opacity-70 transition-opacity"
          >
            &rarr; {nav.prev.frontmatter.title}
          </Link>
        </div>
      ) : null}
      {nav.next ? (
        <div data-testid="series-next" className="mr-auto">
          <Link
            href={`/b/${nav.next.slug}`}
            className="text-sm hover:opacity-70 transition-opacity"
          >
            {nav.next.frontmatter.title} &larr;
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
