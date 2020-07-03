import { SwitchTransition, CSSTransition } from 'react-transition-group';

import s from './PageTransition.module.scss';

export const PageTransition = ({children, location }: { children: React.ReactNode, location: string }) => {
  return (
    <SwitchTransition>
      <CSSTransition
        key={location}
        timeout={500}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames={{ ...s }}
      >
        <div className={s.pageTransition}>
          <div className={s.pageTransition__inner}>
            {children}
          </div>
        </div>
        
      </CSSTransition>
    </SwitchTransition>
  );
}