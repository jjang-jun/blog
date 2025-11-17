import { Noto_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: "jjangjun's blog",
  description: "jjangjun's blog",
}

const notoSans = Noto_Sans({ subsets: ['latin'], weight: '500' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSans.className}>
      <body className={`flex flex-col h-full w-full mx-auto max-w-screen-lg`}>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
