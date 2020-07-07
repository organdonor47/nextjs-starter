import { Children, useContext, cloneElement } from 'react';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './Nav.module.scss';

interface IProps {
  children: React.ReactNode;
}

export const Nav = ({children}: IProps) => {

  const { navOpen, toggleNav } = useContext(UIContext);

  // aria-expanded={navOpen}: removed for now as nav is only hidden in mobile; UIContext is unaware of this

  return (
    <nav className={c(s.nav, {[s.open]: navOpen})} aria-label="Main Navigation">
      <div className={s.nav__inner}>
        
        <div className={s.nav__content}>
          <div className={s.nav__close}>
            <button onClick={() => toggleNav(false)}>close</button>
          </div>
          <ul className={s.nav__list}>
            {Children.map(children, (child, i) => (
              <li className={s.nav__item} key={i}>{cloneElement(child as React.ReactElement, { tabIndex: 0 })}</li>
            ))}
          </ul>
        </div>

      </div>
      <button className={s.nav__backdrop} aria-label="Close Main Navigation" onClick={() => toggleNav(false)} />
    </nav>
  );
}