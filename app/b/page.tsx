import Link from "next/link";
import { getSeries, getStandaloneArticles } from "@/lib/mdx";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";

export default function BlogIndex() {
  const series = getSeries();
  const standalone = getStandaloneArticles();

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white">Blog</h1>
        <p className="mt-2 text-gray-400">Technical articles and guides</p>
      </header>

      {series.map((s) => (
        <section key={s.slug} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-white">{s.label}</h2>
          <div className="space-y-3">
            {s.articles.map((article) => (
              <Card key={article.slug}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">
                    <Link
                      href={`/b/${article.slug}`}
                      className="text-gray-100 hover:text-white transition-colors"
                    >
                      {article.frontmatter.part && (
                        <span className="mr-2 text-xs font-normal text-gray-500">
                          Part {article.frontmatter.part}
                        </span>
                      )}
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
        </section>
      ))}

      {standalone.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Articles</h2>
          <div className="space-y-3">
            {standalone.map((article) => (
              <Card key={article.slug}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">
                    <Link
                      href={`/b/${article.slug}`}
                      className="text-gray-100 hover:text-white transition-colors"
                    >
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
        </section>
      )}
    </div>
  );
}
