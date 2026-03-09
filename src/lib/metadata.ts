import { readFile } from 'fs/promises'
import path from 'path'

type Link = { name: string; url: string }

type Metadata = {
  author: string
  title: string
  links: Link[]
}

const metadataPath = path.join(process.cwd(), 'data', 'metadata.json')

async function getMetadata(): Promise<Metadata> {
  const metadataJsonStr = await readFile(metadataPath, 'utf-8')
  return JSON.parse(metadataJsonStr) as Metadata
}

export async function getTitle() {
  const { title } = await getMetadata()
  return title
}

export async function getAuthor() {
  const { author } = await getMetadata()
  return author
}

export async function getLinks() {
  const { links } = await getMetadata()
  return links
}
