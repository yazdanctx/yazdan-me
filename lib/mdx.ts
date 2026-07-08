import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
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

    articles.push({
      slug,
      frontmatter: data as ArticleFrontmatter,
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

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}
