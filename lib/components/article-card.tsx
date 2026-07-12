import Link from "next/link";
import type { Article } from "@/lib/mdx";
import { formatPersianDate } from "@/lib/date";
import { cn } from "../utils";

export function ArticleCard({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  return (
    <Link
      href={`/b/${article.slug}`}
      className="block cursor-pointer hover:bg-muted"
    >
      <article className={cn(className, "p-5 md:p-7")}>
        <div className="flex items-center justify-between w-full">
          <h3>
            {article.frontmatter.part && (
              <span>قسمت {article.frontmatter.part} - </span>
            )}
            {article.frontmatter.title}
          </h3>

          <time
            className="px-2 text-sm py-1 bg-muted text-secondary-foreground hidden md:block"
            dateTime={article.frontmatter.date}
          >
            {formatPersianDate(article.frontmatter.date)}
          </time>
        </div>

        <div>
          <p className="text-secondary-foreground">
            {article.frontmatter.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
