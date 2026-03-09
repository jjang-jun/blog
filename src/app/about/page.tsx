import { Metadata } from 'next'
import Image from 'next/image'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { getLinks } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'About | jjangjun',
  description:
    '장준혁의 소개 페이지입니다. 지금 하고 있는 일, 블로그에 대해, 그리고 일상.',
  openGraph: {
    title: 'About | jjangjun',
    description:
      '장준혁의 소개 페이지입니다. 지금 하고 있는 일, 블로그에 대해, 그리고 일상.',
  },
}

const ICONS: Record<string, React.ReactNode> = {
  github: <AiFillGithub size={24} />,
  linkedin: <AiFillLinkedin size={24} />,
}

const SECTIONS = [
  {
    title: '지금',
    content: [
      '삼성 청년 SW 아카데미(SSAFY)를 수료하고 금융권에 입사해 뱅킹 앱의 인증 시스템과 홈 화면을 만들고 있습니다. JSP/Java 레거시를 유지하면서, React로의 전환을 준비하고 있습니다.',
      <>
        요즘은 AI 에이전트에 빠져있습니다. 경제지표를 수집하고 요약해서 알림을
        보내주는{' '}
        <a
          href="https://github.com/jjang-jun/economic-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 underline hover:text-primary-600"
        >
          economic-agent
        </a>
        와 사주 앱을 조금씩 만들고 있습니다.
      </>,
    ],
  },
  {
    title: '이 블로그에 대해',
    content: [
      '실무에서 마주친 문제와 그 해결 과정을 씁니다. 왜 이렇게 만들었는지, 왜 이 선택이 틀렸는지 — 결정의 배경을 솔직하게 기록합니다.',
    ],
  },
  {
    title: '일상',
    content: [
      '래그돌 고양이와 함께 삽니다. 볼더링으로 몸을 쓰고, 투자와 AI 에이전트로 머리를 씁니다.',
    ],
  },
]

export default async function About() {
  const links = await getLinks()

  return (
    <section className="px-6 py-10 md:px-8 md:py-16">
      {/* 프로필 영역 */}
      <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <Image
          src="/images/avatar.jpg"
          width={120}
          height={120}
          alt="장준혁 프로필 이미지"
          className="mx-auto mb-4 rounded-full border-2 border-primary-200"
        />
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          장준혁
          <span className="ml-2 text-lg font-normal text-gray-400 md:text-xl">
            junhyeok jang
          </span>
        </h1>
        <p className="mt-3 text-gray-500">
          이해한 것만 만듭니다. 그래서 가끔 오래 걸립니다.
        </p>

        {/* 소셜 링크 */}
        <div className="mt-5 flex justify-center gap-3">
          {links.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-500"
            >
              {ICONS[name]}
            </a>
          ))}
        </div>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="mx-auto max-w-2xl">
        {SECTIONS.map((section, index) => (
          <div key={section.title}>
            {index > 0 && <hr className="mb-10 border-gray-200 md:mb-14" />}
            <div className="mb-10 md:mb-14">
              <h2 className="mb-4 text-lg font-bold text-primary-500 md:text-xl">
                {section.title}
              </h2>
              <div className="space-y-3 pl-4">
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-base leading-relaxed text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
