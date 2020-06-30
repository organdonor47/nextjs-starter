import { H1 } from 'components/heading/Heading';
import s from './Hero.module.scss';

export const Hero = ({title, children}: { title: string; children: React.ReactNode }) => (
  <div className={s.hero}>
    <div className={s.hero__container}>
      <H1>{title}</H1>
      <div className={s.hero__grid}>
        <div className={s.hero__content}>
          
          {children}
        </div>

        <div className={s.hero__block}>
          {children}
        </div>
      </div>
    </div>
  </div>
);