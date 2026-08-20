import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

const recommendationsFile = path.join(
  process.cwd(),
  "app/r/recommendations.md",
);

export interface RecommendationLink {
  title: string;
  url: string;
  description: string;
  hostname: string;
  /** Position within an ordered list, or null for bullet lists. */
  index: number | null;
}

export interface RecommendationGroup {
  title: string | null;
  links: RecommendationLink[];
}

export interface RecommendationSection {
  title: string;
  slug: string;
  intro: string;
  groups: RecommendationGroup[];
  count: number;
}

export interface RecommendationsDocument {
  intro: string;
  sections: RecommendationSection[];
}

const SECTION = /^##\s+(.+)$/;
const GROUP = /^###\s+(.+)$/;
const ITEM =
  /^(?:([-*])|(\d+)\.)\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:[—–-]\s*(.*))?$/;

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Parses `recommendations.md` into sections (`##`), optional groups (`###`)
 * and their links. Prose between a heading and its list becomes the intro.
 */
export function getRecommendations(): RecommendationsDocument {
  if (!fs.existsSync(recommendationsFile)) return { intro: "", sections: [] };

  const slugger = new GithubSlugger();
  const source = fs.readFileSync(recommendationsFile, "utf-8");

  const sections: RecommendationSection[] = [];
  const intro: string[] = [];
  let section: RecommendationSection | null = null;
  let group: RecommendationGroup | null = null;

  for (const raw of source.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const sectionMatch = line.match(SECTION);
    if (sectionMatch) {
      section = {
        title: sectionMatch[1].trim(),
        slug: slugger.slug(sectionMatch[1].trim()),
        intro: "",
        groups: [],
        count: 0,
      };
      sections.push(section);
      group = null;
      continue;
    }

    const groupMatch = line.match(GROUP);
    if (groupMatch && section) {
      group = { title: groupMatch[1].trim(), links: [] };
      section.groups.push(group);
      continue;
    }

    const itemMatch = line.match(ITEM);
    if (itemMatch && section) {
      if (!group) {
        group = { title: null, links: [] };
        section.groups.push(group);
      }
      const [, bullet, ordinal, title, url, description] = itemMatch;
      group.links.push({
        title: title.trim(),
        url: url.trim(),
        description: (description ?? "").trim(),
        hostname: hostnameOf(url.trim()),
        index: bullet ? null : Number(ordinal),
      });
      section.count += 1;
      continue;
    }

    // Anything else is prose: the page intro, or the current section's intro.
    if (section) {
      section.intro = section.intro ? `${section.intro} ${line}` : line;
    } else {
      intro.push(line);
    }
  }

  return { intro: intro.join(" "), sections };
}
