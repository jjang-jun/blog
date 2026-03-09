import { Post } from '@/lib/posts'
import PostCard from './PostCard'

type Props = {
  category: string
  posts: Post[]
}

export default function FilteredPosts({ category, posts }: Props) {
  const filteredPosts =
    category === 'All'
      ? posts
      : posts.filter((post) => post.category === category)

  return (
    <ul>
      {filteredPosts.map((post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </ul>
  )
}
