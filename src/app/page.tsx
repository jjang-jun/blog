import Link from 'next/link'
import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `jjangjun's blog`,
    description: '모호함을 지양하는 개발자의 기록',
  }
}

export default async function Home() {
  const posts = await getAllPosts()

  const postsByYear = posts.reduce<Record<string, typeof posts>>(
    (groups, post) => {
      const year = new Date(post.date).getFullYear().toString()
      if (!groups[year]) groups[year] = []
      groups[year].push(post)
      return groups
    },
    {}
  )

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <section className="px-6 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-2xl">
        {years.map((year) => (
          <div key={year} className="mb-2">
            <div className="sticky top-0 z-10 bg-white pb-2 pt-4">
              <div className="flex items-center gap-4">
                <h2 className="shrink-0 text-lg font-bold text-primary-600">
                  {year}
                </h2>
                <hr className="w-full border-gray-200" />
              </div>
            </div>

            <ul className="space-y-3 py-2">
              {postsByYear[year].map((post) => {
                const d = new Date(post.date)
                const mm = String(d.getMonth() + 1).padStart(2, '0')
                const dd = String(d.getDate()).padStart(2, '0')

                return (
                  <li key={post.path}>
                    <Link
                      href={`/posts/${post.path}`}
                      className="group flex gap-4"
                    >
                      <span className="w-12 shrink-0 pt-0.5 text-sm text-gray-400">
                        {mm}.{dd}
                      </span>
                      <div>
                        <span className="text-base text-gray-900 group-hover:text-primary-500">
                          {post.title}
                        </span>
                        {post.desc && (
                          <p className="mt-1 text-sm text-gray-400 font-[system-ui]">
                            {post.desc}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
