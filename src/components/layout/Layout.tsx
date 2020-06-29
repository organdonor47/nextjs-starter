
import Link from 'next/link';

import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { Nav } from 'components/nav/Nav';

import s from './Layout.module.scss';

export const Layout = ({ children }: { children: React.ReactNode }) => {

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      <div className={s.layout}>
        <Header>
          <Nav>
            <Link href="/elements"><a>elements</a></Link>
            <span>boing</span>
          </Nav>
        </Header>
        <div className={s.layout__content}>
          {children}
        </div>
        <Footer>¯\_(ツ)_/¯</Footer>
      </div>
    </>
  );
}