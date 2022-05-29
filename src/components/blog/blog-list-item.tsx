import Image from "next/image";

import PostType from "../../types/post.type";

interface Props {
  post: PostType
}

export default function BlogListItem({ post }: Props) {
  return (
    <div>
      <a href={`/blog/${post.url}`}>
        <div className="group inline-block min-w-full">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <div className="border border-slate-100 relative mb-4 h-60 w-full overflow-auto rounded-lg shadow-sm">
                <Image 
                  layout="fill"
                  src={ !post.frontMatter.thumb 
                    ? `/images/blog/blog-placeholder.png`
                    : post.frontMatter.thumb}
                  objectFit="cover"
                  className="scale-100 transform duration-100 ease-in group-hover:scale-105"
                  alt=""
                />
              </div>

              <h3 className="text-slate-900 max-w-sm text-xl">{post.frontMatter.title}</h3>
              {post.frontMatter.date && <p className="text-slate-700 text-xs">{post.frontMatter.date}</p>}
              <p className="text-slate-700 max-w-sm text-base">{post.frontMatter.description}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}