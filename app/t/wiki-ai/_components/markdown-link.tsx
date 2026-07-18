"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export function MarkdownLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";

  if (href.startsWith("/") || href.startsWith("https://yazdan.me")) {
    const path = href.startsWith("https://yazdan.me")
      ? href.replace("https://yazdan.me", "")
      : href;

    return <Link {...props} href={path} />;
  }

  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
