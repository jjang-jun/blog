import { getRecentPosts } from '@/lib/posts'
import Link from 'next/link'
import PostCard from './PostCard'

export default async function RecentPosts() {
  const recentPosts = await getRecentPosts(10)
  return (
    <section className="px-8 md:p-4">
      <h2 className="text-2xl font-bold mb-3">최근 게시글</h2>
      <ul>
        {recentPosts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    </section>
  )
}
