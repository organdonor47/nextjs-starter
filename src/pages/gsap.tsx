// global components
import { H1 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { Effect } from 'components/gsap/effect/Effect';

export default function Gsap() {

  return (
    <>
      <Meta title="Next-js starter: form elements" />

      <Section container>
        <H1>Next-js starter: GSAP playground</H1>

        <Effect />
      </Section>

    </>
  );
}
