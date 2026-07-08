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
