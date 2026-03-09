'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="px-6 md:px-8">
      <div className="flex justify-between items-center mx-auto max-w-2xl py-3">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width="100"
            height="70"
            alt="logo"
            priority
          />
        </Link>
        <Link href="/about">
          <Image
            src="/images/avatar.jpg"
            width={36}
            height={36}
            alt="About"
            className="rounded-full border border-gray-200 hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
    </header>
  )
}
