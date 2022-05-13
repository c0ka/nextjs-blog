import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'
import { GetStaticProps } from 'next'

interface PostData {
  date: string
  title: string
  id: string
}

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-xl leading-8">
        <p>
          Hello, I&apos;m <b>Julian</b>. I&apos;m a international traveler and a translator
          (English/Chinese). You can contact me on <a href="email:julianhy@outlook.com">Email</a>.
        </p>
        <p>
          (This is a sample website - you&apos;ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className="text-lg pt-[1px]">
        <h2 className="text-2xl my-4">Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className="mb-5" key={id}>
              <Link href={`/posts/${id}`}>
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
