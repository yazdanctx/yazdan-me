"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Copy,
  Check,
  MoveRightIcon,
  MoveRight,
  Redo2,
  ArrowBigRight,
} from "lucide-react";
import { HiArrowRight } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";
import { Button } from "@/lib/components/ui/button";

export function DictionaryActions({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button asChild size="icon" variant="outline">
        <Link href="/ai-dictionary">
          <ArrowBigRight size={16} />
        </Link>
      </Button>

      <Button
        variant="outline"
        className="gap-2"
        onClick={() =>
          window.open(
            `https://github.com/yazdanctx/yazdan-me/blob/main/app/ai-dictionary/dictionary/${slug}.md`,
            "_blank",
          )
        }
      >
        <FiGithub />
        سورس گیتهاب
      </Button>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => {
          navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "کپی شد" : "کپی کردن صفحه"}
      </Button>
    </div>
  );
}
