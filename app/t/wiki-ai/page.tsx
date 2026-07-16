import type { Metadata } from "next";
import Image from "next/image";
import frieren1 from "./_assets/frieren-1.avif";
import { Button } from "@/lib/components/ui/button";
import { ExternalLink } from "lucide-react";
import { getAllEntries } from "@/lib/dictionary";
import { DictionarySearch } from "@/lib/components/dictionary-search";

export const metadata: Metadata = {
  title: "AI Dictionary",
  description: "Searchable dictionary of AI terms.",
};

export default function DictionaryPage() {
  const entries = getAllEntries().map((e) => ({
    slug: e.slug,
    englishTitle: e.englishTitle,
    farsiTitle: e.farsiTitle,
    description: e.description,
    category: e.category,
    order: e.order,
    content: e.content,
  }));

  return (
    <div>
      <header>
        <div className="overflow-hidden md:flex md:items-center md:justify-between">
          <div className="w-full relative order-first md:order-last">
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
          <div className="w-full flex flex-col my-5 md:my-0 gap-2 items-start">
            <h1 className="font-semibold flex flex-col text text-xl md:text-4xl mb-2">
              <span>واژه نامه هوش مصنوعی</span>
            </h1>
            <p className="text-secondary-foreground text">
              اصطلاحات و مفاهیم پرکاربرد در ابزار های ایجنتیک، با زبان ساده و
              بدون پیچوندن مباحث.
            </p>
            <div className="flex items-center mt-2 gap-2">
              <Button asChild>
                <a
                  href="https://www.aihero.dev/ai-coding-dictionary"
                  target="_blank"
                  className="flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  رفرنس انگلیسی
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-1">
        <DictionarySearch entries={entries} />
      </div>
    </div>
  );
}
