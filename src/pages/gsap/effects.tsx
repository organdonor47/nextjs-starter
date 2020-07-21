// global components
import { H1 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { Effect } from 'components/gsap/effect/Effect';

export default function Effects() {

  return (
    <>
      <Meta title="Next-js starter: gsap effects" />

      <Section container>
        <H1>gsap.effects</H1>

        <Effect />
      
      </Section>
      

    </>
  );
}
