import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllPostIds, getPostData } from 'lib/posts';
import { H1 } from 'components/heading/Heading';
import { Section } from 'components/section/Section';
import { RichText } from 'components/rich-text/RichText';

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Section as="article" container>
        <H1>{postData.title}</H1>
        <time>{postData.date}</time>
        <RichText html={postData.contentHtml} />
      </Section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}