import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEntries, getEntryBySlug } from "@/lib/entries";
import { Markdown } from "@/app/markdown";

export function generateStaticParams() {
  return getAllEntries().map((entry) => ({ slug: entry.slug }));
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) notFound();

  return (
    <main>
      <Link
        href="/"
        className="text-sm text-zinc-400 hover:text-white transition-colors"
      >
        ← بازگشت
      </Link>

      <article className="mt-6">
        <h1 className="text-2xl font-bold">{entry.title}</h1>

        <div className="mt-2 text-sm text-zinc-400 space-x-4">
          <span>آخرین بروزرسانی: {entry.lastUpdated}</span>
          <a
            href={entry.author}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            منبع
          </a>
        </div>

        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors"
        >
          برو به پلتفرم
        </a>

        <div className="mt-6 leading-relaxed">
          <Markdown content={entry.content} />
        </div>
      </article>
    </main>
  );
}
