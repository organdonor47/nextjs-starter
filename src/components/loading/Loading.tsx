import Router from 'next/router';
import { useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { debounce } from 'lodash';

import { UIContext } from 'context/ui';

import c from 'classnames';
import s from './Loading.module.scss';

export const Loading = () => {
  const { uiState, setUIState } = useContext(UIContext);

  // clear loadingscreen if nothing has happened for 10s
  const loadingFallback = setTimeout(() => {
    if (uiState.isLoading) {
      setUIState({ isLoading: false });
    }
  }, 10000);

  // unmount
  useEffect(() => {
    // clear timeout on unmount
    return () => clearTimeout(loadingFallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // show loading if page not loaded after [debounce] ms
    const loadingTimer = debounce(
      () => {
        if (!uiState.isLoading) {
          setUIState({ isLoading: true });
        }
      },
      1000,
      { leading: false },
    );

    function handleRouteStart() {
      loadingTimer();

      // kill loading screen after 20 seconds
      setTimeout(() => {
        if (uiState.isLoading) {
          setUIState({ isLoading: false });
        }
      }, 20000);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleRouteComplete(err?: any) {
      // cancel start listener loading debounce
      loadingTimer.cancel();

      // clear timout for loading fallback
      if (loadingFallback) {
        clearTimeout(loadingFallback);
      }

      // hide loading screen
      setUIState({ isLoading: false });

      // do something for if action is cancelled?
      if (err && err.cancelled) {
        console.log('cancelled');
      }
    }

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteComplete);
    Router.events.on('routeChangeError', (err) => handleRouteComplete(err));

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteComplete);
      Router.events.off('routeChangeError', handleRouteComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        <span className={s.loading__inner}>loading...</span>
      </div>
    </CSSTransition>
  );
};
