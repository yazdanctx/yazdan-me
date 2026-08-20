import { ArrowUpLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecommendationLink as Link } from "../_lib/recommendations";
import { LinkIcon, linkIconColor } from "./link-icon";

export function RecommendationLink({
  title,
  url,
  description,
  hostname,
  index,
}: Link) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted"
    >
      <span className="flex size-6 shrink-0 items-center justify-center pt-0.5">
        {index === null ? (
          <LinkIcon
            hostname={hostname}
            className={cn("size-4", linkIconColor(hostname))}
          />
        ) : (
          <span className="text-xs tabular-nums text-muted-foreground group-hover:text-secondary-foreground">
            {index}
          </span>
        )}
      </span>

      {/* items-start keeps each line hugging the row start, while dir="auto"
          lets latin titles lay out left-to-right inside their own box. */}
      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <span className="font-medium group-hover:text-yellow-600" dir="auto">
          {title}
        </span>
        {description && (
          <span className="text-sm text-secondary-foreground" dir="auto">
            {description}
          </span>
        )}
      </span>

      <span className="hidden shrink-0 items-center gap-2 pt-1 sm:flex">
        <span className="font-mono text-[11px] text-muted-foreground" dir="ltr">
          {hostname}
        </span>
        <ArrowUpLeft className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
    </a>
  );
}
