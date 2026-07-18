"use client";

import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi2";

export function DictionaryBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm text-secondary-foreground hover:text-foreground transition-colors"
    >
      <HiArrowRight />
      <span>بازگشت</span>
    </button>
  );
}
