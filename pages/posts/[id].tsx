import Head from "next/head";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import Date from "../../components/date";
import Layout from "../../components/layout";

import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>        
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async function() {
  const paths = getAllPostIds()
  
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps  = async function({ params }) {
  const postData = await getPostData(params.id as string)

  return {
    props: {
      postData
    }
  }
}