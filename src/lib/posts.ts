import path from 'path'
import { readFile } from 'fs/promises'
import { calculateReadingTime } from '@/lib/reading-time'

export type Post = {
  title: string
  category: string
  path: string
  tags: string[]
  date: Date
  readingTimeInMinutes: number
  desc: string
  thumbnail: string
}

export type PostData = Post & {
  content: string
  readingTime: number
}

const postsDir = path.join(process.cwd(), 'data', 'posts')

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(postsDir, 'posts.json')
  const postsJsonStr = await readFile(filePath, 'utf-8')
  const posts = JSON.parse(postsJsonStr) as Post[]

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(postsDir, `${fileName}.md`)
  const posts = await getAllPosts()
  const post = posts.find((post) => post.path === fileName)

  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`)

  const content = await readFile(filePath, 'utf-8')

  const readingTime = calculateReadingTime(content)

  return { ...post, content, readingTime }
}

export function getRelatedPosts(
  current: Post,
  allPosts: Post[],
  limit = 3
): Post[] {
  return allPosts
    .filter((p) => p.path !== current.path)
    .map((p) => ({
      post: p,
      score:
        (p.category === current.category ? 2 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}
