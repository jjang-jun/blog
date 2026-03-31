import MarkdownViewer from '@/components/MarkdownViewer'
import ShareButton from '@/components/ShareButton'
import RelatedPosts from '@/components/RelatedPosts'
import { Post, PostData } from '@/lib/posts'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { BsClock } from 'react-icons/bs'

export default function PostContent({
  post,
  relatedPosts,
}: {
  post: PostData
  relatedPosts: Post[]
}) {
  const { title, date, desc, category, tags, content, readingTime, path } = post

  return (
    <section className="flex flex-col p-4 md:p-8 w-full">
      <span className="text-sm font-medium text-primary-500">{category}</span>

      <h1 className="text-3xl md:text-4xl font-bold mt-2">{title}</h1>

      {desc && <p className="text-gray-500 mt-2 text-base">{desc}</p>}

      <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <AiTwotoneCalendar className="text-primary-500" />
          {date.toString()}
        </span>
        <span className="flex items-center gap-1">
          <BsClock className="text-primary-500" />약 {readingTime}분
        </span>
        <ShareButton title={title} url={`/posts/${path}`} />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-primary-50 text-primary-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="w-full border-t border-gray-200 mt-6 mb-8" />

      <MarkdownViewer content={content} />

      <RelatedPosts posts={relatedPosts} />
    </section>
  )
}
