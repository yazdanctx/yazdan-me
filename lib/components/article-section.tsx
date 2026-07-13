import type { Article } from "@/lib/mdx";
import { ArticleCard } from "./article-card";

export function ArticleSection({
  title,
  articles,
}: {
  title: string;
  articles: Article[];
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg sm:text-2xl font-semibold">{title}</h2>
      <div className="border border-border">
        {articles.map((article, i) => (
          <ArticleCard
            key={article.slug}
            article={article}
            className={i < articles.length - 1 ? "border-b border-border" : ""}
          />
        ))}
      </div>
    </section>
  );
}
