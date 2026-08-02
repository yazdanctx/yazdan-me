import Link from "next/link";
import Image from "next/image";
const banner = "/assets/etc/pomodorus.avif";

export function PomodorusCard() {
  return (
    <Link
      href="https://pomodorus.yazdan.me"
      target="_blank"
      rel="noopener noreferrer"
      className="flex border group border-border flex-col-reverse overflow-hidden hover:border-yellow-700"
    >
      <div className="p-5 flex flex-col items-start md:p-7 w-full">
        <h3 className="font-semibold text-lg mb-2 flex flex-col ">پومودوروس</h3>
        <p className="text-secondary-foreground text">
          یه اپ پومودوروی خیلی مینیمال که برای استفاده شخصی خودم ساختم.
        </p>
      </div>
      <div className="w-full relative">
        <div className="absolute left-0 right-0 bottom-0 top-0 z-5 bg-gradient-to-t  from-black to-transparent" />
        <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
          <Image
            loading="eager"
            src={banner}
            alt="Pomodorus"
            width={832}
            height={830}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </Link>
  );
}
