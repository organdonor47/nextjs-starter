/* 
 * Visual grid reference, viewed in dev environment only.
 * overlays content with grid columns / grid container for reference
 */

import React, { useEffect, useRef } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

import s from './GridOverlay.module.scss';

const LOCAL_STORAGE_KEY_ACTIVE = '_devtoolsActiveGrid';

interface IProps {
  devToolsVisible: boolean;
}

export const GridOverlay = ({ devToolsVisible }: IProps) => {
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const [isGridVisible, setGridVisible] = useLocalStorage(LOCAL_STORAGE_KEY_ACTIVE, true);

  const handleToggle = () => {
    setGridVisible(!isGridVisible);
  };

  useEffect(() => {
    setGridVisible(devToolsVisible);
  }, [devToolsVisible]);

  return (
    <div
      ref={gridOverlayRef}
      className={s.grid}
    >
      <div className={s.grid__container}>
        {isGridVisible && <div className={s.grid__visual} />}
      </div>

      {devToolsVisible && (
        <button className={s.grid__button} onClick={handleToggle} title="toggle grid" />
      )}
    </div>
  );
};
