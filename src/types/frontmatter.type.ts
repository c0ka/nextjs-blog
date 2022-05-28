type FrontMatter = {
  title: string
  description: string
  author: string
  tags?: string[]
  date: string
  toc_depth? : number
  thumb?: string
  coverImage?: string
  excerpt?: string
  ogImage?: { url: string }
  content?: string
  image?: string
  logo?: string
  hideAuthor?: boolean
}

export default FrontMatter