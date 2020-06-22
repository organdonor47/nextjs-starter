import Head from 'next/head';

import Link from 'next/link';

export default function Test() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Read <Link href="/"><a>go home!</a></Link>
        </h1>
      </main>
    </div>
  )
}
