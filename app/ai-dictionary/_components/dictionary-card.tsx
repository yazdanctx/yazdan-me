import Link from "next/link";
import Image from "next/image";
import banner from "../_assets/main-banner.avif";

export function DictionaryCard() {
  return (
    <Link
      href="/ai-dictionary"
      className="flex border group border-border justify-between flex-col-reverse sm:flex-row items-center overflow-hidden hover:border-orange-600"
    >
      <div className="p-5 md:p-7 w-full">
        <h3 className="font-semibold text-xl mb-2">دایره‌المعارف هوش مصنوعی</h3>
        <p className="text-secondary-foreground text">
          واژه‌نامه‌ای ساده و کاربردی برای یادگیری مفاهیم پایه هوش مصنوعی
        </p>
      </div>
      <div className="sm:h-[270px] flex justify-center sm:block w-full relative">
        <div className="absolute left-0 right-0 bottom-0 top-0 z-5 bg-gradient-to-t from-black to-transparent" />
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
