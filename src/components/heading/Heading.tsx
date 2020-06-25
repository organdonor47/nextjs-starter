import { HeadingTags } from 'types/html-types';

import s from './heading.module.scss';

interface IProps {
  as?: HeadingTags;
  children: React.ReactNode;
}

export const H1 = ({children, as}: IProps) => {
  const Wrap = as ?? 'h1';

  return (
    <Wrap className={s.h1}>
      {children}
    </Wrap>
  );
}

export const H2 = ({children, as}: IProps) => {
  const Wrap = as ?? 'h2';

  return (
    <Wrap className={s.h2}>
      {children}
    </Wrap>
  );
}

export const H3 = ({children, as}: IProps) => {
  const Wrap = as ?? 'h3';

  return (
    <Wrap className={s.h3}>
      {children}
    </Wrap>
  );
}