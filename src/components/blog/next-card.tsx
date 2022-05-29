import Link from 'next/link'
import PostType from '../../types/post.type'

export default function NextCard({ post, label, className }: {
  post: PostType
  label?: string
  className?: string
}) {

  return (
    <Link href={`/blog/${post.url}`}>
      <div className={className}>
        <div className="border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-300 cursor-pointer rounded border p-6 transition shadow-md">
          <div className="space-y-4">
            <p className="text-sm">{label}</p>
            <div>
              <h4 className="text-slate-900 text-lg">{post.frontMatter.title}</h4>
              <p className="text-sm">{post.frontMatter.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )

}