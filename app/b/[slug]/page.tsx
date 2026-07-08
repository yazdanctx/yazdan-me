import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
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
    </article>
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
