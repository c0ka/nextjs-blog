import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../../components/layout'
import { getSortedPostsData } from '../../lib/posts'
import Date from '../../components/date'
import { GetStaticProps } from 'next'

interface PostData {
  date: string
  title: string
  id: string
}

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Egotour</title>
      </Head>
      <section className="prose prose-slate dark:prose-invert">
        <h2 className="text-2xl my-4">Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className="mb-5" key={id}>
              <Link href={`/blog/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-slate-600">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData: PostData[] = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}
