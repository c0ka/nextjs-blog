import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

import PostType from '../types/post-type'
import { generateReadingTime } from '../lib/helpers'

// store different type of posts in corresponding directory
type PostsDirectory = '_blog' | '_reserved'

export function getSortedPostsData(directory: PostsDirectory, limit?: number, tags?: string[])
  : PostType[] {
  // Finding directory from the current working directory of Node
  const postsDirectory = path.join(process.cwd(), directory)

  // Read all files in the post directory
  const fileNames = fs.readdirSync(postsDirectory)

  let allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')

    // Extract content of each MDX file
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    // format date of each file
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = new Date(data.date).toLocaleDateString(['zh-CN','en-US'], options)

    const readingTime = generateReadingTime(content)
    // build post's url based on date of frontmatter
    const url = `${new Date(data.date).getFullYear().toString()}/${slug}`

    return {
      ...data,
      date: formattedDate,
      readingTime,
      slug,
      url: url,
    }
  })

  // Sort all posts' data
  allPostsData = allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else if (a.date > b.date) {
      return -1
    } else {
      return 0
    }
  })

  if (tags) {
    allPostsData = allPostsData.filter((post: any) => {
      const found = tags.some((tag) => post.tags.includes(tag))
      return found
    })
  }

  if (limit) allPostsData = allPostsData.slice(0, limit)

  return allPostsData as PostType[]
}


export function getAllPostPaths(directory: PostsDirectory) {
  //Finding directory named "blog" from the current working directory of Node.
  const postDirectory = path.join(process.cwd(), directory)

  const fileNames = fs.readdirSync(postDirectory)

  const files = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')

    // Extract content of each MDX file
    const filePath = path.join(postDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
      params: {
        year: new Date(data.date).getFullYear().toString(),
        slug: slug
      }
    }
  })

  return files
}

export async function getPostData(slug: string, directory: string) {
  // Finding directory from the current working directory of Node
  const postsDirectory = path.join(process.cwd(), directory)

  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  const postContent = fs.readFileSync(fullPath, 'utf-8')

  return postContent
}
