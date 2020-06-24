import s from './heading.module.scss';

export const H1 = ({children}: { children: React.ReactNode }) => {
  return (
    <h1 className={s.h1}>
      {children}
    </h1>
  )
}

export const H2 = ({children}: { children: React.ReactNode }) => {
  return (
    <h2 className={s.h2}>
      {children}
    </h2>
  )
}

export const H3 = ({children}: { children: React.ReactNode }) => {
  return (
    <h2 className={s.h3}>
      {children}
    </h2>
  )
}