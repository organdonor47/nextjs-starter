import { parseISO, format } from 'date-fns';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  const dateString = parseISO(postData.date);

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <time dateTime={dateString.toString()}>{format(dateString, 'LLLL d, yyyy')}</time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
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