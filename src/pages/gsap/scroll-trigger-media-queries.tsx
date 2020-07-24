// global components
import { H1 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

import { MediaQueries } from 'components/gsap/media-queries/MediaQueries';

export default function ScrollTriggerMQ() {

  return (
    <>
      <Meta title="Next-js starter: scroll trigger media-queries" />

      <Section container>
        <H1>GSAP ScrollTrigger media queries</H1>
      </Section>

      <Section>
        <MediaQueries />
      </Section>
      

    </>
  );
}
