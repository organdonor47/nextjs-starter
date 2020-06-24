import s from './layout.module.scss';

import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
// import { GridOverlay } from 'components/devtools/GridOverlay';
import { Devtools } from 'components/devtools/Devtools';

export const Layout = ({ children }: { children: React.ReactNode }) => {

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      <div className={s.layout}>
        <Header>
          header!
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