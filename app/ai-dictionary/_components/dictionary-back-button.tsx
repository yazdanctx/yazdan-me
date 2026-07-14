"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiArrowRight } from "react-icons/hi2";

export function DictionaryBackButton() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const href = q ? `/ai-dictionary?q=${encodeURIComponent(q)}` : "/ai-dictionary";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-secondary-foreground hover:text-foreground transition-colors"
    >
      <HiArrowRight />
      <span>بازگشت</span>
    </Link>
  );
}
