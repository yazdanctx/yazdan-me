import Image from "next/image";
import { getAllEntries } from "@/lib/entries";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fa";
import headerImage from "@/app/assets/frame.jpg";

dayjs.extend(relativeTime);
dayjs.locale("fa");
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/lib/strings.json";

export default function Home() {
  const entries = getAllEntries();

  return (
    <main>
      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-8 lg:self-start text-center lg:text-right">
          <Image
            src={headerImage}
            priority
            className="rounded-lg mb-4"
            alt={strings.home.imageAlt}
          />
          <h1 className="text-2xl">{strings.home.heading}</h1>
          <div className="font-light text-stone-300 mt-4">
            <p className="mt-4">{strings.home.paragraphs[0]}</p>
            <p className="mt-4">{strings.home.paragraphs[1]}</p>
            <p className="mt-4">{strings.home.paragraphs[2]}</p>
            <p className="mt-4">
              {strings.home.paragraphs[3].replace("%s", strings.home.prLink)}
            </p>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 w-full">
          <Tabs defaultValue="dangerous" dir="rtl">
            <TabsList className="w-full">
              <TabsTrigger value="dangerous" className="flex-1">
                {strings.tabs.dangerous}
              </TabsTrigger>
              <TabsTrigger value="safe" className="flex-1">
                {strings.tabs.safe}
              </TabsTrigger>
              <TabsTrigger value="free-models" className="flex-1">
                {strings.tabs.freeModels}
              </TabsTrigger>
              <TabsTrigger value="education" className="flex-1">
                {strings.tabs.education}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dangerous" className="mt-4 space-y-4">
              {entries.map((entry) => (
                <Card key={entry.title}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle>{entry.title}</CardTitle>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          entry.tested
                            ? "bg-green-900/50 text-green-400"
                            : "bg-red-900/50 text-red-400"
                        }`}
                      >
                        {entry.tested
                          ? strings.home.tested
                          : strings.home.notTested}
                      </span>
                    </div>
                    <p className="text-xs text-right text-muted-foreground">
                      {dayjs(entry.lastUpdated).fromNow()}
                    </p>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-right">
                    {entry.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button asChild>
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {strings.home.goToPlatform}
                      </a>
                    </Button>
                    <Button variant="ghost" asChild>
                      <a
                        href={entry.author}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {strings.home.source}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="safe" className="mt-4" />
            <TabsContent value="free-models" className="mt-4" />
            <TabsContent value="education" className="mt-4" />
          </Tabs>
        </div>
      </div>
    </main>
  );
}
