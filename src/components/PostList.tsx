import { Post } from '@/lib/posts'
import PostCard from './PostCard'

export default function PostList({
  selectedCategory,
  posts,
}: {
  selectedCategory: string
  posts: Post[]
}) {
  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  return (
    <ul className="m-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredPosts.map((post: Post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </ul>
  )
}
