import Image from "next/image";
import { getAllEntries } from "@/lib/entries";
import { Markdown } from "@/app/markdown";
import headerImage from "@/app/assets/frame.jpg";

export default function Home() {
  const entries = getAllEntries();

  return (
    <main>
      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-8 lg:self-start text-center lg:text-right">
          <Image
            src={headerImage}
            priority
            className="rounded-lg mb-4"
            alt="yazdan!"
          />
          <h1 className="text-2xl">
            هدف اینجا دسترسی رایگان و آسان به هوش مصنوعیه
          </h1>
          <div className="font-light text-stone-300 mt-4">
            <p></p>
            <p className="mt-4">
              بچهای کامیونیتی اینور اونور API های رایگان هوش مصنوعی رو میذارن.
              فعلا اینجارو برای دسترسی ساده تر درست کردم و منابع خوبی رو که
              ببینم میذارم.
            </p>
            <p className="mt-4">
              اینایی که اینجا هست رو خودم تست کردم و دسترسی گرفتم.
            </p>
            <p className="mt-4">
              یه سری آموزش و داکیومنت هم برای دسترسی به مدل های رایگان یا ارزون
              چینی دارم آماده میکنم که به زودی میذارم اینجا.
            </p>
            <p className="mt-4">
              اگه خواستی چیزی اضافه کنی یه pull request به{" "}
              <a
                href="https://github.com/yazdanctx/free-ai"
                className="text-blue-400"
                target="_blank"
              >
                اینجا
              </a>{" "}
              بزن، ماچ به کله ات 💋
            </p>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 w-full space-y-6">
          {entries.map((entry) => (
            <div
              key={entry.slug}
              className="p-4 rounded-lg border border-zinc-800"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{entry.title}</h2>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    entry.tested
                      ? "bg-green-900/50 text-green-400"
                      : "bg-red-900/50 text-red-400"
                  }`}
                >
                  {entry.tested ? "تست شده" : "تست نشده"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                آخرین بروزرسانی: {entry.lastUpdated}
              </p>

              <div className="mt-3 leading-relaxed text-sm text-stone-300 font-light">
                <Markdown content={entry.content} />
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-3 text-sm">
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  رفتن به پلتفرم
                </a>
                <a
                  href={entry.author}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  منبع
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
