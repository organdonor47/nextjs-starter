import { Children, useContext } from 'react';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './Nav.module.scss';

interface IProps {
  children: React.ReactNode;
}

export const Nav = ({children}: IProps) => {

  const { navOpen, toggleNav } = useContext(UIContext);

  return (
    <nav className={c(s.nav, {[s.open]: navOpen})}>
      <div className={s.nav__inner}>
        <button className={s.nav__close} onClick={() => toggleNav(false)}>close</button>
        <ul className={s.nav__list}>
          {Children.map(children, (child, i) => (
            <li className={s.nav__item} key={i}>{child}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}