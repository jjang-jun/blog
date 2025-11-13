import { Metadata } from 'next'
import PostsCategoryFilter from '@/components/PostsCategoryFilter'
import { getAllPosts, getCategories } from '@/lib/posts'
import PostList from '@/components/PostList'

export const metadata: Metadata = {
  title: '게시글 목록',
  description: '작성된 게시글 들',
}

export default async function Posts() {
  const categories = await getCategories()
  const posts = await getAllPosts()
  return <PostsCategoryFilter posts={posts} categories={categories} />
}
