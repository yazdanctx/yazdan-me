import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { Article } from "@/lib/mdx";
import { Button } from "@/lib/components/ui/button";

function NavButton({
  article,
  direction,
}: {
  article: Article;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";

  return (
    <Button variant="outline" asChild>
      <Link href={`/b/${article.slug}`} className="link gap-2">
        {isPrev && <ChevronRight className="size-4 shrink-0" />}
        <span className="truncate max-w-28 sm:max-w-40">{article.frontmatter.title}</span>
        {!isPrev && <ChevronLeft className="size-4 shrink-0" />}
      </Link>
    </Button>
  );
}

export function ArticleNavigation({
  prev,
  next,
}: {
  prev: Article | null;
  next: Article | null;
}) {
  if (!prev && !next) return null;

  return (
    <div className="flex items-center justify-between">
      <div>{prev ? <NavButton article={prev} direction="prev" /> : null}</div>
      <div>{next ? <NavButton article={next} direction="next" /> : null}</div>
    </div>
  );
}
