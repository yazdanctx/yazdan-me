"use client";

import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi2";

export function DictionaryBackButton() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/t/wiki-ai");
    }
  }

  return (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-2 text-sm text-secondary-foreground hover:text-foreground transition-colors"
    >
      <HiArrowRight />
      <span>بازگشت</span>
    </button>
  );
}
