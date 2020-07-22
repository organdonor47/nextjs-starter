// global components
import { H1, H2 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { GetTweenValue } from 'components/gsap/get-tween-value/GetTweenValue';

export default function ScrollTrigger() {

  return (
    <>
      <Meta title="Next-js starter: gsap get tween value on scroll" />

      <Section container>
        <H1>GSAP ScrollTrigger get tween value</H1>
      </Section>

      <Section container>
        <GetTweenValue />
      </Section>
      

    </>
  );
}
