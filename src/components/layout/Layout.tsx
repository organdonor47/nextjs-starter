
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { UIContext } from 'context/ui';

import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { Loading } from 'components/loading/Loading';
import { NavContainer as Nav } from 'containers/nav/Nav';
import { PageTransition } from 'components/page-transition/PageTransition';

import c from 'classnames';
import s from './Layout.module.scss';


export const Layout = ({ children }: { children: React.ReactNode }) => {

  const { uiState, setUIState } = useContext(UIContext);

  const router = useRouter();

  useEffect(() => {
    setUIState({ isNavOpen: false });
  }, [router]);

  return (
    <>
      <Loading />
      <PageTransition route={router.asPath}>
        <div className={c(s.layout, { [s.navOpen]: uiState.isNavOpen })}>
          <Header>
            <Nav />
          </Header>
          {/* ID for skip link */}
          <main id="main" className={s.layout__content}>
            {children}
          </main>
          <Footer>¯\_(ツ)_/¯</Footer>
        </div>
      </PageTransition>
    </>
  );
}