import type { Metadata } from "next";
import {
  getSeries,
  getStandaloneArticles,
  getDraftArticles,
  isDev,
} from "@/lib/mdx";
import { ArticleSection } from "@/lib/components/article-section";
import Image from "next/image";
import profileImage from "./_assets/profile.jpg";
import { socialLinks } from "@/lib/social-links";
import { DictionaryCard } from "./ai-dictionary/_components/dictionary-card";

export const metadata: Metadata = {
  openGraph: {
    images: ["/og/default.png"],
  },
};

export default function Page() {
  const series = getSeries();
  const standalone = getStandaloneArticles();
  const drafts = isDev() ? getDraftArticles() : [];

  return (
    <div className="grid gap-10">
      <header className="">
        <section className="flex flex-col gap-3">
          <Image
            src={profileImage}
            alt="yazdanctx"
            width={90}
            height={90}
            className="max-w-[90px]"
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
                  className="link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </header>

      <section>
        <h2 className="mb-4 text-lg sm:text-xl font-semibold">ابزار ها</h2>
        <DictionaryCard />
      </section>

      {series.map((s) => (
        <ArticleSection key={s.slug} title={s.label} articles={s.articles} />
      ))}

      {standalone.length > 0 && (
        <ArticleSection title="مقالات" articles={standalone} />
      )}

      {drafts.length > 0 && (
        <ArticleSection title="پیش‌نویس‌ها" articles={drafts} />
      )}
    </div>
  );
}
