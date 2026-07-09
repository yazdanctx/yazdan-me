"use client";

import { useState } from "react";
import { Copy, Github, Check } from "lucide-react";
import { Button } from "@/lib/components/ui/button";

export function ArticleActions({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://github.com/yazdanctx/yazdan-me/blob/main/content/${slug}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="gap-2"
        >
          <Github className="size-4" />
          Source
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => {
          navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
