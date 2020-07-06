import { Container } from 'components/container/Container';

import defaults from 'data/meta-defaults.json';
import Head from 'next/head';

interface IProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Meta = ({title, description, children }: IProps) => (
    <Head>
      <title>{title ?? defaults.title}</title>
      <link rel="icon" href="/favicon.ico" key="favicon" />
      <meta name="description" content={description ?? defaults.description} />
      {children}
    </Head>
);