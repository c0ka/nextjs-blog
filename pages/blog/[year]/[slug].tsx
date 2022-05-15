import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from "rehype-slug";
import dynamic from 'next/dynamic'

import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'

import PostType from '../../../types/post-type'
import Layout from '../../../components/layout'
import { getAllPostPaths, getPostData, getSortedPostsData } from '../../../lib/posts'

// table of contents extractor
const toc = require('markdown-toc')

// Define custom components/renderers to pass to MDX,
// then pass property `components={components}` into <MDXRemote />
// const components = {
//   a: CustomLink,
//   TestComponent: dynamic(() => import('../../../components/footer')),
// }


// todo: display toc snippet
export default function PostPage({
  mdxSource, toc
}) {
  return (
    <Layout>
      <Head>
        <title>{mdxSource.frontmatter.title}</title>
      </Head>
      <article className="prose prose-slate dark:prose-invert">
        <h1>{mdxSource.frontmatter.title}</h1>
        <div className="mb-4">
          {mdxSource.frontmatter.date}
        </div>
        <div className="wrapper">
          <MDXRemote {...mdxSource} lazy />
        </div>
      </article>
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
export const getStaticProps: GetStaticProps = async function ({ params }: any) {
  const postContent = await getPostData(params.slug, '_blog')

  const mdxSource = await serialize(postContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    parseFrontmatter: true,
  })

  const relatedPosts = getSortedPostsData('_blog', 5, (mdxSource.frontmatter as PostType).tags)

  const allPosts = getSortedPostsData('_blog')

  const currentIndex = allPosts.map( e => e.slug ).indexOf(params.slug)

  const nextPost = allPosts[currentIndex + 1]
  const prevPost = allPosts[currentIndex - 1]

  return { props: {
    slug: params.slug,
    mdxSource,
    toc: toc(postContent, { maxdepth: (mdxSource.frontmatter as PostType).toc_depth?? 2 }),
    prevPost: currentIndex === 0 ? null : prevPost ? prevPost : null,
    nextPost: currentIndex === allPosts.length ? null : nextPost ? nextPost : null,
    relatedPosts,
    }
  }
}
