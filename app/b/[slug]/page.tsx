import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllArticles,
  getArticleBySlug,
  getSeriesNavigation,
} from "@/lib/mdx";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
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
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {article.frontmatter.title}
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          <time dateTime={article.frontmatter.date}>
            {article.frontmatter.date}
          </time>
        </p>
        {article.frontmatter.description && (
          <p className="mt-4 text-lg text-gray-300">
            {article.frontmatter.description}
          </p>
        )}
      </header>
      <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-gray-300 prose-strong:text-white prose-code:text-gray-200">
        <MDXRemote source={article.content} />
      </div>

      <SeriesNav slug={slug} />
    </article>
  );
}

function SeriesNav({ slug }: { slug: string }) {
  const nav = getSeriesNavigation(slug);

  if (!nav) return null;

  return (
    <nav className="mt-12 flex items-center justify-between border-t border-gray-800 pt-6">
      {nav.prev ? (
        <div data-testid="series-prev">
          <Link
            href={`/b/${nav.prev.slug}`}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            &larr; {nav.prev.frontmatter.title}
          </Link>
        </div>
      ) : null}
      {nav.next ? (
        <div data-testid="series-next" className="ml-auto">
          <Link
            href={`/b/${nav.next.slug}`}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {nav.next.frontmatter.title} &rarr;
          </Link>
        </div>
      ) : null}
    </nav>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
  };
}
