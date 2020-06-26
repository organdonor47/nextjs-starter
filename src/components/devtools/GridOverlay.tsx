import React, { useEffect, useRef } from 'react';

import { useKeyDown } from 'hooks/useKeyDown';
import { useLocalStorage } from 'hooks/useLocalStorage';

import s from './GridOverlay.module.scss';

const LOCAL_STORAGE_KEY_ACTIVE = '_devtoolsActiveGrid';

interface IProps {
  button: boolean;
}

export const GridOverlay = ({ button }: IProps) => {
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useLocalStorage(LOCAL_STORAGE_KEY_ACTIVE, false);
  const keys = useKeyDown();

  const onToggle = () => {
    setVisible(!isVisible);
  };

  useEffect(() => {
    if (keys.includes('Control') && keys.includes('k')) {
      onToggle();
    }
  }, [keys]);

  return (
    <div
      ref={gridOverlayRef}
      className={s.grid}
    >
      <div className={s.grid__container}>
        {isVisible && <div className={s.grid__visual} />}
      </div>

      {button && (
        <button className={s.grid__button} onClick={onToggle} title="toggle grid" />
      )}
    </div>
  );
};
