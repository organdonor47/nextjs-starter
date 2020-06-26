//  used to make an evenly-sized set of columns only. use scss mixins for different-sized column spans 

import { HTMLElementList } from 'types/html-types';
import c from 'classnames';
import s from './Grid.module.scss';

interface IProps {
  as?: HTMLElementList;
  columnCount?: {mobile?: number, tablet?: number; desktop?: number};
  children: React.ReactNode;
  className?: string;
}

export const Grid = ({children, columnCount = {mobile: 1, tablet: 2, desktop: 3 }, as, className }: IProps) => {
  const Wrapper = as ?? 'div';
  const { mobile, tablet, desktop } = columnCount;

  return (
    <Wrapper className={c(
      s.grid,
      className,
      s[`gridMobile${mobile}`],
      s[`gridTablet${tablet}`],
      s[`gridDesktop${desktop}`]
    )}>
      {children}
    </Wrapper>
  );
}