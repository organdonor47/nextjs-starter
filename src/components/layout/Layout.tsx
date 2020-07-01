
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { UIContext } from 'context/ui';

import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { Link } from 'components/link/Link';
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
            <Link to="/elements">elements</Link>
            <Link to="/">another link</Link>
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