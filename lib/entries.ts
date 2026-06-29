import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"

export interface Entry {
  title: string
  lastUpdated: string
  link: string
  author: string
  tested: boolean
  isSafe: boolean
  content: string
}

function parseFrontmatter(fileContent: string): Record<string, string | boolean> {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return {}

  const [, frontmatter, body] = match
  const fields: Record<string, string | boolean> = {}

  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) continue
    const key = line.slice(0, colonIndex).trim()
    let value: string | boolean = line.slice(colonIndex + 1).trim()
    if (value === "true") value = true
    else if (value === "false") value = false
    fields[key] = value
  }

  return fields
}

export async function getAllEntries(): Promise<Entry[]> {
  const contentDir = join(process.cwd(), "content")
  const files = await readdir(contentDir)
  const mdFiles = files.filter((f) => f.endsWith(".md"))

  const entries: Entry[] = []

  for (const file of mdFiles) {
    const filePath = join(contentDir, file)
    const content = await readFile(filePath, "utf-8")
    const fields = parseFrontmatter(content)

    const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
    const body = match ? match[1].trim() : ""

    entries.push({
      title: (fields.title as string) ?? file.replace(/\.md$/, ""),
      lastUpdated: fields.lastUpdated as string,
      link: fields.link as string,
      author: fields.author as string,
      tested: (fields.tested as boolean) ?? false,
      isSafe: (fields.isSafe as boolean) ?? false,
      content: body,
    })
  }

  return entries.sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
  )
}
