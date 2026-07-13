import Link from "next/link";
import Image from "next/image";
import banner from "../_assets/frieren-2.avif";

export function DictionaryCard() {
  return (
    <Link
      href="/ai-dictionary"
      className="flex border group border-border justify-between flex-col-reverse sm:flex-row items-center overflow-hidden hover:border-yellow-700"
    >
      <div className="p-5 flex flex-col items-start md:p-7 w-full">
        <h3 className="font-semibold text-lg mb-2 flex flex-col ">
          واژه نامه ای برای کدنویسی با هوش مصنوعی
        </h3>
        <p className="text-secondary-foreground text">
          اینجا مفاهیم مرتبط با کدنویسی ایجنتیک رو به صورت ساده و خلاصه رو طبقه
          بندی کردم.
        </p>
      </div>
      <div className="sm:h-[270px] flex justify-center sm:block w-full relative">
        <div className="absolute left-0 right-0 bottom-0 top-0 z-5 bg-gradient-to-t via-black/30 from-black to-transparent" />
        <Image
          loading="eager"
          src={banner}
          alt="Frieren"
          width={300}
          height={300}
        />
      </div>
    </Link>
  );
}
