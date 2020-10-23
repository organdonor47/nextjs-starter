/* eslint-disable require-await */
import { GetStaticProps } from 'next';

import { getSortedPostsData } from 'lib/posts';

// global components
import { Button } from 'components/button/Button';
import { Container } from 'components/container/Container';
import { Grid } from 'components/grid/Grid';
import { H1, H2, H3 } from 'components/heading/Heading';
import { Link } from 'components/link/Link';
import { Meta } from 'components/meta/Meta';
import { Picture } from 'components/picture/Picture';
import { RichText } from 'components/rich-text/RichTextStatic';
import { Section } from 'components/section/Section';

// demo components
import { Cards, Card } from 'components/demos/cards/Cards';
import { Hero } from 'components/demos/hero/Hero';

// import SVG as component using `next-react-svg`
import Circle from 'assets/svg/temp/circle.svg';

//import image files using `next-images`
import sunsetJpg from 'assets/images/temp/sunset.jpg';
import sunsetJpg2x from 'assets/images/temp/sunset@2x.jpg';
import sunsetWebp from 'assets/images/temp/sunset.webp';
import sunsetWebp2x from 'assets/images/temp/sunset@2x.webp';
import sunsetMobile from 'assets/images/temp/sunset-mobile.jpg';
import sunsetMobileWebp from 'assets/images/temp/sunset-mobile.webp';

// import video using `next-videos`
import video from 'assets/video/temp/temp.mp4';

export default function Elements({
  allPostsData,
}: {
  allPostsData: Array<{
    date: string;
    title: string;
    id: string;
    description: string;
  }>;
}) {
  return (
    <>
      <Meta title="Next-js starter" />

      <Section container>
        <H1>Next-js starter</H1>

        <RichText>
          <p>
            This starter-kit contains bootstrapping (S)CSS and some commonly-used React
            component patterns and functionality. examples below:
          </p>
        </RichText>
      </Section>

      <Section>
        <Container>
          <H2 as="h2">Basic grid column span usage</H2>

          <RichText style={{ paddingBottom: '2em' }}>
            <p>
              Uses the <code>@grid</code> and <code>@grid-item</code> scss mixins to lay
              out elements on the page.
            </p>
          </RichText>
        </Container>

        <Hero title="Title: no columns defined so 100% span">
          <strong>children</strong> Maecenas est ligula, consequat suscipit malesuada sit
          amet, tristique quis lorem. Quisque quis{' '}
          <Link className="🤯" to="https://guardian.co.uk/">
            text external link
          </Link>{' '}
          pellentesque dui. Suspendisse erat velit, rutrum eu mi at, faucibus hendrerit
          neque.
        </Hero>
      </Section>

      <Section container>
        <H3 as="h2">Card grid</H3>
        <RichText style={{ paddingBottom: '2em' }}>
          <p>
            uses a <code>&lt;Card&gt;</code> component to configure and style a basic{' '}
            <code>&lt;Grid&gt;</code> component, which generates an equal-column grid.{' '}
          </p>
        </RichText>

        <Cards>
          <Card heading={<Link to="/forms">html form elements</Link>} date="today">
            How form elements work with some basic generic styles from global.scss
          </Card>

          {allPostsData.slice(0, 5).map(({ id, date, title, description }) => (
            <Card
              key={id}
              heading={
                <Link to="/posts/[id]" as={`/posts/${id}`}>
                  {title}
                </Link>
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
        <Grid columnCount={{ mobile: 1, desktop: 4 }}>
          <Button onClick={() => console.log('onClick event')}>default button</Button>
          <Button disabled to="#">
            a disabled button
          </Button>
          <Button to="/forms" transition={false}>
            internal link, long text, and no page transition
          </Button>
          <Button to="https://hugsmidjan.is">external link</Button>
        </Grid>
      </Section>

      <Section container>
        <H3 as="h2">Import SVG as component</H3>
        <Circle className="🥰" style={{ color: '#c09' }} />
      </Section>

      <Section container>
        <H3 as="h2">
          Import images and add to <code>&lt;Picture&gt;</code> component
        </H3>
        <Picture
          src={sunsetJpg}
          formats={{
            webp: {
              x1: sunsetWebp,
              x2: sunsetWebp2x,
              mobile: sunsetMobileWebp,
            },
            jpg: {
              x1: sunsetJpg,
              x2: sunsetJpg2x,
              mobile: sunsetMobile,
            },
          }}
          alt="picture of a sunset"
          width={1200}
          height={900}
        />
      </Section>

      <Section container>
        <H3 as="h2">Import video</H3>
        <video src={video} controls />
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
