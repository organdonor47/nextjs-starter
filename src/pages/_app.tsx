import { AppProps } from 'next/app';

import { UIProvider } from 'context/ui';
import { Devtools } from 'components/devtools/Devtools';
import { Layout } from 'components/layout/Layout';
import { Meta } from 'components/meta/Meta';

import 'styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      <Meta />
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
      {isDev && <Devtools />}
    </>
  );
}
