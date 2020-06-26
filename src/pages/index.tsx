import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import { getSortedPostsData } from 'lib/posts';

import { Container } from 'components/container/Container';
import { H1, H2, H3 } from 'components/heading/Heading';
import { Section } from 'components/section/Section';
import { Cards, Card } from 'components/cards/Cards';

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    description: string;
  }[]
}) {

  const renderPosts = () => {
    return 
  }

  return (
    <>
      <Head>
        <title>Next-js starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section container as="div">
        <H1>Next-js starter</H1>
      </Section>

      <Section container>
      
        <H2>Card grid</H2>
        <Cards>
          {allPostsData.map(({ id, date, title, description }) => (
            <Card
              key={id}
              heading={
                <Link href="/posts/[id]" as={`/posts/${id}`}><a>{title}</a></Link>
              }
              date={date}
            >
              <div>{description}</div>
            </Card>
          ))}
          
        </Cards>
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
