import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import Image from 'next/image'

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: true,
}

const components = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      className="w-full max-h-60 object-cover"
      src={props.src || ''}
      alt={props.alt || ''}
      width={500}
      height={350}
    />
  ),
}

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
        components={components}
      />
    </div>
  )
}
