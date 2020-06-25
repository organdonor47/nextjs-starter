import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import { getSortedPostsData } from 'lib/posts';

import Date from 'components/date/Date';

import { Container } from 'components/container/Container';
import { H1, H2, H3 } from 'components/heading/Heading';
import { Section } from 'components/section/Section';

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
        <title>Next-js starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section container as="span">
        <H1>Next-js starter</H1>
      
        <Container>
          <H2>Blog</H2>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <H3>
                  <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                </H3>
                
                <br />
                {id}
                <br />
                <Date dateString={date} />
              </li>
            )
            )}
            
          </ul>
        </Container>
      </Section>
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
