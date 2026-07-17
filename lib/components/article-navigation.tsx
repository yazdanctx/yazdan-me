import Link from "next/link";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import type { Article } from "@/lib/mdx";

export function ArticleNavigation({
  prev,
  next,
}: {
  prev: Article | null;
  next: Article | null;
}) {
  if (!prev && !next) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-8">
      {next ? (
        <Link
          href={`/b/${next.slug}`}
          className="flex items-center gap-3 p-5 bg-muted border border-muted hover:border-yellow-700"
        >
          <HiChevronRight className="shrink-0" />
          <div className="grid gap-1">
            <span className="text-xs text-secondary-foreground">بعدی</span>
            <span className="font-medium">{next.frontmatter.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {prev ? (
        <Link
          href={`/b/${prev.slug}`}
          className="flex items-center gap-3 p-5 bg-muted border border-muted hover:border-yellow-700 justify-end text-right"
        >
          <div className="grid gap-1">
            <span className="text-xs text-secondary-foreground">قبلی</span>
            <span className="font-medium">{prev.frontmatter.title}</span>
          </div>
          <HiChevronLeft className="shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
