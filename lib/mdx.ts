import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
  published?: boolean;
  series?: string;
  part?: number;
  seriesLabel?: string;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const articles: Article[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(contentDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);

    const fm = data as ArticleFrontmatter;
    if (fm.published === false) continue;

    articles.push({
      slug,
      frontmatter: fm,
      content,
    });
  }

  return articles;
}

export interface Series {
  slug: string;
  label: string;
  articles: Article[];
}

export function getSeries(): Series[] {
  const articles = getAllArticles();
  const seriesMap = new Map<string, Article[]>();

  for (const article of articles) {
    if (!article.frontmatter.series) continue;
    const group = seriesMap.get(article.frontmatter.series) ?? [];
    group.push(article);
    seriesMap.set(article.frontmatter.series, group);
  }

  const series: Series[] = [];
  for (const [slug, group] of seriesMap) {
    group.sort((a, b) => (a.frontmatter.part ?? 0) - (b.frontmatter.part ?? 0));
    series.push({
      slug,
      label: group[0].frontmatter.seriesLabel ?? slug,
      articles: group,
    });
  }

  series.sort((a, b) => b.articles[0].frontmatter.date.localeCompare(a.articles[0].frontmatter.date));

  return series;
}

export function getStandaloneArticles(): Article[] {
  const articles = getAllArticles();
  return articles
    .filter((a) => !a.frontmatter.series)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getSeriesBySlug(slug: string): Series | null {
  const allSeries = getSeries();
  return allSeries.find((s) => s.slug === slug) ?? null;
}

export interface SeriesNavigation {
  prev: Article | null;
  next: Article | null;
}

export function getSeriesNavigation(slug: string): SeriesNavigation | null {
  const article = getArticleBySlug(slug);
  if (!article || !article.frontmatter.series) return null;

  const series = getSeriesBySlug(article.frontmatter.series);
  if (!series) return null;

  const index = series.articles.findIndex((a) => a.slug === slug);
  if (index === -1) return null;

  return {
    prev: index > 0 ? series.articles[index - 1] : null,
    next: index < series.articles.length - 1 ? series.articles[index + 1] : null,
  };
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  const fm = data as ArticleFrontmatter;
  if (fm.published === false) return null;

  return {
    slug,
    frontmatter: fm,
    content,
  };
}
