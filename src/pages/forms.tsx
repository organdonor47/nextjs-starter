// global components
import { H1, H2 } from 'components/heading/Heading';
import { Meta } from 'components/meta/Meta';
import { Section } from 'components/section/Section';

// demo
import { FormElements } from 'components/demos/form-elements/FormElements';

export default function Elements() {
  return (
    <>
      <Meta title="Next-js starter: form elements" />

      <Section container>
        <H1>Next-js starter: form elements</H1>
      </Section>

      <Section container>
        <FormElements />
      </Section>

    </>
  );
}
