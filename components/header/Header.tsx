import { Container } from 'components/container/Container';

import s from './header.module.scss';

export const Header = ({children}: { children: React.ReactNode }) => {
  return (
    <header className={s.header}>
      <Container>{children}</Container>
    </header>
  );
}