'use client'

import { useState } from 'react'
import { AiOutlineShareAlt, AiOutlineCheck } from 'react-icons/ai'

export default function ShareButton({
  title,
  url,
}: {
  title: string
  url: string
}) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${url}`

    if (navigator.share) {
      await navigator.share({ title, url: fullUrl })
      return
    }

    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      aria-label="공유하기"
      className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors"
    >
      {copied ? <AiOutlineCheck /> : <AiOutlineShareAlt />}
      <span>{copied ? '복사됨' : '공유'}</span>
    </button>
  )
}
