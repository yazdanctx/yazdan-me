import { Star } from "lucide-react";
import type { Recommendation } from "../_lib/recommendations";

export function RecommendationItem({ title, url, description, starred }: Recommendation) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-start gap-2 border border-border p-5 hover:border-yellow-700"
    >
      <div className="flex items-center gap-2">
        {starred && (
          <Star className="size-4 shrink-0 fill-yellow-600 text-yellow-600" />
        )}
        <h3 className="font-semibold" dir="auto">
          {title}
        </h3>
      </div>
      {description && (
        <p className="text-secondary-foreground text">{description}</p>
      )}
      <span className="text-xs text-muted-foreground" dir="ltr">
        {new URL(url).hostname.replace(/^www\./, "")}
      </span>
    </a>
  );
}
