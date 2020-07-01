import { AppProps } from 'next/app';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { UIProvider } from 'context/ui';

import { Devtools } from 'components/devtools/Devtools';
import { Layout } from '../components/layout/Layout';

import '../styles/global.scss';

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
      { isDev && <Devtools />}
    </>
  );
}