import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from "rehype-slug";

import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import PostType from '../../../types/post.type'
import Layout from '../../../components/layout'
import { getAllPostPaths, getPostData, getSortedPostsData } from '../../../lib/posts'
import NextCard from '../../../components/next-card'
import { FileTextIcon } from '@radix-ui/react-icons'

// table of contents extractor
const toc = require('markdown-toc')

// Define custom components/renderers to pass to MDX,
// then pass property `components={components}` into <MDXRemote />
// const components = {
//   a: CustomLink,
//   TestComponent: dynamic(() => import('../../../components/footer')),
// }


// todo: display toc snippet
type propsType = {
  post: {
    slug: string
    source: string
    frontMatter: PostType
    scope?: Record<string,unknown>
    toc?: any
  }
  prevPost?: PostType
  nextPost?: PostType
  relatedPosts?: PostType[]
}

export default function PostPage( props: propsType ) {
  const { post, prevPost, nextPost, relatedPosts } = props
  const authorArray = post.frontMatter.author?.split(',')

  return (
    <Layout>
      <Head>
        <title>{post.frontMatter.title}</title>
      </Head>
      <div className="container max-w-screen-xl mx-auto px-8 py-16 sm:px-16 xl:px-20">
            {/* Title and description */}
            <header className="mb-16 max-w-5xl space-y-4">
              <p className="text-violet-700 font-bold">Blog post</p>
              <h1 className="text-3xl text-slate-700 font-medium font-serif">
                {post.frontMatter.title}
              </h1>
              <div className="text-sm">
                <p>{post.frontMatter.date}</p>
              </div>
              {(!post.frontMatter.hideAuthor) &&
              <div className="flex gap-3">
                {authorArray?.map((author: string, idx: number) => {
                  return (
                    <div key={idx} className="text-sm mb-8 mr-4 w-max lg:mb-0">
                      {author}
                    </div>
                  )
                })}
              </div>}
            </header>
            <div className="grid grid-cols-12 gap-8">
              {/* Content */}
              <main className="col-span-full lg:col-span-8">
                {post.frontMatter.thumb && (
                  <div className="relative mb-8 h-96 w-full overflow-auto rounded border">
                    <Image 
                      src={'/image/blog/' + post.frontMatter.thumb} 
                      layout="fill" objectFit="cover" alt="thumb of blog post"
                    />
                  </div>
                )}
                <article className="prose prose-slate dark:prose-invert max-w-none">
                  <MDXRemote compiledSource={post.source} scope={post.scope} lazy />
                </article>
                <div className="py-16">
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    Share this article
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <Link
                      passHref
                      href={`https://twitter.com/share?text=${post.frontMatter.title}&url=${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`}
                    >
                      <a target="_blank" className="text-slate-500 hover:text-slate-700">
                        <svg
                          height="26"
                          width="26"
                          viewBox="-89 -46.8 644 446.8"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                        >
                          <path
                            d="m154.729 400c185.669 0 287.205-153.876 287.205-287.312 0-4.37-.089-8.72-.286-13.052a205.304 205.304 0 0 0 50.352-52.29c-18.087 8.044-37.55 13.458-57.968 15.899 20.841-12.501 36.84-32.278 44.389-55.852a202.42 202.42 0 0 1 -64.098 24.511c-18.42-19.628-44.644-31.904-73.682-31.904-55.744 0-100.948 45.222-100.948 100.965 0 7.925.887 15.631 2.619 23.025-83.895-4.223-158.287-44.405-208.074-105.504a100.739 100.739 0 0 0 -13.668 50.754c0 35.034 17.82 65.961 44.92 84.055a100.172 100.172 0 0 1 -45.716-12.63c-.015.424-.015.837-.015 1.29 0 48.903 34.794 89.734 80.982 98.986a101.036 101.036 0 0 1 -26.617 3.553c-6.493 0-12.821-.639-18.971-1.82 12.851 40.122 50.115 69.319 94.296 70.135-34.549 27.089-78.07 43.224-125.371 43.224a204.9 204.9 0 0 1 -24.078-1.399c44.674 28.645 97.72 45.359 154.734 45.359"
                            fillRule="nonzero"
                          />
                        </svg>
                      </a>
                    </Link>

                    <Link
                      passHref
                      href={`https://www.linkedin.com/shareArticle?url=${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}&title=${post.frontMatter.title}`}
                    >
                      <a target="_blank" className="text-slate-500 hover:text-slate-700">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 5 1036 990"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                        >
                          <path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>  
                {prevPost && <NextCard post={prevPost} label="Last post"/>}
                {nextPost && <NextCard post={nextPost} label="Next post" className="text-right"/>}
              </main>
              {/* Sidebar */}
              <div className="col-span-full lg:col-span-4">
                <div className="space-y-8 lg:sticky lg:top-16 lg:mb-16">
                  <div className="hidden lg:block">
                    {/* tag links */}
                    <div className="space-x-2 mb-8">
                      {post.frontMatter.tags?.map((tag: string) => {
                        return (
                          <Link href={`/blog/tags/${tag}`} key={`related-tag-${tag}`}>
                            <a className="rounded-xl border px-2 py-1 text-xs font-bold text-violet-700 border-violet-400 bg-violet-400/10">
                              {tag}
                            </a>
                          </Link>
                        )
                      })}
                    </div>
                    {/* toc list */}
                    <div className="prose prose-slate prose-sm prose-a:no-underline prose-a:text-slate-700">
                      <h4>On this page</h4>
                      <ReactMarkdown>{post.toc.content}</ReactMarkdown>
                    </div>
                  </div>
                  {/* related posts */}
                  <div  className="prose prose-slate prose-sm no-underline font-medium">
                    <h4>Related articles</h4>
                    <div className="space-y-3">
                      {relatedPosts && relatedPosts.map((post, idx) => (
                        <Link href={`/blog/${post.url}`} key={idx}>
                          <div className="group cursor-pointer hover:text-slate-900">
                              <div className="flex gap-2 items-start">
                                <FileTextIcon fill="currentColor" className="flex-none mt-[3px]"/>
                                <span className="group-hover:text-slate-900 text-sm">
                                  {post.title}
                                </span>
                              </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async function () {
  const paths = getAllPostPaths('_blog')

  return {
    paths,
    fallback: false,
  }
}

// todo: lazy hydration in serialize
// todo: add params type: GetStaticPropsContext
export const getStaticProps: GetStaticProps = async function ({ params }: any) {
  const postContent = await getPostData(params.slug, '_blog')

  const { frontmatter, compiledSource, scope } = await serialize(postContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    parseFrontmatter: true,
  })

  const relatedPosts = getSortedPostsData('_blog', 5, (frontmatter as PostType).tags)

  const allPosts = getSortedPostsData('_blog')

  const currentIndex = allPosts.map( e => e.slug ).indexOf(params.slug)

  const nextPost = allPosts[currentIndex + 1]
  const prevPost = allPosts[currentIndex - 1]

  return { props: {
    post: {
      slug: params.slug,
      frontMatter: frontmatter,
      source: compiledSource,
      scope,
      toc: toc(postContent, { maxdepth: (frontmatter as PostType).toc_depth?? 2 }),
    },
    prevPost: currentIndex === 0 ? null : prevPost ? prevPost : null,
    nextPost: currentIndex === allPosts.length ? null : nextPost ? nextPost : null,
    relatedPosts,
    }
  }
}
