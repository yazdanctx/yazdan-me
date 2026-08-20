import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getRecommendations } from "./_lib/recommendations";
import { RecommendationSection } from "./_components/recommendation-section";
import { SectionNav } from "./_components/section-nav";

export const metadata: Metadata = {
  title: "مطالب پیشنهادی",
  description: "پادکست ها و مطالبی که گوش میدم و میخونم.",
  openGraph: {
    images: ["/og/default.png"],
  },
};

export default function RecommendationsPage() {
  const { intro, sections } = getRecommendations();
  const total = sections.reduce((sum, section) => sum + section.count, 0);

  return (
    <div className="grid gap-10">
      <header className="flex flex-col items-start gap-3 border border-border p-5 md:p-8">
        <span className="flex items-center gap-2 text-sm text-yellow-600">
          <Sparkles className="size-4" />
          {total} لینک
        </span>
        <h1 className="text-xl font-semibold sm:text-3xl">مطالب پیشنهادی</h1>
        {intro && <p className="text-secondary-foreground">{intro}</p>}
      </header>

      <SectionNav sections={sections} />

      {sections.map((section) => (
        <RecommendationSection key={section.slug} section={section} />
      ))}
    </div>
  );
}
