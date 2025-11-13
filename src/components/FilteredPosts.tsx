import { Post } from '@/lib/posts'
import PostCard from './PostCard'

export default function FilteredPosts({
  category,
  posts,
}: {
  category: string
  posts: Post[]
}) {
  if (category === 'All') {
    return (
      <ul>
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    )
  }

  return (
    <ul>
      {posts
        .filter((post) => post.category === category)
        .map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
    </ul>
  )
}
