import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import { parseISO, format } from 'date-fns';

import { getSortedPostsData } from 'lib/posts';

import { H1 } from 'components/heading/Heading';
import Date from 'components/date/Date';

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {

  return (
    <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <H1>home</H1>

    <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              
              <br />
              {id}
              <br />
              <Date dateString={date} />
            </li>
          )
          )}
          
        </ul>
      </section>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
