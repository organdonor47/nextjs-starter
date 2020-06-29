
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { UIContext } from 'context/ui';

import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { Nav } from 'components/nav/Nav';

import s from './Layout.module.scss';

export const Layout = ({ children }: { children: React.ReactNode }) => {

  const { navOpen, toggleNav } = useContext(UIContext);

  const router = useRouter();

  useEffect(() => {
    if (navOpen) {
      toggleNav(false);
    }

  }, [router]);

  return (
    <>
      <div className={s.layout}>
        <Header>
          <Nav>
            <Link href="/elements"><a>elements</a></Link>
            <Link href="/"><a>another link</a></Link>
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