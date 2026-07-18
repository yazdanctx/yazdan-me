import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

const dictDir = path.join(process.cwd(), "app/t/wiki-ai/dictionary");
const cachePath = path.join(process.cwd(), ".next/dictionary-html.json");

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify);

export function compileDictionaryContent(content: string): string {
  const result = processor.processSync(content);
  return String(result);
}

export function getCompiledDictionaryHtml(): Record<string, string> {
  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, "utf-8"));
  }

  const files = fs.readdirSync(dictDir).filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx"),
  );

  const htmlMap: Record<string, string> = {};

  for (const file of files) {
    const source = fs.readFileSync(path.join(dictDir, file), "utf-8");
    const { content } = matter(source);
    const slug = file.replace(/\.mdx?$/, "").toLowerCase().replace(/ /g, "-");
    htmlMap[slug] = compileDictionaryContent(content);
  }

  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(htmlMap));

  return htmlMap;
}
