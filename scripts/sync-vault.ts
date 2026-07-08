import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const vaultDirEnv = process.env.VAULT_DIR;
if (!vaultDirEnv) {
  console.error("VAULT_DIR environment variable is required");
  process.exit(1);
}
const vaultDir: string = vaultDirEnv;

const repoDir = process.cwd();
const contentDir = path.join(repoDir, "content");
const assetsDir = path.join(contentDir, "assets");

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif"]);

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function collectSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "assets") {
      files.push(...collectSourceFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      files.push(fullPath);
    }
  }
  return files;
}

function destFilename(srcPath: string): string {
  const name = path.basename(srcPath);
  return name.endsWith(".md") ? name.replace(/\.md$/, ".mdx") : name;
}

function collectImageFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImageFiles(fullPath));
    } else if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function gitHasChanges(): boolean {
  try {
    const status = execSync("git status --porcelain", { cwd: repoDir, encoding: "utf-8" });
    return status.trim().length > 0;
  } catch {
    return false;
  }
}

function sync() {
  console.log(`[${new Date().toISOString()}] Syncing from vault...`);

  ensureDir(contentDir);
  ensureDir(assetsDir);

  // Copy .md / .mdx files (.md is renamed to .mdx)
  const sourceFiles = collectSourceFiles(vaultDir);
  for (const src of sourceFiles) {
    const dest = path.join(contentDir, destFilename(src));
    fs.copyFileSync(src, dest);
  }

  // Copy image files
  const imageFiles = collectImageFiles(vaultDir);
  for (const src of imageFiles) {
    const filename = path.basename(src);
    const dest = path.join(assetsDir, filename);
    fs.copyFileSync(src, dest);
  }

  // Check if anything changed and commit
  if (gitHasChanges()) {
    execSync("git add -A", { cwd: repoDir });
    execSync('git commit -m "sync: update from vault"', { cwd: repoDir });
    try {
      execSync("git push", { cwd: repoDir });
      console.log("  Changes committed and pushed.");
    } catch {
      console.log("  Changes committed (push skipped — no remote or offline).");
    }
  } else {
    console.log("  No changes.");
  }
}

const interval = parseInt(process.env.SYNC_INTERVAL_SEC || "60", 10) * 1000;
console.log(`Watching vault at ${vaultDir} every ${interval / 1000}s`);
sync();
setInterval(sync, interval);
