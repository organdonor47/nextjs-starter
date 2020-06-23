import s from './layout.module.scss';

import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className={s.layout}>
      <Header>
        header!
      </Header>
      <div className={s.layout__content}>
        {children}
      </div>
      <Footer>¯\_(ツ)_/¯</Footer>
    </div>
  );
}