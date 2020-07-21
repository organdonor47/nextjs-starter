// global components
import { H1, H2 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { Effect } from 'components/gsap/effect/Effect';
import { Interpolate } from 'components/gsap/interpolate/Interpolate';
import { RichText } from 'components/rich-text/RichText';

export default function ScrollTrigger() {

  return (
    <>
      <Meta title="Next-js starter: gsap scroll trigger" />

      <Section container>
        <H1>GSAP ScrollTrigger</H1>
      </Section>

      <Section container>
        <RichText style={{ paddingBottom: 50 }}>
          <h2>gsap.utils (interpolate, snap, modifiers): animate misc stuff on ScrollTrigger</h2>
          {/* <p>This component shouldn't really be called "interpolate" as there is more interesting stuff going on. It animates a number also, which could be used to update an image sequence or something cool like that.</p> */}
        </RichText>

        <Interpolate />
      </Section>
      

    </>
  );
}
