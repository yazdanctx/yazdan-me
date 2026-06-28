import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface Entry {
  slug: string
  title: string
  lastUpdated: string
  link: string
  author: string
  tested: boolean
  content: string
}

const contentDir = path.join(process.cwd(), 'content')

export function getAllEntries(): Entry[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))

  const entries = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: data.title,
      lastUpdated: data.last_updated,
      link: data.link,
      author: data.author,
      tested: data.tested ?? false,
      content,
    }
  })

  entries.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
  return entries
}

export function getEntryBySlug(slug: string): Entry | undefined {
  return getAllEntries().find((e) => e.slug === slug)
}
