import { useEffect } from 'react';

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

  }, [keys]);

  return (
    <>
      <GridOverlay devToolsVisible={isVisible} />
    </>
  );
};
