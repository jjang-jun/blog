'use client'
import { useState } from 'react'
import FilteredPosts from './FilteredPosts'
import { Post } from '@/lib/posts'

export default function CategoryFilter({
  categories,
  posts,
}: {
  categories: Record<string, number>
  posts: Post[]
}) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  return (
    <>
      <ul className="flex gap-4 justify-center mb-12 mt-4">
        {Object.entries(categories).map(([name, count]) => (
          <li
            key={name}
            className={
              name === selectedCategory
                ? 'text-sky-400 font-bold text-xl'
                : 'text-xl'
            }
          >
            <button onClick={() => setSelectedCategory(name)}>
              {name} ({count})
            </button>
          </li>
        ))}
      </ul>
      <FilteredPosts category={selectedCategory} posts={posts} />
    </>
  )
}
