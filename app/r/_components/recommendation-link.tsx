import type { RecommendationLink as Link } from "../_lib/recommendations";
import { LinkIcon } from "./link-icon";

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
      <span className="flex size-5 shrink-0 items-center justify-center pt-0.5 text-muted-foreground">
        {index === null ? (
          <LinkIcon hostname={hostname} className="size-4" />
        ) : (
          <span className="font-mono text-xs tabular-nums">{index}</span>
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <span className="font-mono text-sm">{title}</span>
        {description && (
          <span className="font-mono text-xs text-secondary-foreground">
            {description}
          </span>
        )}
      </span>

      <span className="hidden shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground sm:block">
        {hostname}
      </span>
    </a>
  );
}
