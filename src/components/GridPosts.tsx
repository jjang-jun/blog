import { type Post } from '@/lib/posts'
import PostCard from './PostCard'

type PostGridProps = {
  posts: Post[]
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: 'sm' | 'md' | 'lg'
}

export default function GridPost({
  posts,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
}: PostGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }

  const gridClasses = `
    grid 
    grid-cols-${columns.mobile || 1}
    md:grid-cols-${columns.tablet || 2} 
    lg:grid-cols-${columns.desktop || 3}
    ${gapClasses[gap]}
  `
  return (
    <div className="container mx-auto py-8">
      <div className={gridClasses}>
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </div>
    </div>
  )
}
