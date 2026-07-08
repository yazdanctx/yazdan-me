# Vault-Outside-Repo Sync Pipeline

Content is authored in an Obsidian vault outside the repo and synced into the `content/` directory via a polling script (`scripts/sync-vault.ts`), then deployed to Vercel through git push. We chose this over keeping the vault inside the repo (would couple Obsidian config to the codebase and risk accidental publishing) and over real-time watchers (polling is simpler to debug and avoids races during Obsidian saves). The sync script uses frontmatter `published: boolean` to gate files: `published: true` → `.mdx` (publishable), absent/false → `.draft.mdx` (ignored by the article reader).

Status: accepted

## Considered Options

- **Vault inside the repo**: Simpler — one folder, no sync step. Rejected because it conflates writing workspace with deployment workspace, Obsidian config files would clutter the repo, and every save is in git history.
- **Real-time file watcher (chokidar)**: More responsive. Rejected because polling is simpler to implement, debug, and reason about; a few-second lag doesn't matter for a personal blog.
- **No draft mechanism / manual file management**: Rejected because `published: true` frontmatter is explicit and script-enforceable.
- **.md files instead of .mdx**: Rejected — the site already uses `next-mdx-remote` and keeping `.mdx` avoids a format migration. Content is plain markdown with no JSX components.
