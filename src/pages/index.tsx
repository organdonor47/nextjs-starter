import Head from 'next/head';

import { H1, H3 } from 'components/heading/Heading';
import { Link } from 'components/link/Link';
import { Section } from 'components/section/Section';
import { RichText } from 'components/rich-text/RichText';

export default function Home() {

  return (
    <>
      <Head>
        <title>Next-js starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section container as="div">
        <H1 style={{ marginBottom: 0 }}>Next-js starter</H1>

        <RichText html="there is some htome">
          <H3 as="h2">Kit includes</H3>

          <p>The kit constistutes some basic bootstrapping (S)CSS and React Components.</p>

          <ul>
            <li>TODO:
              <ul>
                <li>button</li>
                <li>image / picture component</li>
                <li>Metadata with fallbacks</li>
                <li>mobile nav overlay</li>
                <li>adding gsap</li>
              </ul>
            </li>
            <li>CSS Grid -- no flexbox fallback (TODO)</li>
            <li>Simple components for common layout patterns</li>
            <li>responsive typography</li>
            <li>Mobile / desktop nav</li>
            <li>Dev tool grid overlay</li>
            <li>SVG imports as React Components</li>
            <li>lots of other bits; check out
              the <Link to="/elements">Elements page</Link> to see examples</li>

          </ul>
          
        </RichText>
      </Section>
    </>
  )
}
