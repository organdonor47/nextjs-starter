import { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './PageTransition.module.scss';

export const PageTransition = ({children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const { route } = router;
  const { shouldTransition, setShouldTransition } = useContext(UIContext);
  const transitionIndex = useRef<number>(0); // is first or second stage transition

  const onComplete = () => {
    window.scrollTo(0, 0);

    // 2x transitions, so listen for second as real done()
    if (transitionIndex.current === 0) {
      transitionIndex.current = 1;
    } else {
      setShouldTransition(false);
      transitionIndex.current = 0;
    }
  }

  if (!shouldTransition) {
    return <>{children}</>;
  }

  return (
    <SwitchTransition>
      <CSSTransition
        key={route}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', (e: React.TransitionEvent) => {
            onComplete();
            done();
          },
          false);
        }}
        
        timeout={shouldTransition ? null : 0}
        classNames={{ ...s }}
        unmountOnExit
        // timeout={shouldTransition ? 500 : 0}
        // onExited={onComplete}
      >
        <div className={c(s.pageTransition, { [s.transition]: shouldTransition })}>
          <div className={s.pageTransition__inner}>
            {children}
          </div>

          <div className={s.pageTransition__wipe}>
            <span />
          </div>
        </div>
        
      </CSSTransition>
    </SwitchTransition>
  );
}