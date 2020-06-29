import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface ISizes {
  width: number;
  height: number;
}

export const useResize = () => {
  const [sizes, setSizes] = useState<ISizes>({ width: 0, height: 0 });

  const onResize = debounce(() => {
    if (typeof window === undefined) {
      return;
    }

    setSizes({ width: window.innerWidth, height: window.innerHeight });
  }, 100);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return {
    sizes
  };
};
