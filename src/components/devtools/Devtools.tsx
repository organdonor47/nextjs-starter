/*
 * Dev tools controller.
 * show / hide dev tool controls (for grid overlay button)
 * ctrl & K toggles controls
 */

import { useEffect } from 'react';

import { useKeyDown } from 'hooks/useKeyDown';
import { useLocalStorage } from 'hooks/useLocalStorage';

import { GridOverlay } from './GridOverlay';

const LOCAL_STORAGE_KEY_VISIBLE = '_devtoolsActive';

export const Devtools = () => {
  const [isVisible, setVisible] = useLocalStorage(LOCAL_STORAGE_KEY_VISIBLE, false);
  const keys = useKeyDown();

  useEffect(() => {
    if (keys.includes('Control') && keys.includes('k')) {
      setVisible(!isVisible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys]);

  return isVisible ? <GridOverlay /> : null;
};
