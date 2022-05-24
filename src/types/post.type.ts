import Author from './author.type'
import FrontMatter from './frontmatter.type'

type PostType = {
  slug: string
  readingTime: string
  url: string
  frontMatter: FrontMatter
  compiledSource: string
  scope: Record<string,unknown> | undefined
  toc?: any
  prevPost?: PostType
  nextPost?: PostType
  relatedPosts?: PostType[]
}

export default PostType
