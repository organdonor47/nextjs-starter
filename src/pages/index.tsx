import { H1, H3 } from 'components/heading/Heading';
import { Link } from 'components/link/Link';
import { RichText } from 'components/rich-text/RichText';
import { Section } from 'components/section/Section';

export default function Home() {

  return (
    <>
      <Section container as="div">
        <H1 style={{ marginBottom: 0 }}>Next-js starter</H1>

        <RichText html="there is some htome">
          <H3 as="h2">Kit includes</H3>

          <p>The kit constistutes some basic bootstrapping (S)CSS and React Components.</p>

          <ul>
            <li>CSS Grid -- no flexbox fallback (TODO)</li>
            <li>Simple components for common layout patterns</li>
            <li>Page transitions</li>
            <li>responsive typography</li>
            <li>Mobile / desktop nav</li>
            <li>Dev tool grid overlay</li>
            <li>SVG imports as React Components</li>
            <li>lots of other bits; check out
              the <Link to="/elements">Elements page</Link> to see examples</li>
            <li>TODO:
              <ul>
                <li><del>button</del></li>
                <li><del>image / picture component</del></li>
                <li>Metadata with fallbacks</li>
                <li><del>mobile nav overlay</del></li>
                <li><del>adding gsap</del> (added as separate branch)</li>
              </ul>
            </li>

          </ul>
          
        </RichText>
      </Section>
    </>
  )
}
