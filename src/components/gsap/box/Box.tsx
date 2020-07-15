
// box as forwardRef ro use in animation examples
import { forwardRef, RefObject } from 'react';

import c from 'classnames';
import s from './Box.module.scss';

interface IProps {
  ref: RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  className?: string;
}

export const Box = forwardRef<HTMLDivElement, IProps>((props, ref) => {

  const { children, className } = props;
  
  return (
    <div ref={ref} className={c(s.box, className)}>
      {children}
    </div>
  );
});