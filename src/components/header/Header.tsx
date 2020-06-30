import { useContext } from 'react';

import Link from 'next/link';

import { UIContext } from 'context/ui';

import s from './Header.module.scss';

export const Header = ({children}: { children: React.ReactNode }) => {
  const { navOpen, toggleNav } = useContext(UIContext);
  
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <Link href="/"><a>Header</a></Link>
        <div className={s.header__nav}>{children}</div>
        <div className={s.header__controls}>
          <button onClick={() => toggleNav(!navOpen)}>menu</button>
        </div>
      </div>
    </header>
  );
}