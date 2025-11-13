import { readFile } from 'fs/promises'
import path from 'path'

const metadataPath = path.join(process.cwd(), 'data')

export async function getTitle() {
  const filePath = path.join(metadataPath, 'metadata.json')
  const metadataJsonStr = await readFile(filePath, 'utf-8')
  const { title } = JSON.parse(metadataJsonStr)

  return title
}

export async function getAuthor() {
  const filePath = path.join(metadataPath, 'metadata.json')
  const metadataJsonStr = await readFile(filePath, 'utf-8')
  const { author } = JSON.parse(metadataJsonStr)

  return author
}

type LINKS = { name: string; url: string; iconSize: number }[]

export async function getLinks() {
  const filePath = path.join(metadataPath, 'metadata.json')
  const metadataJsonStr = await readFile(filePath, 'utf-8')
  const { links } = JSON.parse(metadataJsonStr)

  return links as LINKS
}
