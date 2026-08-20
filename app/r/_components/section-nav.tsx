import type { RecommendationSection } from "../_lib/recommendations";

/** Jump links to each section, shown above the list. */
export function SectionNav({
  sections,
}: {
  sections: RecommendationSection[];
}) {
  if (sections.length < 2) return null;

  return (
    <nav className="flex flex-wrap gap-2">
      {sections.map((section) => (
        <a
          key={section.slug}
          href={`#${section.slug}`}
          className="border border-border px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:border-yellow-700 hover:text-foreground"
          dir="auto"
        >
          {section.title}
        </a>
      ))}
    </nav>
  );
}
