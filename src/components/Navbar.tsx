'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const paths = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Posts',
    href: '/posts',
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full">
      <ul className="flex 'flex-col">
        {paths.map((path) => (
          <li
            key={path.href}
            className={`hover:bg-sky-400 rounded-sm p-2 mr-2
              ${pathname === path.href ? 'bg-sky-400 ' : ''}`}
          >
            <Link href={path.href}>{path.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
