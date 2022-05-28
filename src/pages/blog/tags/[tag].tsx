import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../../components/layout'
import { getAllCategories, getSortedPostsData } from '../../../lib/posts'

import BlogListItem from '../../../components/blog-list-item'
import PostType from '../../../types/post.type'

type PropsType = {
  tag: string
  blogs: PostType[]
}

export default function TagBlogsPage(props: PropsType) {
  const { tag, blogs } = props
  
  return (
    <Layout>
      <Head>
        <title>{`Blog | ${tag}`}</title>
      </Head>
      <div className="container mx-auto px-8 py-16 sm:px-16 xl:px-20">
          <div className="flex space-x-1 text-slate-900 font-medium">
            <p className="cursor-pointer">
              <Link href="/blog">Blog</Link>
            </p>
            <p>/</p>
            <p>{`${tag}`}</p>
          </div>
          <ol className="grid grid-cols-12 gap-8 py-16 lg:gap-16">
            {blogs.map((blog: PostType, idx: number) => (
              <div key={idx} className="col-span-12 mb-16 md:col-span-12 lg:col-span-6 xl:col-span-4">
                <BlogListItem post={blog}  />
              </div>
            ))}
          </ol>
        </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories('_blog')
  
  return {
    paths: categories.map(category => ({ params: { tag: category } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const posts = await getSortedPostsData('_blog', 0, [params.tag])

  return {
    props: {
      tag: params.tag,
      blogs: posts,
    }
  }
}