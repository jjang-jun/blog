import { Metadata } from 'next'
import { getAllPosts, getPostData } from '@/lib/posts'
import PostContent from '@/components/PostContent'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, desc } = await getPostData(slug)
  return {
    title,
    description: desc,
  }
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug)

  return (
    <article className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4">
      <PostContent post={post} />
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.path,
  }))
}
