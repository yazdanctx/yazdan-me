import Link from "next/link";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

interface NavEntry {
  slug: string;
  englishTitle: string;
}

interface DictionaryNavProps {
  prev: NavEntry | null;
  next: NavEntry | null;
}

export function DictionaryNav({ prev, next }: DictionaryNavProps) {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {prev ? (
        <Link
          href={`/ai-dictionary/${prev.slug}`}
          className="flex items-center gap-3 p-5 bg-muted border border-muted hover:border-yellow-700"
        >
          <HiChevronRight className="shrink-0" />
          <div className="grid gap-1">
            <span className="text-xs text-secondary-foreground">قبلی</span>
            <span className="font-medium">{prev.englishTitle}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/ai-dictionary/${next.slug}`}
          className="flex items-center gap-3 p-5 bg-muted border border-muted hover:border-yellow-700 justify-end text-right"
        >
          <div className="grid gap-1">
            <span className="text-xs text-secondary-foreground">بعدی</span>
            <span className="font-medium">{next.englishTitle}</span>
          </div>
          <HiChevronLeft className="shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
