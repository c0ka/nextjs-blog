import Link from 'next/link'

export default function NextCard(props: any) {
  const { post, label, className } = props

  return (
    <Link href={`/blog/${post.url}`}>
      <div className={className}>
        <div className="border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-300 cursor-pointer rounded border p-6 transition">
          <div className="space-y-4">
            <p className="text-sm">{label}</p>
            <div>
              <h4 className="text-slate-900 text-lg">{post.title}</h4>
              <p className="text-sm">{post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )

}