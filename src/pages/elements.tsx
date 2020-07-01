import Head from 'next/head';
import { GetStaticProps } from 'next';

import { getSortedPostsData } from 'lib/posts';

import { Container } from 'components/container/Container';
import { H1, H2, H3 } from 'components/heading/Heading';
import { Link } from 'components/link/Link';
import { RichText } from 'components/rich-text/RichText';
import { Section } from 'components/section/Section';


// demo components
import { Cards, Card } from 'components/demos/cards/Cards';
import { Hero } from 'components/demos/hero/Hero';
import { Button } from 'components/button/Button';
import { Grid } from 'components/grid/Grid';

export default function Elements({
  allPostsData
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    description: string;
  }[]
}) {
  return (
    <>
      <Head>
        <title>Elements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section container>
        <H1>
          Elements page
        </H1>
      </Section>

      <Section>

        <Container>
          <H2 as="h2">Basic grid column span usage</H2>
        

          <RichText style={{ paddingBottom: '2em'}}>
            <p>Uses the <code>@grid</code> and <code>@grid-item</code> scss mixins to lay out elements on the page.</p>
          </RichText>
        </Container>

        <Hero title="Title: no columns defined">
          <strong>kids here!</strong> Maecenas est ligula, consequat suscipit malesuada sit amet, tristique quis lorem. Quisque quis pellentesque dui. Suspendisse erat velit, rutrum eu mi at, faucibus hendrerit neque.
        </Hero>

      </Section>

      <Section container>

      <H3 as="h2">Card grid</H3>
      <RichText style={{ paddingBottom: '2em'}}>
        <p>uses a <code>&lt;Card&gt;</code> component to configure and style a basic <code>&lt;Grid&gt;</code> component, which generates an equal-column grid. </p>
      </RichText>

      <Cards>
        {allPostsData.map(({ id, date, title, description }) => (
          <Card
            key={id}
            heading={
              <Link to="/posts/[id]" as={`/posts/${id}`}>{title}</Link>
            }
            date={date}
          >
            <div>{description}</div>
          </Card>
        ))}
        
      </Cards>
      </Section>

      <Section container>
        <H3 as="h2">Buttons</H3>
        <Grid columnCount={{ mobile: 1, desktop: 4 }}>
          <Button onClick={() => console.log('on click event')}>default button</Button>
          <Button disabled to="#">a disabled button</Button>
          <Button to="/">internal link, also with some very long text so lets see how that works</Button>
          <Button to="https://hugsmidjan.is">external link</Button>
        </Grid>
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
