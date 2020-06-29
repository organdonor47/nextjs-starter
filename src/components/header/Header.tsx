import Link from 'next/link';

import s from './Header.module.scss';

export const Header = ({children}: { children: React.ReactNode }) => {
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <Link href="/"><a>Header</a></Link>
        <div className={s.header__nav}>{children}</div>
      </div>
    </header>
  );
}