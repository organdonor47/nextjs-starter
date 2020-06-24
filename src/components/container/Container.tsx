import s from './container.module.scss';

export const Container = ({children}: { children: React.ReactNode }) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  );
}