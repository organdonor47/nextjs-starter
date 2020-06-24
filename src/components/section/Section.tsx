import s from './section.module.scss';
import { Container } from 'components/container/Container';

interface IProps {
  children: React.ReactNode;
  container?: boolean;
}

export const Section = ({children, container = false}: IProps) => {
  const content = container ? <Container>{children}</Container> : children;

  return (
    <div className={s.section}>
      {content}
    </div>
  );
}