import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

import Layout, { siteTitle } from '../components/layout'

export default function Home() {

  useEffect(() => {
    localStorage.setItem('theme', 'light')
  })
  
  return (
    <Layout hideFooter={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="prose prose-slate dark:prose-invert">
        <p>
          Hello, I&apos;m <b>Julian</b>. I&apos;m a international traveler and a translator
          (English/Chinese). You can contact me on <a href="email:julianhy@outlook.com">Email</a>.
        </p>
        <p>
          (This is a sample website - you&apos;ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
