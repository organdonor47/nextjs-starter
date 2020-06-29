import Head from 'next/head';

import Link from 'next/link';
import { Section } from 'components/section/Section';
import { H1 } from 'components/heading/Heading';

export default function Elements() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section container>
        <H1>
          Elements page <br /><Link href="/"><a>go home!</a></Link>
        </H1>
      </Section>
    </div>
  )
}
