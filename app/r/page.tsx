import type { Metadata } from "next";
import { getRecommendations } from "./_lib/recommendations";
import { RecommendationList } from "./_components/recommendation-list";

export const metadata: Metadata = {
  title: "مطالب پیشنهادی",
  description: "پادکست ها و مطالبی که گوش میدم و میخونم.",
  openGraph: {
    images: ["/og/default.png"],
  },
};

export default function RecommendationsPage() {
  const items = getRecommendations();

  return (
    <div className="grid gap-10">
      <header className="flex flex-col gap-3 items-start">
        <h1 className="text-xl sm:text-3xl font-semibold">مطالب پیشنهادی</h1>
        <p className="text-secondary-foreground text">
          پادکست ها و مطالبی که گوش میدم و میخونم. اونایی که ستاره دارن رو بیشتر
          پیشنهاد میکنم.
        </p>
      </header>

      <RecommendationList
        title="پیشنهاد ویژه"
        items={items.filter((item) => item.starred)}
      />

      <RecommendationList
        title="بقیه"
        items={items.filter((item) => !item.starred)}
      />
    </div>
  );
}
