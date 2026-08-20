import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
  title: "مطالب پیشنهادی",
  description: "پادکست ها و مطالبی که گوش میدم و میخونم.",
  openGraph: {
    images: ["/og/default.png"],
  },
};

export default function RecommendationsPage() {
  const source = fs.readFileSync(
    path.join(process.cwd(), "app/r/recommendations.md"),
    "utf-8",
  );

  return (
    <article className="grid gap-6">
      <h1 className="text-xl sm:text-3xl font-semibold">مطالب پیشنهادی</h1>

      <div className="prose prose-invert max-w-none prose-headings:text-stone-200">
        <MDXRemote
          source={source}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
