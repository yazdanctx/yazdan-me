"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

export function DictionaryBackButton() {
  return (
    <Link
      href="/t/wiki-ai"
      className="inline-flex items-center gap-2 text-sm text-secondary-foreground hover:text-foreground transition-colors"
    >
      <HiArrowRight />
      <span>بازگشت</span>
    </Link>
  );
}
