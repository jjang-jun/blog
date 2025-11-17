import { getRecentPosts } from '@/lib/posts'
import GridPost from './GridPosts'

export default async function RecentPosts() {
  const recentPosts = await getRecentPosts(10)
  return (
    <section className="px-8 md:p-4">
      <h2 className="text-xl font-bold mb-3 text-gray-700">최근 게시글</h2>
      <GridPost posts={recentPosts} />
    </section>
  )
}
