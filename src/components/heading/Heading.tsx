import { HeadingTags } from 'types/html-types';
import s from './heading.module.scss';

interface IProps {
  as?: HeadingTags;
  className?: string;
  children: React.ReactNode;
}

export const H1 = ({as, children, className}: IProps) => {
  const Wrap = as ?? 'h1';
  const cssClass = `${s.h1} ${className}`;

  return (
    <Wrap className={cssClass}>
      {children}
    </Wrap>
  );
}

export const H2 = ({as, children, className}: IProps) => {
  const Wrap = as ?? 'h2';
  const cssClass = `${s.h2} ${className}`;

  return (
    <Wrap className={cssClass}>
      {children}
    </Wrap>
  );
}

export const H3 = ({as, children, className}: IProps) => {
  const Wrap = as ?? 'h3';
  const cssClass = `${s.h3} ${className}`;

  return (
    <Wrap className={cssClass}>
      {children}
    </Wrap>
  );
}