"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Copy, Check, ArrowBigRight } from "lucide-react";
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
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          document.referrer ? router.back() : router.push("/t/wiki-ai")
        }
      >
        <ArrowBigRight size={16} />
      </Button>

      <Button
        variant="outline"
        className="gap-2"
        onClick={() =>
          window.open(
            `https://github.com/yazdanctx/yazdan-me/blob/main/app/t/wiki-ai/dictionary/${slug}.md`,
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
