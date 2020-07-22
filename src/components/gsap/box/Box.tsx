
// box as forwardRef ro use in animation examples
import { forwardRef } from 'react';

import c from 'classnames';
import s from './Box.module.scss';

interface IProps {
  ref: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Box = forwardRef<HTMLDivElement, IProps>((props, ref) => (
  <div ref={ref} className={c(s.box, props.className)} style={props.style}>
    {props.children}
  </div>
));