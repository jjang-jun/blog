import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { getAuthor, getLinks } from '@/lib/metadata'
import { IconType } from 'react-icons'

const ICON_MAP: Record<string, IconType> = {
  github: AiFillGithub,
  linkedin: AiFillLinkedin,
}

export default async function Footer() {
  const [author, links] = await Promise.all([getAuthor(), getLinks()])

  return (
    <footer className="mx-auto max-w-2xl px-6 md:px-8">
      <div className="border-t border-gray-200 py-6 flex flex-col items-center gap-3">
        <nav aria-label="소셜 링크">
          <ul className="flex gap-4">
            {links.map((link) => {
              const Icon = ICON_MAP[link.name]
              return (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="text-2xl text-gray-600 hover:text-primary-500 transition-colors"
                  >
                    {Icon && <Icon />}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <p className="text-sm text-gray-500">
          {`\u00A92023-${new Date().getFullYear()} ${author} All Rights Reserved.`}
        </p>
      </div>
    </footer>
  )
}
