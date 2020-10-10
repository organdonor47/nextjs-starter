import defaults from './meta-defaults.json';

import Head from 'next/head';

interface IProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

export const Meta = ({ title, description, image, children }: IProps) => (
  <Head>
    <title>{title ?? defaults.title}</title>
    <link rel="icon" href="/favicon.ico" key="favicon" />
    <meta name="description" content={description ?? defaults.description} key="desc" />
    <meta
      property="og:description"
      content={description ?? defaults.description}
      key="og:desc"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
      key="viewport"
    />
    {image ||
      (defaults.image && (
        <meta property="og:image" content={image ?? defaults.image} key="image" />
      ))}
    {children}
  </Head>
);
