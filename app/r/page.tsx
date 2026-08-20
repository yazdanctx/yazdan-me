import type { Metadata } from "next";
import { getRecommendations } from "./_lib/recommendations";
import { RecommendationSection } from "./_components/recommendation-section";

export const metadata: Metadata = {
  title: "مطالب پیشنهادی",
  description: "پادکست ها و مطالبی که گوش میدم و میخونم.",
  openGraph: {
    images: ["/og/default.png"],
  },
};

export default function RecommendationsPage() {
  const sections = getRecommendations();

  return (
    <div className="grid gap-10">
      {sections.map((section) => (
        <RecommendationSection key={section.slug} section={section} />
      ))}
    </div>
  );
}
