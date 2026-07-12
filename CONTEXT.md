# Publishing Pipeline

This project is a Persian-language personal blog (yazdan.me) built with Next.js static export. Content is authored in an Obsidian vault outside the repo, synced into the `content/` directory by a polling script, then deployed to Vercel via git push.

**Banner**:
A full-width hero image at the top of an article page, above the title. Specified in frontmatter as a `banner` field containing the image path (e.g., `banner: /assets/banners/tcp-ip.png`). Rendered with `next/image` for CLS prevention and lazy loading; uses `priority` since the banner is above the fold. Fixed dimensions: 1800×430.
_Avoid_: Hero image, cover, header image

## Language

**Vault**:
The Obsidian folder where articles are authored. Lives outside the repo in a local `~/...` directory. The source of truth for all writing.
_Avoid_: Obsidian folder, notes directory

**Article**:
A published piece of content with frontmatter (`title`, `date`, `description`) and an MDX body, rendered as a page on the blog. Stored as an `.mdx` file in `content/`.
_Avoid_: Post, note, page

**Draft**:
An article not yet ready to publish. Identified by `published: false` (or absence of `published: true`) in its frontmatter. The sync script copies it alongside published articles — filtering happens at build time, not sync time. Hidden from production builds. In local dev (`next dev`), drafts appear in a separate "پیش‌نویس‌ها" section on the blog index and are accessible at their article URL.
_Avoid_: Unpublished article, WIP

**Sync Watcher**:
A polling script (`scripts/sync-vault.ts`) that periodically checks the vault for changes and copies all `.md`/`.mdx` files into the repo's `content/` directory (renaming `.md` to `.mdx`). Does not inspect frontmatter — filtering is the build's responsibility. Runs with debounced batch commits.
_Avoid_: Sync script, vault watcher, publisher

**Content Directory**:
The `content/` folder in the repo. The single source of truth for the build — Next.js reads `.mdx` files from here. Articles are rendered by `lib/mdx.ts`.
_Avoid_: Articles folder, posts directory

**Publish**:
The act of setting `published: true` in an article's frontmatter and syncing from the vault, committing the change to the repo, and triggering a Vercel deploy.
_Avoid_: Deploy, release, go live

**Frontmatter `published`**:
A boolean field in the article's YAML frontmatter. Articles with `published: true` are included in production builds. Articles without this field or with `published: false` are treated as drafts — hidden in production, visible in local dev.
_Avoid_: visible, draft, status

**Media Asset**:
An image or other binary file referenced in an article. Stored in `content/assets/` alongside the articles. Copied from the vault during sync.
_Avoid_: Attachment, resource, file

# Article Rendering

**Table of Contents (TOC)**:
A nested list of headings (`h1`–`h6`) extracted from the article's MDX source, rendered at the top of the article for in-page navigation. Uses semantic nesting (tracks actual heading levels, so an `h4` after an `h2` nests under that `h2`). Each entry links to its corresponding heading via a `Heading ID`.
_Avoid_: Outline, index, heading list

**Heading ID**:
A slugified identifier generated from heading text (e.g. `"What is a Token"` → `"what-is-a-token"`). Used as the `id` attribute on rendered `<h1>`–`<h6>` elements and as the `href` target in TOC links for smooth scrolling.
_Avoid_: Anchor, slug, hash

**Article Navigation**:
Prev/next navigation between articles at the bottom of each article page. Rendered as outline-styled links with Lucide icons. Applies to all articles (ordered by date), not just series.
_Avoid_: Bottom nav, pagination, post nav

**Series Navigation**:
Article navigation limited to articles within the same series (same `series` frontmatter value), ordered by `part`. Falls back to `Article Navigation` when no series is active.
_Avoid_: Series pagination, collection nav

**Series**:
A named collection of articles sharing a `series` frontmatter value, ordered by `part`. Each series has a canonical slug and a human-readable label (`seriesLabel`). Rendered as a list on the series index page and navigated sequentially via `Series Navigation`.
_Avoid_: Collection, group, playlist

# AI Dictionary

**Entry**:
A single dictionary term. Stored as a `.md` file in `app/ai-dictionary/dictionary/`. The filename (e.g. `Token.md`) is the canonical title. Frontmatter contains only `description`. Body is markdown with wiki-links to other entries.
_Avoid_: Term, dictionary term, definition

**Wiki-link**:
An inline markdown link between dictionary entries, using Obsidian-style relative paths (e.g. `[model](./Model.md)`). Rendered as clickable links that navigate to the target entry's page at `/ai-dictionary/[slug]`.
_Avoid_: Internal link, cross-reference, backlink

**Dictionary Search**:
Fuzzy matching against both entry titles (filenames) and entry body content. Runs client-side — all entries are loaded as JSON and searched in the browser. Instant filtered results as the user types.
_Avoid_: Full-text search, query, lookup

**Entry Page**:
The individual view of a dictionary entry at `/ai-dictionary/[slug]`. Renders the entry's markdown body with wiki-links resolved to navigation. Simplified compared to Article rendering — no TOC, no banner, no series/article navigation.
_Avoid_: Term page, definition page
