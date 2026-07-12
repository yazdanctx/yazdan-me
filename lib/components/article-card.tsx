import Link from "next/link";
import type { Article } from "@/lib/mdx";
import { formatPersianDate } from "@/lib/date";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article>
      <h3>
        <Link href={`/b/${article.slug}`} className="link block">
          {article.frontmatter.part && (
            <span>قسمت {article.frontmatter.part} - </span>
          )}
          {article.frontmatter.title}
        </Link>
      </h3>
      <div className="pr-5">
        <p className="text-secondary-foreground">
          {article.frontmatter.description}
        </p>
        <p className="text-secondary-foreground">
          <time dateTime={article.frontmatter.date}>
            {formatPersianDate(article.frontmatter.date)}
          </time>
        </p>
      </div>
    </article>
  );
}
