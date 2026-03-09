import path from 'path'
import { readFile } from 'fs/promises'

export type TimeStamp = {
  date: string
  activity: string
  detail: { title: string; link?: string }[]
}

const dataDir = path.join(process.cwd(), 'data')

export async function getTimeStamps(): Promise<TimeStamp[]> {
  const filePath = path.join(dataDir, 'about', 'timestamps.json')
  const timestampsJsonStr = await readFile(filePath, 'utf-8')
  return JSON.parse(timestampsJsonStr) as TimeStamp[]
}
