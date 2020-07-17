// global components
import { H1, H2 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { Effect } from 'components/gsap/effect/Effect';
import { Interpolate } from 'components/gsap/interpolate/Interpolate';

export default function Gsap() {

  return (
    <>
      <Meta title="Next-js starter: form elements" />

      <Section container>
        <H1>Next-js starter: GSAP tests</H1>
      </Section>

      <Section container>
        <H2>gsap.effects</H2>

        <Effect />
      
      </Section>

      <Section container>
        <H2>gsap.utils (interpolate, quickSetter) w/ ScrollTrigger</H2>

        <Interpolate />
      </Section>
      

    </>
  );
}
