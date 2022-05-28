import { readFile, readdir } from 'fs/promises'
import path from 'path'

import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from "rehype-slug";

import FrontMatter from '../types/frontmatter.type'
import PostType from '../types/post.type'
import { generateReadingTime } from '../lib/helpers'

// table of contents extractor
const markdownToc = require('markdown-toc')

// store different type of posts in corresponding directory
type PostsDirectory = '_blog' | '_reserved'

export async function getSortedPostsData(directory: PostsDirectory, limit?: number, tags?: string[])
  : Promise<PostType[]> {
  // Finding directory from the current working directory of Node
  const postsDirectory = path.join(process.cwd(), directory)

  // Read all files in the post directory
  const fileNames = await readdir(postsDirectory)

  let allPostsData = await Promise.all( fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')

    const postContent = await getPostContent(slug, directory)

    return {
      ...postContent,
    }
  }))

  // Sort all posts' data
  allPostsData = allPostsData.sort((a, b) => {
    if (new Date(a.frontMatter.date) < new Date(b.frontMatter.date)) {
      return 1
    } else if (a.frontMatter.date > b.frontMatter.date) {
      return -1
    } else {
      return 0
    }
  })

  if (tags) {
    allPostsData = allPostsData.filter((post) => {
      const found = tags.some((tag) => post.frontMatter.tags?.includes(tag))
      return found
    })
  }

  if (limit) allPostsData = allPostsData.slice(0, limit)

  return allPostsData
}


export async function getAllPostPaths(directory: PostsDirectory) {
  //Finding directory named "blog" from the current working directory of Node.
  const postDirectory = path.join(process.cwd(), directory)

  const fileNames = await readdir(postDirectory)

  const files = Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')

    // Extract content of each MDX file
    const filePath = path.join(postDirectory, fileName)
    const fileContent = await readFile(filePath, 'utf8')
    const { frontmatter } = await serialize(fileContent, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
      parseFrontmatter: true,
    })

    const frontMatter = frontmatter as FrontMatter

    return {
      params: {
        year: new Date(frontMatter.date).getFullYear().toString(),
        slug: slug
      }
    }
  }))

  return files
}

export const getAllCategories = async (directory: PostsDirectory) => {
  const posts = await getSortedPostsData(directory)
  let categories: Array<string> = []

  posts.map( post => {
    post.frontMatter.tags?.map( tag => {
      if (!categories.includes(tag)) return categories.push(tag)
    })
  })

  return categories
}

export const getPostContent = async (slug: string, directory: string): Promise<PostType> => {
  // Finding directory from the current working directory of Node
  const postsDirectory = path.join(process.cwd(), directory)

  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  const file = await readFile(filePath, 'utf8')
  const { compiledSource, scope, frontmatter } = await serialize(file, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    parseFrontmatter: true,
  })

  const frontMatter = frontmatter! as FrontMatter

  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const formattedDate = new Date(frontMatter!.date).toLocaleDateString(['zh-CN','en-US'], options)

  const readingTime = generateReadingTime(compiledSource)
  // build post's url based on date of frontmatter
  const url = `${new Date(frontMatter!.date).getFullYear().toString()}/${slug}`

  return {
    slug,
    readingTime,
    url,
    frontMatter: {
      ...frontMatter,
      date: formattedDate,
    },
    toc: markdownToc(file, { maxdepth: frontMatter.toc_depth?? 2 }),
    compiledSource,
    scope,
  }
}
