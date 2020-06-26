import { HeadingTags } from 'types/html-types';

import c from 'classnames';
import s from './heading.module.scss';

interface IProps {
  type?: HeadingTags;
  as?: HeadingTags;
  className?: string;
  children: React.ReactNode;
}

const Heading = ({type, as, children, className}: IProps) => {
  const Wrap = as ?? type;
  
  return (
    <Wrap className={c(s[type], className)}>
      {children}
    </Wrap>
  );

};

export const H1 = (props) => <Heading type="h1" { ...props} />;

export const H2 = (props) => <Heading type="h2" { ...props} />;

export const H3 = (props) => <Heading type="h3" { ...props} />;