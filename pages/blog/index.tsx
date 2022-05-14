import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { getSortedPostsData } from '../../lib/posts'
import PostType from '../../types/post'
import Layout from '../../components/layout'

export default function Home({ allPostsData }: { allPostsData: PostType[] }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Egotour</title>
      </Head>
      <section className="prose prose-slate dark:prose-invert">
        <h2 className="text-2xl my-4">Blog</h2>
        <ul>
          {allPostsData.map(({ slug, date, title, tags, url }) => (
            <li className="mb-5" key={slug}>
              <Link href={`/blog/${url}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-slate-600">
                {date}
                <br />
                tags: {tags?.join(', ')}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData: PostType[] = getSortedPostsData('_blog')

  return {
    props: {
      allPostsData,
    },
  }
}
