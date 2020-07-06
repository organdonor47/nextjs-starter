import { useContext } from 'react';
import { useRouter } from 'next/router';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './PageTransition.module.scss';

export const PageTransition = ({children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const { route } = router;
  const { shouldTransition, setShouldTransition } = useContext(UIContext);

  //can be called on timeout (onExited w.timeout prop) or ontransition event
  const onComplete = () => {
    window.scrollTo(0, 0);

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
        </div>
        
      </CSSTransition>
    </SwitchTransition>
  );
}