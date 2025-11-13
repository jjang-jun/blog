'use client'

import Image from 'next/image'
import Navbar from './Navbar'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex">
      <div className="flex justify-between items-center w-full p-3">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              width="100"
              height="70"
              alt="logo"
              priority
            />
          </Link>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
    </header>
  )
}
