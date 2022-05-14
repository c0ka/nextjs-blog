import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import Date from '../../components/date'
import Layout from '../../components/layout'

import { getAllPostIds, getPostData } from '../../lib/posts'
import { useEffect } from 'react'

export default function Post({
  postData,
}: {
  postData: {
    id: string
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout hideHeader={true}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className="prose prose-slate dark:prose-invert">
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async function () {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
  const postData = await getPostData(params!.id as string)

  return {
    props: {
      postData,
    },
  }
}
