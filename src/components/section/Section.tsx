import { HTMLElementList } from 'types/html-types';

import { Container } from 'components/container/Container';

import s from './section.module.scss';

interface IProps {
  children: React.ReactNode;
  container?: boolean;
  as?: HTMLElementList;
}

export const Section = ({children, container = false, as = 'section'}: IProps) => {
  
  const SectionEl = as;
  const content = container ? <Container>{children}</Container> : children;

  return (
    <SectionEl className={s.section}>
      {content}
    </SectionEl>
  );
}