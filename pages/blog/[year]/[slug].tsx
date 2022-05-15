import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from "rehype-slug";
import dynamic from 'next/dynamic'

import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'

import PostType from '../../../types/post'
import Layout from '../../../components/layout'
import { getAllPostPaths, getPostData } from '../../../lib/posts'

// Define custom components/renderers to pass to MDX,
// then pass property `components={components}` into <MDXRemote />
// const components = {
//   a: CustomLink,
//   TestComponent: dynamic(() => import('../../../components/footer')),
// }

const toc = require('markdown-toc')

export default function PostPage({
  mdxSource, toc
}) {
  return (
    <Layout hideHeader={false}>
      <Head>
        <title>{mdxSource.frontmatter.title}</title>
      </Head>
      <article className="prose prose-slate dark:prose-invert">
        <h1>{mdxSource.frontmatter.title}</h1>
        <div>
          {mdxSource.frontmatter.date}
        </div>
        <div>
          <MDXRemote {...mdxSource} />
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

export const getStaticProps: GetStaticProps = async function ({ params }: any) {
  const postContent = await getPostData(params.slug, '_blog')

  const mdxSource = await serialize(postContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    parseFrontmatter: true,
  })

  const tocMaxDepth = (mdxSource.frontmatter as PostType).toc_depth?? 2

  return { props: {
    mdxSource,
    toc: toc(postContent, { maxdepth: tocMaxDepth }),
    }
  }
}
