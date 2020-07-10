import { useContext, useRef, useEffect, useState, TransitionEvent } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './PageTransition.module.scss';

export const PageTransition = ({ route, children }: { route: string; children: React.ReactNode }) => {

  const { shouldTransition, setShouldTransition, setCanScroll } = useContext(UIContext);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionIndex = useRef<number>(0); // is first or second stage transition

  useEffect(() => {
    return () => setCanScroll(true);
  }, []);

  const onStart = () => {
    setIsTransitioning(true);
    setCanScroll(false);
  }

  const onComplete = (e: TransitionEvent) => {

    /* 
     * if there are multiple transitioned elements and the durations are all the same,
     * it may be necessary to target the transitionend event of a specific DOM element
     * so we are just listening for the end of each Switch transition once (i.e. 2x 1 event).
     * Alternatively, just use the timeout prop instead of the transitionend event listener
     */
    const target = e.target as HTMLElement;
    if (target.className !== s.pageTransition__wipe) {
      return;
    }

    // 2x transitions from Switch; listen for second event as done()
    if (transitionIndex.current === 0) {
      transitionIndex.current = 1;
    } else {
      window.scrollTo(0, 0);

      setShouldTransition(false);
      setIsTransitioning(false);
      setCanScroll(true);
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
          // listen to transitionstart / endevents
          node.addEventListener('transitionstart', onStart, false);

          node.addEventListener('transitionend', (e: React.TransitionEvent) => {
            onComplete(e);
            done();
          },
          false);
        }}
        
        timeout={shouldTransition ? null : 0} // for back / history ie. non-link clicks
        classNames={{ ...s }}
        unmountOnExit
      >
        <div className={c(s.pageTransition, { [s.isTransitioning]: isTransitioning})}>
          <div className={s.pageTransition__inner}>
            {children}
          </div>

          <span className={s.pageTransition__wipe} />
        </div>
        
      </CSSTransition>
    </SwitchTransition>
  );
}