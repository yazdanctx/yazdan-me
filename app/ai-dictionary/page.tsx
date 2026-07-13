import type { Metadata } from "next";
import { getAllEntries } from "@/lib/dictionary";
import { DictionarySearch } from "@/lib/components/dictionary-search";
import Image from "next/image";
import frieren1 from "./_assets/frieren-1.avif";
import { Button } from "@/lib/components/ui/button";
import { FiGithub } from "react-icons/fi";

export const metadata: Metadata = {
  title: "AI Dictionary",
  description: "Searchable dictionary of AI terms.",
};

export default function DictionaryPage() {
  const entries = getAllEntries().map((e) => ({
    slug: e.slug,
    title: e.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: e.description,
    content: e.content,
  }));

  return (
    <div>
      <header>
        <div className="overflow-hidden md:flex md:items-center md:justify-between">
          <div className="w-full flex flex-col gap-2 items-start">
            <h1 className="font-semibold flex flex-col text text-xl md:text-4xl mb-2">
              <span>واژه نامه هوش مصنوعی</span>
              <span>برای برنامه نویس ها</span>
            </h1>
            <p className="text-secondary-foreground text">
              اصطلاحات و مفاهیم پرکاربرد در کدنویسی ایجنتیک، با زبان ساده و بدون
              پیچوندن مباحث.
            </p>
            <Button asChild>
              <a
                href="https://github.com/yazdanctx/yazdan-me/app/ai-dictionary"
                className="flex items-center gap-1"
              >
                <FiGithub />
                سورس گیتهاب
              </a>
            </Button>
          </div>
          <div className="w-full relative">
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-5" />

            <Image
              src={frieren1}
              alt="Frieren"
              width={300}
              height={300}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
      </header>

      <div className="mt-1">
        <DictionarySearch entries={entries} />
      </div>
    </div>
  );
}
