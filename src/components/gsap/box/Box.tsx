
// box as forwardRef ro use in animation examples
import { forwardRef } from 'react';

import c from 'classnames';
import s from './Box.module.scss';

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Box = forwardRef<HTMLDivElement, IProps>((props, ref) => {

  const { children, className, style } = props;
  
  return (
    <div ref={ref} className={c(s.box, className)} style={style}>
      {children}
    </div>
  );
});