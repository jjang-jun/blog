import Link from 'next/link'
import { Post } from '@/lib/posts'

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-lg font-bold mb-4">관련 게시글</h2>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.path}>
            <Link
              href={`/posts/${post.path}`}
              className="block p-4 rounded-lg bg-white hover:bg-primary-50 transition-colors"
            >
              <p className="font-semibold text-gray-900">{post.title}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.date.toString()}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
