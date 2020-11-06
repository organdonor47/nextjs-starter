import Image from 'next/image';

// global components
import { Button } from 'components/button/Button';
import { Container } from 'components/container/Container';
import { Grid } from 'components/grid/Grid';
import { H1, H2, H3 } from 'components/heading/Heading';
import { Link } from 'components/link/Link';
import { Meta } from 'components/meta/Meta';
import { Picture } from 'components/picture/Picture';
import { RichTextStatic } from 'components/rich-text/RichTextStatic';
import { Section } from 'components/section/Section';

// demo components
import { Cards, Card } from 'components/demos/cards/Cards';
import { Hero } from 'components/demos/hero/Hero';

// import SVG as component using `next-react-svg`
import Circle from 'assets/svg/temp/circle.svg';

export default function Elements() {
  return (
    <>
      <Meta title="Next-js starter" />

      <Section container>
        <H1>Next-js starter</H1>

        <RichTextStatic>
          <p>
            This starter-kit contains bootstrapping (S)CSS and some commonly-used React
            component patterns and functionality. examples below:
          </p>
        </RichTextStatic>
      </Section>

      <Section>
        <Container>
          <H2 as="h2">Basic grid column span usage</H2>

          <RichTextStatic style={{ paddingBottom: '2em' }}>
            <p>
              Uses the <code>@grid</code> and <code>@grid-item</code> scss mixins to lay
              out elements on the page.
            </p>
          </RichTextStatic>
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
        <RichTextStatic style={{ paddingBottom: '2em' }}>
          <p>
            uses a <code>&lt;Card&gt;</code> component to configure and style a basic{' '}
            <code>&lt;Grid&gt;</code> component, which generates an equal-column grid.
          </p>
        </RichTextStatic>

        <Cards>
          <Card heading={<Link to="/forms">html form elements</Link>} date="today">
            How form elements work with some basic generic styles from global.scss. More
            info?: Praesent at diam in mauris porttitor maximus. Aliquam at efficitur est,
            ut mollis turpis.
          </Card>

          <Card heading={<Link to="/html">HTML elements</Link>} date="today">
            Here is a &ldquo;kitchen sink&rdquo; html elements page
          </Card>

          <Card heading={<Link to="/">Third card</Link>} date="today">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit
            tincidunt ex vehicula rhoncus. Cras pharetra sapien eget tellus condimentum,
            in auctor lorem varius. Praesent at diam in mauris porttitor maximus. Aliquam
            at efficitur est, ut mollis turpis. Quisque id orci at turpis dictum
            tincidunt. Maecenas interdum rutrum eleifend. Nunc at pretium urna. Aenean
            sapien tortor, auctor ut finibus quis, varius eget risus
          </Card>
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
          src="/images/temp/sunset@2x.jpg"
          formats={{
            webp: {
              x1: '/images/temp/sunset.webp',
              x2: '/images/temp/sunset@2x.webp',
              mobile: '/images/temp/sunset-mobile.webp',
            },
            jpg: {
              x1: '/images/temp/sunset.jpg',
              x2: '/images/temp/sunset@2x.jpg',
              mobile: '/images/temp/sunset-mobile.jpg',
            },
          }}
          alt="picture of a sunset"
          width={1200}
          height={900}
        />
      </Section>

      <Section container>
        <H3>
          Using the <code>&lt;Image&gt;</code> component from next/image
        </H3>
        <Image
          src="/images/temp/sunset.jpg"
          alt=""
          width="1200"
          height="900"
          priority
          loading="eager"
          quality={50}
        />
      </Section>

      <Section container>
        <H3 as="h2">video</H3>
        <video src="/video/temp/temp.mp4" controls />
      </Section>
    </>
  );
}
