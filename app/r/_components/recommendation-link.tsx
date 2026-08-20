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
      className="flex items-start gap-3 px-4 py-3 hover:bg-muted"
    >
      <span className="flex size-6 shrink-0 items-center justify-center pt-0.5">
        {index === null ? (
          <LinkIcon
            hostname={hostname}
            className={cn("size-4", linkIconColor(hostname))}
          />
        ) : (
          <span className="text-xs tabular-nums text-muted-foreground">
            {index}
          </span>
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <span className="font-medium" dir="auto">
          {title}
        </span>
        {description && (
          <span className="text-sm text-secondary-foreground" dir="auto">
            {description}
          </span>
        )}
      </span>

      <span
        className="hidden shrink-0 pt-1 font-mono text-[11px] text-muted-foreground sm:block"
        dir="ltr"
      >
        {hostname}
      </span>
    </a>
  );
}
