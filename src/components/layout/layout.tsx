import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useTheme } from '../../lib/theme.provider'
import Footer from './footer'
import Nav from './nav'

export const siteTitle = 'Next.js Sample Website'

interface Props {
  hideHeader?: boolean
  hideFooter?: boolean
  children: React.ReactNode
}

export default function Layout(props: Props) {
  const { hideHeader = false, hideFooter = false, children } = props

  // useTheme()

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(siteTitle)}
            .png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg
          `}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {!hideHeader && <Nav />}
      
      <main className="container max-w-screen-xl mx-auto">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </>
  )
}
