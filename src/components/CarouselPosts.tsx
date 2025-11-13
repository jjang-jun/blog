import { Post } from '@/lib/posts'
import PostCard from './PostCard'

export default function CarouselPosts({ posts }: { posts: Post[] }) {
  return (
    <ul className="overflow-x-auto flex snap-x">
      {posts.map((post) => (
        <li key={post.path} className="snap-center mx-4">
          <PostCard width="300" post={post} />
        </li>
      ))}
    </ul>
  )
}
