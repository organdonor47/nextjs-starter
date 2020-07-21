import { useContext } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './PageTransition.module.scss';

export const PageTransition = ({ route, children }: { route: string; children: React.ReactNode }) => {

  const { uiState, setUIState } = useContext(UIContext);

  const handleStart = () => {
    setUIState({ canScroll: false });
  }

  const handleEntering = () => {
    if (uiState.canTransition) {
      window.scrollTo(0, 0);
    }
  }

  const handleEntered = () => {
    setUIState({ canTransition: false, canScroll: true })
  }

  return (
    <SwitchTransition>
      <CSSTransition
        key={route}
        onExit={handleStart}
        onEntering={handleEntering}
        onEntered={handleEntered}
        timeout={uiState.canTransition ? 500 : 0} // for back / history ie. non-link clicks
        classNames={{ ...s }} // spread classNames from module
      >
        <div className={s.pageTransition}>
          <div className={s.pageTransition__inner}>
            {children}
          </div>
          <span className={c(s.pageTransition__wipe, { [s.hidden]: !uiState.canTransition})} />
        </div>
        
      </CSSTransition>
    </SwitchTransition>
  );
}