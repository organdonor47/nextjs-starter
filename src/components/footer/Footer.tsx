import { Container } from 'components/container/Container';

import s from './Footer.module.scss';

export const Footer = ({children}: { children: React.ReactNode }) => {
  return (
    <footer className={s.footer}>
      <Container>{children}</Container>
    </footer>
  );
}