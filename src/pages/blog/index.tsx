import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { getSortedPostsData } from '../../lib/posts'
import PostType from '../../types/post.type'
import Layout from '../../components/layout/layout'

export default function BlogsPage({ allPostsData }: { allPostsData: PostType[] }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Egotour</title>
      </Head>
      <div className="container max-w-3xl mx-auto">
        <section className="prose prose-slate dark:prose-invert">
          <h2 className="text-2xl my-4">Blog</h2>
          <ul>
            {allPostsData.map(({ slug, url, frontMatter }) => (
              <li className="mb-5" key={slug}>
                <Link href={`/blog/${url}`}>
                  <a>{frontMatter.title}</a>
                </Link>
                <br />
                <small className="text-slate-600">
                  {frontMatter.date}
                  <br />
                  tags: {frontMatter.tags?.join(', ')}
                </small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData('_blog')

  return {
    props: {
      allPostsData,
    },
  }
}
