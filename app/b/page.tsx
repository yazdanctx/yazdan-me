import type { Metadata } from "next";
import { getSeries, getStandaloneArticles } from "@/lib/mdx";
import { ArticleCard } from "@/lib/components/article-card";
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
    <div className="grid gap-10">
      <header className="">
        <section className="flex flex-col gap-3">
          <Image
            src={profileImage}
            alt="yazdanctx"
            width={90}
            height={90}
            className="rounded-full"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-base sm:text-lg">سلام! من یزدان هستم 👋</h1>
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
                  className=""
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
          <h2 className="mb-4 text-lg sm:text-xl font-semibold">{s.label}</h2>
          <div className="space-y-3">
            {s.articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ))}

      {standalone.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg sm:text-xl font-semibold">مقالات</h2>
          <div className="space-y-3">
            {standalone.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
