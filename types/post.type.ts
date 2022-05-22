import Author from './author.type'

// todo: include author infos?
type PostType = {
  slug?: string
  title: string
  description: string
  url: string,
  toc_depth? : number
  thumb?: string
  date?: string
  coverImage?: string
  author?: string
  excerpt?: string
  ogImage?: { url: string }
  content?: string
  image?: string
  readingTime?: string
  tags?: string[]
  logo?: string
  hideAuthor?: boolean
}

export default PostType
