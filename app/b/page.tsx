import type { Metadata } from "next";
import Link from "next/link";
import { getSeries, getStandaloneArticles } from "@/lib/mdx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { formatPersianDate } from "@/lib/date";
import Image from "next/image";
import profileImage from "../_assets/profile.jpg";
import { socialLinks } from "@/lib/social-links";

export const metadata: Metadata = {
  openGraph: {
    images: ["/og/default.png"],
  },
};

export default function BlogIndex() {
  const series = getSeries();
  const standalone = getStandaloneArticles();

  return (
    <div>
      <header className="mb-12">
        <section className="flex flex-col gap-3">
          <Image
            src={profileImage}
            alt=""
            width={90}
            height={90}
            className="rounded-full"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-lg">سلام! من یزدان هستم 👋</h1>
            <p>
              به امنیت، شبکه و برنامه نویسی علاقه دارم. دچار سندرم آسپرگر هستم و
              ارتباط با آدم ها برام چالش برانگیزه در نتیجه بیشتر زمانم روی پای
              کامپیوتر و یادگیری میگذرونم. اینجا از خودم و چیزایی که یاد میگیرم
              مینویسم. اگر باهام کار داشتی از طریق چنل تلگرامم بهم مسج بده،
              معمولا خیلی زود جواب میدم.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </header>

      {series.map((s) => (
        <section key={s.slug} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">{s.label}</h2>
          <div className="space-y-3">
            {s.articles.map((article) => (
              <Link
                key={article.slug}
                href={`/b/${article.slug}`}
                className="block"
              >
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">
                      {article.frontmatter.part && (
                        <span className="ml-2 font-normal">
                          بخش {article.frontmatter.part}
                        </span>
                      )}
                      {article.frontmatter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p>{article.frontmatter.description}</p>
                    <p className="mt-2">
                      <time dateTime={article.frontmatter.date}>
                        {formatPersianDate(article.frontmatter.date)}
                      </time>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {standalone.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">مقالات</h2>
          <div className="space-y-3">
            {standalone.map((article) => (
              <Link
                key={article.slug}
                href={`/b/${article.slug}`}
                className="block"
              >
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">
                      {article.frontmatter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p>{article.frontmatter.description}</p>
                    <p className="mt-1">
                      <time dateTime={article.frontmatter.date}>
                        {formatPersianDate(article.frontmatter.date)}
                      </time>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
