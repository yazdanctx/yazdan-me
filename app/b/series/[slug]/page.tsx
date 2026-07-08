import Link from "next/link";
import { getSeries, getSeriesBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";

export function generateStaticParams() {
  const allSeries = getSeries();
  return allSeries.map((s) => ({
    slug: s.slug,
  }));
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
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          &larr; Back to blog
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
          {series.label}
        </h1>
        <p className="mt-2 text-gray-400">{series.articles.length} parts</p>
      </header>

      <div className="space-y-3">
        {series.articles.map((article) => (
          <Card key={article.slug}>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">
                <Link
                  href={`/b/${article.slug}`}
                  data-testid="series-part-link"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  <span className="mr-2 text-xs font-normal text-gray-500">
                    Part {article.frontmatter.part}
                  </span>
                  {article.frontmatter.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-400">
                {article.frontmatter.description}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                <time dateTime={article.frontmatter.date}>
                  {article.frontmatter.date}
                </time>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) return {};

  return {
    title: series.label,
    description: `${series.articles.length} part series`,
  };
}
