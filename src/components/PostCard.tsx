'use client'

import { type Post } from '@/lib/posts'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { title, date, category, path, thumbnail } = post

  const [imgSrc, setImgSrc] = useState(
    thumbnail || '/images/thumbnail_fallback.png'
  )

  // 날짜 포맷팅 함수
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Link href={`/posts/${path}`} className="group">
      <article className="h-full flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
        {/* 이미지 컨테이너 - 비율 유지 */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
            onError={() => setImgSrc('/images/thumbnail_fallback.png')}
          />
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex flex-col flex-grow p-4">
          {/* 카테고리 뱃지 */}
          <div className="mb-2">
            <span className="inline-block text-xs font-medium rounded-full bg-green-100 text-green-800 px-3 py-1">
              {category}
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {title}
          </h3>

          {/* 날짜 - 하단 고정 */}
          <time
            className="text-sm text-gray-500 mt-auto"
            dateTime={typeof date === 'string' ? date : date.toISOString()}
          >
            {formatDate(date)}
          </time>
        </div>
      </article>
    </Link>
  )
}
