import type { Recommendation } from "../_lib/recommendations";
import { RecommendationItem } from "./recommendation-item";

interface RecommendationListProps {
  title: string;
  items: Recommendation[];
}

export function RecommendationList({ title, items }: RecommendationListProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg sm:text-2xl font-semibold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <RecommendationItem key={item.url} {...item} />
        ))}
      </div>
    </section>
  );
}
