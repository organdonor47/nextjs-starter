import Router from 'next/router';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import c from 'classnames';
import s from './Loading.module.scss';

export const Loading = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // show "loading.." if page not loaded after 1 sec
    const handleRouteStart = debounce(() => {
      setLoading(true);
    }, 1000);

    const handleRouteComplete = () => {
      // cancel start listener
      handleRouteStart.cancel();
      setLoading(false);
    };
  
    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteComplete);
    }
  }, []);

  return (
    <div className={c(s.loading, {[s.active]: isLoading })}>loading...</div>
  );

};