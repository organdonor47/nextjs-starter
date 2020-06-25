import { HTMLElementList } from 'types/html-types';

import { Container } from 'components/container/Container';

import c from 'classnames';
import s from './section.module.scss';

interface IProps {
  children: React.ReactNode;
  container?: boolean;
  as?: HTMLElementList;
  className?: string;
}

export const Section = ({children, container = false, as = 'section', className}: IProps) => {
  
  const SectionEl = as;
  const content = container ? <Container>{children}</Container> : children;

  return (
    <SectionEl className={c(s.section, className)}>
      {content}
    </SectionEl>
  );
}