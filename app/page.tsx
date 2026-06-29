import Image from "next/image";
import { getAllEntries } from "@/lib/entries";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fa";
import headerImage from "@/app/assets/frame.jpg";
import turbogrannyImage from "@/app/assets/turbogranny.png";
import hermesImage from "@/app/assets/hermes.png";

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
import { Check, CornerDownLeft, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import strings from "@/lib/strings.json";

export default async function Home() {
  const entries = await getAllEntries();
  const dangerousEntries = entries.filter((e) => !e.isSafe);
  const safeEntries = entries.filter((e) => e.isSafe);

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
          <div className="font-light text-stone-300 mt-4 space-y-4 leading-relaxed">
            <p>
              بچهای کامیونیتی اینور اونور API های رایگان هوش مصنوعی رو میذارن.
              فعلا اینجارو برای دسترسی ساده‌تر درست کردم و منابع خوبی رو که
              میبینم میذارم.
            </p>
            <p>
              اینایی که اینجا هست رو خودم تست کردم و دسترسی گرفتم.
            </p>
            <p>
              یه سری آموزش و داکیومنت هم برای دسترسی به مدل های رایگان یا ارزون
              چینی دارم آماده میکنم که به زودی میذارم اینجا.
            </p>
            <p>
              اگه خواستی چیزی اضافه کنی یه{" "}
              <a
                href={strings.home.prLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-300 transition-colors"
              >
                pull request
              </a>{" "}
              به گیتهاب بزن، ماچ به کله‌ت 💋
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
              <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-linear-90 to-red-800/10 from-red-800/5 p-4 text-sm">
                <TriangleAlert
                  size={30}
                  className="mt-1 size-5 shrink-0 text-red-400"
                />
                <div className="space-y-1">
                  <p className="font-medium text-red-400 text-lg">
                    {strings.dangerAlert.title}
                  </p>
                  <p className="text-red-400/70 font-medium leading-6">
                    {strings.dangerAlert.paragraph}
                  </p>
                </div>
              </div>
              {dangerousEntries.map((entry) => (
                <Card key={entry.title}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle>{entry.title}</CardTitle>
                      <span
                        className={cn(
                          "text-xs flex items-center gap-1 mb-1 rounded",
                          entry.tested
                            ? "bg-stone text-blue-400"
                            : "text-red-400",
                        )}
                      >
                        {entry.tested ? (
                          <></>
                        ) : (
                          <>
                            <X size={15} />
                            {strings.home.notTested}
                          </>
                        )}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed font-light text-right">
                    {entry.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter className="gap-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button asChild>
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <CornerDownLeft />
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
                    </div>

                    <p className="text-xs text-right text-muted-foreground">
                      {dayjs(entry.lastUpdated).fromNow()}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="safe" className="mt-4 space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-linear-90 to-emerald-800/10 from-emerald-800/5 p-4 text-sm">
                <Check
                  size={30}
                  className="mt-1 size-5 shrink-0 text-emerald-200"
                />
                <div className="space-y-1">
                  <p className="font-medium text-emerald-200 text-lg">
                    {strings.safeAlert.title}
                  </p>
                  <p className="text-emerald-100/70 font-medium leading-6">
                    {strings.safeAlert.paragraph}
                  </p>
                </div>
              </div>
              {safeEntries.map((entry) => (
                <Card key={entry.title}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle>{entry.title}</CardTitle>
                      <span
                        className={cn(
                          "text-xs flex items-center gap-1 mb-1 rounded",
                          entry.tested
                            ? "bg-stone text-blue-400"
                            : "text-red-400",
                        )}
                      >
                        {entry.tested ? (
                          <></>
                        ) : (
                          <>
                            <X size={15} />
                            {strings.home.notTested}
                          </>
                        )}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed font-light text-right">
                    {entry.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter className="gap-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button asChild>
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <CornerDownLeft />
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
                    </div>

                    <p className="text-xs text-right text-muted-foreground">
                      {dayjs(entry.lastUpdated).fromNow()}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="free-models" className="mt-4">
              <div className="flex items-center gap-5 flex-col justify-center rounded-lg border border-muted bg-muted/50 p-8 text-sm text-muted-foreground">
                <p className="text-lg">{strings.soonAlert.title}</p>
                <p className="text-center px-10 text-muted-foreground/70">
                  {strings.soonAlert.paragraph}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="education" className="mt-4 space-y-3">
              <div className="pointer-events-none select-none flex items-center gap-4 rounded-lg border border-muted bg-muted/30 p-4">
                <div className="w-full">
                  <p className="font-medium">هرمس کیه و چیه؟</p>
                  <p className="text-sm text-muted-foreground">
                    {strings.comingSoon}
                  </p>
                </div>
                <Image
                  src={hermesImage}
                  alt="hermes"
                  width={48}
                  height={48}
                  className="rounded-full shrink-0"
                />
              </div>
              <div className="pointer-events-none select-none flex items-center justify-between gap-4 rounded-lg border border-muted bg-muted/30 p-4">
                <div>
                  <p className="font-medium">چیز هایی که من از AI بلدم</p>
                  <p className="text-sm text-muted-foreground">
                    {strings.comingSoon}
                  </p>
                </div>
                <Image
                  src={turbogrannyImage}
                  alt="turbogranny"
                  width={48}
                  height={48}
                  className="rounded-full shrink-0"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
