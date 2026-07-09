"use client";

import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/lib/components/ui/button";

export function ArticleActions({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://github.com/yazdanctx/yazdan-me/blob/main/content/${slug}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="gap-2"
        >
          <ExternalLink className="size-4" />
          سورس
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => navigator.clipboard.writeText(content)}
      >
        <Copy className="size-4" />
        کپی مطلب
      </Button>
    </div>
  );
}
