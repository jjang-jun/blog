'use client'

import { AiFillGithub } from 'react-icons/ai'

const LINKS = [{ icon: <AiFillGithub />, url: 'https://github.com/95rolancia' }]

export default function Footer() {
  return (
    <footer className="flex flex-col items-center my-2">
      <ul className="flex gap-4 mb-2">
        {LINKS.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-sky-400"
          >
            {link.icon}
          </a>
        ))}
      </ul>

      <p className="text-sm text-center">
        {`\u00A92023-${new Date().getFullYear()} jjangjun All Rights Reserved.`}
      </p>
    </footer>
  )
}
