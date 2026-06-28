import entries from "@/content/entries.json"

export interface Entry {
  title: string
  lastUpdated: string
  link: string
  author: string
  tested: boolean
  content: string
}

export function getAllEntries(): Entry[] {
  return [...entries].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  )
}
