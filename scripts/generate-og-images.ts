import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");
const ogDir = path.join(process.cwd(), "public", "og");
const baseUrl = "yazdan.me";

async function generateOGImage(filename: string, url: string) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#000"/>
  <text x="40" y="590" fill="#fff" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="400">${url}</text>
</svg>`;

  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }

  await sharp(Buffer.from(svg)).png().toFile(path.join(ogDir, `${filename}.png`));
}

async function main() {
  await generateOGImage("default", baseUrl);

  if (!fs.existsSync(contentDir)) return;

  const files = fs.readdirSync(contentDir);
  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    await generateOGImage(slug, `${baseUrl}/b/${slug}/`);
  }

  console.log("All OG images generated.");
}

main().catch(console.error);
