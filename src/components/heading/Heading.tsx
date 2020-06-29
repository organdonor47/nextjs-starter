import { HeadingTags } from 'types/html-types';

import c from 'classnames';
import s from './heading.module.scss';

interface IProps {
  type?: HeadingTags;
  as?: HeadingTags;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Heading = ({type = 'h1', as, children, className, style}: IProps) => {
  const Wrap = as ?? type;
  
  return (
    <Wrap className={c(s[type], className)} style={style}>
      {children}
    </Wrap>
  );

};

export const H1 = (props: IProps) => <Heading type="h1" { ...props} />;

export const H2 = (props: IProps) => <Heading type="h2" { ...props} />;

export const H3 = (props: IProps) => <Heading type="h3" { ...props} />;

export const H4 = (props: IProps) => <Heading type="h4" { ...props} />;

export const H5 = (props: IProps) => <Heading type="h5" { ...props} />;

export const H6 = (props: IProps) => <Heading type="h6" { ...props} />;