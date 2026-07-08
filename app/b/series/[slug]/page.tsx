import Link from "next/link";
import type { Metadata } from "next";
import { getSeries, getSeriesBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { formatPersianDate } from "@/lib/date";

export function generateStaticParams() {
  const allSeries = getSeries();
  return allSeries.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) return {};

  return {
    title: series.label,
    description: `مجموعه ${series.articles.length} قسمتی`,
    openGraph: {
      images: ["/og/default.png"],
    },
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  return (
    <div>
      <header className="mb-10">
        <Link
          href="/b/"
          className="text-sm hover:opacity-70 transition-opacity"
        >
          &rarr; بازگشت به وبلاگ
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {series.label}
        </h1>
        <p className="mt-2">{series.articles.length} بخش</p>
      </header>

      <div className="space-y-3">
        {series.articles.map((article) => (
          <Link key={article.slug} href={`/b/${article.slug}`} data-testid="series-part-link" className="block hover:opacity-70 transition-opacity">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">
                  <span className="ml-2 text-xs font-normal">
                    بخش {article.frontmatter.part}
                  </span>
                  {article.frontmatter.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">
                  {article.frontmatter.description}
                </p>
                <p className="mt-1 text-xs">
                  <time dateTime={article.frontmatter.date}>
                    {formatPersianDate(article.frontmatter.date)}
                  </time>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
