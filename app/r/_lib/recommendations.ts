import fs from "node:fs";
import path from "node:path";

const recommendationsFile = path.join(
  process.cwd(),
  "app/r/recommendations.md",
);

export interface Recommendation {
  title: string;
  url: string;
  description: string;
  starred: boolean;
}

const HEADING = /^##\s+(.*)$/;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;
const STAR = /^[⭐★*]\s*/;

function toRecommendation(
  heading: string,
  bodyLines: string[],
): Recommendation | null {
  const starred = STAR.test(heading);
  const link = heading.replace(STAR, "").trim().match(LINK);
  if (!link) return null;

  return {
    title: link[1].trim(),
    url: link[2].trim(),
    description: bodyLines
      .join("\n")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim()
      .replace(/\s*\n\s*/g, " "),
    starred,
  };
}

export function getRecommendations(): Recommendation[] {
  if (!fs.existsSync(recommendationsFile)) return [];

  const source = fs.readFileSync(recommendationsFile, "utf-8");
  const items: Recommendation[] = [];

  let heading: string | null = null;
  let body: string[] = [];

  const flush = () => {
    if (heading === null) return;
    const item = toRecommendation(heading, body);
    if (item) items.push(item);
    heading = null;
    body = [];
  };

  for (const line of source.split("\n")) {
    const match = line.match(HEADING);
    if (match) {
      flush();
      heading = match[1].trim();
    } else if (heading !== null) {
      body.push(line);
    }
  }
  flush();

  // Starred items float to the top; file order is preserved within each group.
  return [
    ...items.filter((item) => item.starred),
    ...items.filter((item) => !item.starred),
  ];
}
