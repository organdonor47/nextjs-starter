//  used to make an evenly-sized set of columns only. use scss mixins for different-sized column spans 
import { HTMLElementList } from 'types/html-types';
import c from 'classnames';
import s from './Grid.module.scss';

interface IProps {
  as?: HTMLElementList;
  columnCount?: {mobile?: number, tablet?: number; desktop?: number, limit?: number};
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Grid = ({children, columnCount = {}, as, className, style }: IProps) => {
  const Wrapper = as ?? 'div';
  const { mobile, tablet, desktop, limit } = columnCount;

  return (
    <Wrapper
      className={c(
        s.grid,
        className,
        s[`mobile${mobile ?? 1}`],
        s[`tablet${tablet ?? 2}`],
        s[`desktop${desktop ?? 3}`],
        s[`limit${limit ?? desktop ?? 3}`],
      )}
      style={style}
    >
      {children}
    </Wrapper>
  );
}