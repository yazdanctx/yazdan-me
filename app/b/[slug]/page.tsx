import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

function convertObsidianImageWikilinks(content: string): string {
  return content.replace(/!\[\[([^\]]+\.\w+)\]\]/g, (_, filename: string) => {
    const encoded = filename.replace(/ /g, "%20");
    return `![${filename}](/assets/${encoded})`;
  });
}
import {
  getAllArticles,
  getArticleBySlug,
  extractToc,
  getArticleNavigation,
  getSeriesNavigation,
} from "@/lib/mdx";
import { notFound } from "next/navigation";
import { formatPersianDate } from "@/lib/date";
import { TableOfContents } from "@/lib/components/toc";
import { ArticleNavigation } from "@/lib/components/article-navigation";

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

  const toc = extractToc(article.content);
  const seriesNav = getSeriesNavigation(slug);
  const nav = seriesNav ?? getArticleNavigation(slug);

  return (
    <article className="grid gap-10">
      <header className="grid gap-3">
        <div className="flex items-center gap-3 flex">
          <h1 className="text-3xl font-bold tracking-tight">
            {article.frontmatter.title}
          </h1>
          <time
            dateTime={article.frontmatter.date}
            className="text-sm px-1 py-0.5 bg-muted text-secondary-foreground"
          >
            {formatPersianDate(article.frontmatter.date)}
          </time>
        </div>
        {article.frontmatter.description && (
          <p className="text-lg">{article.frontmatter.description}</p>
        )}
        <TableOfContents items={toc} />
      </header>

      <div className="prose prose-invert max-w-none prose-headings:text-stone-200 prose-strong:text-yellow-600 prose-em:text-stone-200 prose-img:mx-auto prose-img:rounded-lg">
        <MDXRemote
          source={convertObsidianImageWikilinks(article.content)}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      {nav ? <ArticleNavigation prev={nav.prev} next={nav.next} /> : null}
    </article>
  );
}
