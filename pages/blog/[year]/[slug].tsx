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

export default function PostPage({
  source, postData
}: { source: any, postData: PostType }) {
  return (
    <Layout hideHeader={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className="prose prose-slate dark:prose-invert">
        <h1>{postData.title}</h1>
        <div>
          postdata.date
        </div>
        <div>
          <MDXRemote {...source} />
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
  const { data, content } = matter(postContent)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    scope: data
  })

  return {
    props: {
      source: mdxSource,
      postData: data,
    },
  }
}
