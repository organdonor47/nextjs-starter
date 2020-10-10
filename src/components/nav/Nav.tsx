import { Children, useContext, cloneElement } from 'react';

import { UIContext } from 'context/ui';

import classnames from 'classnames/bind';
import s from './Nav.module.scss';
const c = classnames.bind(s);

interface IProps {
  children: React.ReactNode;
}

export const Nav = ({ children }: IProps) => {
  const { uiState, setUIState } = useContext(UIContext);

  const handleClose = () => {
    setUIState({ isNavOpen: false });
  };

  // aria-expanded={navOpen}: removed for now as nav is only hidden in mobile; UIContext is unaware of this distinction

  return (
    <nav
      className={c({ nav: true, open: uiState.isNavOpen })}
      aria-label="Main Navigation"
    >
      <div className={s.nav__inner}>
        <div className={s.nav__content}>
          <div className={s.nav__close}>
            <button onClick={handleClose}>close</button>
          </div>
          <ul className={s.nav__list}>
            {Children.map(children, (child, i) => (
              <li className={s.nav__item} key={i}>
                {cloneElement(child as React.ReactElement, { tabIndex: 0 })}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className={s.nav__backdrop}
        aria-label="Close Main Navigation"
        onClick={handleClose}
      />
    </nav>
  );
};
