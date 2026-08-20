import type { RecommendationSection as Section } from "../_lib/recommendations";
import { RecommendationLink } from "./recommendation-link";

export function RecommendationSection({ section }: { section: Section }) {
  return (
    <section id={section.slug} dir="ltr" className="scroll-mt-24">
      <h2 className="mb-4 text-lg font-semibold sm:text-2xl">
        {section.title}
      </h2>

      <div className="grid gap-5">
        {section.groups.map((group, i) => (
          <div key={group.title ?? i}>
            {group.title && (
              <h3
                className="mb-2 text-sm font-medium text-muted-foreground"
                dir="auto"
              >
                {group.title}
              </h3>
            )}
            <div className="divide-y divide-border border border-border">
              {group.links.map((link) => (
                <RecommendationLink key={link.url} {...link} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
