import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const contentDir = path.join(process.cwd(), "content");

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
  published?: boolean;
  series?: string;
  part?: number;
  seriesLabel?: string;
  banner?: string;
}

export interface TocEntry {
  value: string;
  depth: number;
  id: string;
  children: TocEntry[];
}

function cleanHeading(text: string): string {
  return text.replace(/(\*\*|__|`|~~|[*_])/g, "").trim();
}

export function extractToc(content: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = cleanHeading(match[2]);
    const id = slugger.slug(text);
    headings.push({ level, text, id });
  }

  const root: TocEntry[] = [];
  const stack: TocEntry[] = [];

  for (const h of headings) {
    const entry: TocEntry = {
      value: h.text,
      depth: h.level,
      id: h.id,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= h.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(entry);
    } else {
      stack[stack.length - 1].children.push(entry);
    }

    stack.push(entry);
  }

  return root;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

function normalizePublished(value: unknown): boolean | undefined {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return undefined;
}

function normalizeFrontmatter(data: Record<string, unknown>): ArticleFrontmatter {
  const fm = data as unknown as Record<string, unknown>;
  return {
    title: String(fm.title ?? ""),
    date: String(fm.date ?? ""),
    description: String(fm.description ?? ""),
    published: normalizePublished(fm.published),
    series: fm.series as string | undefined,
    part: fm.part as number | undefined,
    seriesLabel: fm.seriesLabel as string | undefined,
    banner: fm.banner as string | undefined,
  };
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

    const fm = normalizeFrontmatter(data);
    if (fm.published === false) continue;

    articles.push({
      slug,
      frontmatter: fm,
      content,
    });
  }

  return articles;
}

export function getDraftArticles(): Article[] {
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

    const fm = normalizeFrontmatter(data);
    if (fm.published !== false) continue;

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

export function getArticleNavigation(slug: string): {
  prev: Article | null;
  next: Article | null;
} | null {
  const article = getArticleBySlug(slug);
  if (!article || article.frontmatter.published === false) return null;

  const articles = getAllArticles();
  articles.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );

  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return null;

  return {
    prev: index < articles.length - 1 ? articles[index + 1] : null,
    next: index > 0 ? articles[index - 1] : null,
  };
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  const fm = normalizeFrontmatter(data);
  if (fm.published === false && !isDev()) return null;

  return {
    slug,
    frontmatter: fm,
    content,
  };
}
