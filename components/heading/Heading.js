import s from './heading.module.scss';

export const H1 = ({ children }) => {
  return (
    <h1 className={s.h1}>
      {children}
    </h1>
  )
}

export const H2 = ({ children }) => {
  return (
    <h2 className={s.h2}>
      {children}
    </h2>
  )
}