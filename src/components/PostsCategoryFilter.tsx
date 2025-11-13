'use client'
import { useState } from 'react'
import PostList from './PostList'
import { Post } from '@/lib/posts'

export default function PostsCategoryFilter({
  posts,
  categories,
}: {
  posts: Post[]
  categories: Record<string, number>
}) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <div className="flex flex-col">
      <div className="flex justify-center my-6">
        {Object.entries(categories).map(([categoryName, categoryCount]) => (
          <button
            key={categoryName}
            className={`font-bold mr-3 hover:text-sky-300 ${
              selectedCategory === categoryName && 'text-sky-300'
            }`}
            onClick={() => setSelectedCategory(categoryName)}
          >
            {categoryName} ({categoryCount})
          </button>
        ))}
      </div>

      <PostList posts={posts} selectedCategory={selectedCategory} />
    </div>
  )
}
