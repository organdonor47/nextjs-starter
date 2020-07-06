import { useContext, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './PageTransition.module.scss';

export const PageTransition = ({children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const { route } = router;
  const { shouldTransition, setShouldTransition } = useContext(UIContext);

  // temp: needs to detect if this is back/fwd
  const isHistory = false;

  //can be called on timeout (onExited) or ontransition event
  const onComplete = () => {
    if (!isHistory) {
      window.scrollTo(0, 0);
    }

    setTimeout(() => {
      setShouldTransition(false);
    }, 400); // TODO: fix timeout value, currently just matches transition but just needs to trigger post-complete
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
            // onComplete(e);
            done();
          },
          false);
        }}
        timeout={shouldTransition ? null : 0}
        classNames={{ ...s }}
        unmountOnExit
        onExited={onComplete}
      >
        <div className={c(s.pageTransition, { [s.transition]: shouldTransition })}>
          <div className={s.pageTransition__inner}>
            {children}
          </div>
        </div>
        
      </CSSTransition>
    </SwitchTransition>
  );
}