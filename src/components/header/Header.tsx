import { useContext } from 'react';
import { UIContext } from 'context/ui';

import { Link } from 'components/link/Link';

import s from './Header.module.scss';

export const Header = ({children}: { children: React.ReactNode }) => {
  const { navOpen, toggleNav } = useContext(UIContext);
  
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <Link tabIndex={0} to="/">Header</Link>
        <div className={s.header__nav}>{children}</div>
        <div className={s.header__controls}>
          <button onClick={() => toggleNav(!navOpen)}>menu</button>
        </div>
      </div>
    </header>
  );
}