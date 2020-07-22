/* 
 * Visual grid reference, viewed in dev environment only.
 * overlays content with grid columns / grid container for reference
 */

import React from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

import s from './GridOverlay.module.scss';

const LOCAL_STORAGE_KEY_ACTIVE = '_devtoolsActiveGrid';

export const GridOverlay = () => {
  const [isGridVisible, setGridVisible] = useLocalStorage(LOCAL_STORAGE_KEY_ACTIVE, true);

  const handleToggle = () => {
    setGridVisible(!isGridVisible);
  };

  return (
    <div className={s.grid}>
      <div className={s.grid__container}>
        {isGridVisible && <div className={s.grid__visual} />}
      </div>

      <button className={s.grid__button} onClick={handleToggle} title="toggle grid" />
    </div>
  );
};
