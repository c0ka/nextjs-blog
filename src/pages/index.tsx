import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { HeroWithPic } from '../components/hero'

import Layout, { siteTitle } from '../components/layout/layout'

export default function HomePage() {

  useEffect(() => {
    localStorage.setItem('theme', 'light')
  })
  
  return (
    <Layout hideFooter={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <HeroWithPic />
      <div className="w-full max-w-3xl mx-auto">
        <section className="prose prose-slate dark:prose-invert mx-auto mt-20">
          <p>
            Hello, I&apos;m <b>Julian</b>. I&apos;m a international traveler and a translator
            (English/Chinese). You can contact me on <a href="email:julianhy@outlook.com">Email</a>.
          </p>
          <p>
            (This is a sample website - you&apos;ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
      </div>
    </Layout>
  )
}
