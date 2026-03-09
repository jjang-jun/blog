'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const paths = [
  {
    label: 'About',
    href: '/about',
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full">
      <ul className="flex">
        {paths.map((path) => (
          <li
            key={path.href}
            className={`hover:text-primary-500 rounded-sm p-2 mr-2
              ${pathname === path.href ? 'text-primary-500 font-bold' : ''}`}
          >
            <Link href={path.href}>{path.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
