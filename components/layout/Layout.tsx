import s from './layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className={s.layout}>
      {children}
    </div>
  );
}

export default Layout;