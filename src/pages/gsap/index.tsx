// global components
import { H1, H2 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { Effect } from 'components/gsap/effect/Effect';

import { Cards, Card } from 'components/demos/cards/Cards';
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
          <Card heading={<Link to="/gsap/scroll-trigger">ScrollTrigger</Link>}>
            <p>gsap.utils (interpolate, snap, modifiers): animate misc stuff on ScrollTrigger</p>
          </Card>
          <Card heading="gsap.effects">
            <p>registerEffect, trigger it</p>
          </Card>
        </Cards>
      </Section>
      

    </>
  );
}
