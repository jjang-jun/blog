import Link from 'next/link'

import { Post } from '@/lib/posts'

type Props = { post: Post; width?: string }

export default function PostCard({
  post: { title, date, category, path },
  width,
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article
        className={`rounded-md overflow-hidden shadow-md hover:shadow-xl bg-white ${
          width && `w-[${width}px]`
        }`}
      >
        <Image
          src={`/images/posts/${path}.jpeg`}
          className="w-full"
          alt={title}
          width={300}
          height={200}
        />
        <div className="flex flex-col items-center p-4">
          <time className="self-end text-gray-700">{date.toString()}</time>
          <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
          <span className="text-sm rounded-lg bg-green-100 px-2 my-2">
            {category}
          </span>
        </div>
      </Link>
    </li>
  )
}
