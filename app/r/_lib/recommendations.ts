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
  groups: RecommendationGroup[];
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
 * and their links. Prose lines are ignored — only headings and list items
 * make it onto the page.
 */
export function getRecommendations(): RecommendationSection[] {
  if (!fs.existsSync(recommendationsFile)) return [];

  const slugger = new GithubSlugger();
  const source = fs.readFileSync(recommendationsFile, "utf-8");

  const sections: RecommendationSection[] = [];
  let section: RecommendationSection | null = null;
  let group: RecommendationGroup | null = null;

  for (const raw of source.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const sectionMatch = line.match(SECTION);
    if (sectionMatch) {
      const title = sectionMatch[1].trim();
      section = { title, slug: slugger.slug(title), groups: [] };
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
    }
  }

  return sections;
}
