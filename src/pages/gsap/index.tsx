// global components
import { H1 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { Cards, Card } from 'components/demos/cards/Cards';
import { Link } from 'components/link/Link';

export default function Gsap() {
  return (
    <>
      <Meta title="Next-js starter: some gsap tests" />

      <Section container>
        <H1>Next-js starter: GSAP tests</H1>
      </Section>

      <Section container>
        <Cards>
          <Card
            heading={
              <Link to="/gsap/scroll-trigger-tween-value">
                [ScrollTrigger] pin and get tween value
              </Link>
            }
          >
            <p>
              <code>gsap.utils (interpolate, snap (value), modifiers)</code> plus{' '}
              <code>pin</code> parent. Get the actual tween value as integer, which could
              be used to animate an image sequence, update a css variable etc. Also
              interpolates a colour value on scroll.
            </p>
          </Card>
          <Card heading={<Link to="/gsap/effects">gsap.effects</Link>}>
            <p>
              using <code>registerEffect</code> to set up a default effect. Not really
              that useful in this demo, but might be on something you have to call a lot.
            </p>
          </Card>
          <Card
            heading={
              <Link to="/gsap/scroll-trigger-media-queries">
                [ScrollTrigger] using media queries
              </Link>
            }
          >
            <p>
              options for using scroll trigger with media queries at different breakpoints
            </p>
          </Card>
        </Cards>
      </Section>
    </>
  );
}
