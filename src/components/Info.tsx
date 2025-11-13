import { getTitle, getAuthor, getLinks } from '@/lib/metadata'
import Image from 'next/image'
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const ICONS: any = {
  github: <AiFillGithub size={25} />,
  facebook: <AiFillFacebook size={25} />,
  linkedin: <AiFillLinkedin size={25} />,
}

export default async function Info() {
  const title = await getTitle()
  const author = await getAuthor()
  const LINKS = await getLinks()

  return (
    <section
      className={`flex flex-col md:flex-row items-center justify-center my-8`}
    >
      <Image
        src="/images/avatar.jpg"
        width={150}
        height={150}
        alt="avatar"
        className="border rounded-full md:mr-8"
      />

      <div className="">
        <div className="flex justify-center items-center mb-2">
          <h2 className="text-xl font-bold mr-1">@{author}</h2>
          <ul className="flex gap-1">
            {LINKS &&
              LINKS.map(({ name, url }) => (
                <li key={url}>
                  <a href={url} target="_blank">
                    {ICONS[name]}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <h3 className="text-md">{title}</h3>
      </div>
    </section>
  )
}
