import { useContext, useRef } from 'react';
import { UIContext } from 'context/ui';

import { Link } from 'components/link/Link';

import s from './Header.module.scss';

export const Header = ({children}: { children: React.ReactNode }) => {
  const { setUIState } = useContext(UIContext);

  const headerRef = useRef<HTMLElement>(null);
  
  return (
    <header className={s.header} ref={headerRef}>
      <div className={s.header__container}>
        <a tabIndex={0} className={s.header__skip} href="#main">
          Skip to content
        </a>
        <Link tabIndex={0} to="/">Header</Link>
        <div className={s.header__nav}>
          {children}
        </div>
        <div className={s.header__controls}>
          <button onClick={() => setUIState({ isNavOpen: true })}>menu</button>
        </div>
      </div>
    </header>
  );
}