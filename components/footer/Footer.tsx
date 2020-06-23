import { Container } from 'components/container/Container';

import s from './footer.module.scss';

export const Footer = ({children}: { children: React.ReactNode }) => {
  return (
    <footer className={s.footer}>
      <Container>{children}</Container>
    </footer>
  );
}