import Info from '@/components/Info'
import RecentPosts from '@/components/RecentPosts'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `jjangjun's blog`,
    description: '모호함을 지양하는 개발자의 기록',
  }
}

export default function Home() {
  return (
    <>
      <Info />
      <RecentPosts />
    </>
  )
}
