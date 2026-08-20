import { Headphones, MonitorPlay } from "lucide-react";
import type { RecommendationSection as Section } from "../_lib/recommendations";
import { RecommendationLink } from "./recommendation-link";

/** Sections of mostly-YouTube links read as lecture series, the rest as audio. */
function SectionIcon({ section }: { section: Section }) {
  const links = section.groups.flatMap((group) => group.links);
  const video = links.filter((link) =>
    link.hostname.endsWith("youtube.com"),
  ).length;

  const Icon = video > links.length / 2 ? MonitorPlay : Headphones;
  return <Icon className="size-5 text-yellow-600" />;
}

export function RecommendationSection({ section }: { section: Section }) {
  return (
    <section id={section.slug} dir="ltr" className="scroll-mt-24">
      <header className="mb-4 flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center border border-border bg-muted">
          <SectionIcon section={section} />
        </span>
        <h2 className="text-lg font-semibold sm:text-2xl">{section.title}</h2>
      </header>

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
