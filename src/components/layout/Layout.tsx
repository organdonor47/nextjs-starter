import s from './layout.module.scss';

import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { Devtools } from 'components/devtools/Devtools';
import Link from 'next/link';

export const Layout = ({ children }: { children: React.ReactNode }) => {

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      <div className={s.layout}>
        <Header>
          <Link href="/"><a>header!</a></Link>
        </Header>
        <div className={s.layout__content}>
          {children}
        </div>
        <Footer>¯\_(ツ)_/¯</Footer>
      </div>
      { isDev && <Devtools />}
    </>
  );
}