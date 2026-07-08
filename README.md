# yazdan.me

Personal blog built with Next.js static export, deployed on Vercel.

## Writing

Content is authored in an Obsidian vault and synced into `content/` via a polling script.

### Setup

1. Copy `.env.example` to `.env` and set `VAULT_DIR` to your Obsidian vault path
2. Run the sync watcher:

```bash
bun run sync-vault
```

This polls the vault every 60s, copies `.md` and `.mdx` files to `content/` (`.md` files are renamed to `.mdx`), copies images to `content/assets/`, then auto-commits and pushes.

Write in plain `.md` in Obsidian — the script handles the conversion.

### Publishing

Only articles with `published: true` in frontmatter are rendered on the site. Unpublished articles live in the repo for backup but won't appear on the blog.

Example frontmatter:

```yaml
---
title: "عنوان مقاله"
date: "2026-07-09"
description: "توضیح کوتاه"
published: true
---
```

## Development

```bash
bun dev
```

## Build

```bash
bun run build
```

Static output goes to `out/`.
