import Router from 'next/router';
import { useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { debounce } from 'lodash';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './Loading.module.scss';

export const Loading = () => {
  const { uiState, setUIState } = useContext(UIContext);

  const loadingTimer = debounce(() => {
    if (!uiState.isLoading) {
      setUIState({ isLoading: true });
    }
  }, 1000, { leading: false });
  

  const handleRouteStart = () => {
    loadingTimer();

    if (typeof window === undefined) {
      return;
    }
    
  }

  useEffect(() => {
    // show loading if page not loaded after [debounce] ms

    const handleRouteComplete = () => {
      // cancel start listener loading debounce
      loadingTimer.cancel();

      // hide loading screen
      setUIState({ isLoading: false });
    };
  
    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteComplete);
    }
  }, []);

  return  (
    <CSSTransition
      in={uiState.isLoading}
      timeout={uiState.prefersReducedMotion ? 0 : 300}
      classNames={{ ...s }}
      unmountOnExit
    >
      <div
        className={c(s.loading)}
        role="alertdialog"
        aria-busy="true"
        aria-live="assertive"
      >
        <span className={s.loading__inner}>
          loading...
        </span>
      </div>
    </CSSTransition>
  );
};