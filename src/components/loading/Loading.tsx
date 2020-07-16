import Router from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { debounce } from 'lodash';

import c from 'classnames';
import s from './Loading.module.scss';
import { UIContext } from 'context/ui';

export const Loading = () => {
  const { isLoading, setLoading, prefersReducedMotion } = useContext(UIContext);

  useEffect(() => {
    // show loading if page not loaded after 1 sec
    const handleRouteStart = debounce(() => {
      if (!isLoading) {
        setLoading(true);
      }
    }, 1000, { leading: false });

    const handleRouteComplete = () => {
      // cancel start listener loading debounce
      handleRouteStart.cancel();

      // hide loading screen
      setLoading(false);
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
        in={isLoading}
        timeout={prefersReducedMotion ? 0 : 300}
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