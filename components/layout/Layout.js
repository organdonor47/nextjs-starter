import s from './layout.module.scss';

function Layout({ children }) {
  return (
    <div className={s.layout}>
      {children}
    </div>
  )
}

export default Layout;