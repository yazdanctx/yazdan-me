import Image from "next/image";
import frieren1 from "./_assets/frieren-1.avif";
import { Button } from "@/lib/components/ui/button";
import { FiGithub } from "react-icons/fi";
import { ExternalLink } from "lucide-react";

export default function DictionaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <div className="overflow-hidden md:flex md:items-center md:justify-between">
          <div className="w-full flex flex-col gap-2 items-start">
            <h1 className="font-semibold flex flex-col text text-xl md:text-4xl mb-2">
              <span>واژه نامه هوش مصنوعی</span>
            </h1>
            <p className="text-secondary-foreground text">
              اصطلاحات و مفاهیم پرکاربرد در ابزار های ایجنتیک، با زبان ساده و
              بدون پیچوندن مباحث.
            </p>
            <div className="flex items-center gap-2">
              <Button asChild>
                <a
                  href="https://www.aihero.dev/ai-coding-dictionary"
                  className="flex items-center gap-1"
                >
                  <FiGithub />
                  سورس گیتهاب
                </a>
              </Button>

              <Button variant="ghost" asChild>
                <a
                  href="https://github.com/yazdanctx/yazdan-me/app/ai-dictionary"
                  className="flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  رفرنس انگلیسی
                </a>
              </Button>
            </div>
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

      <div className="mt-1">{children}</div>
    </div>
  );
}
