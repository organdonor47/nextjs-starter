import React, { useEffect, useRef } from 'react';

import { useKeyDown } from 'hooks/useKeyDown';
import { useLocalStorage } from 'hooks/useLocalStorage';

import c from 'classnames';
import s from './grid-overlay.module.scss';

const LOCAL_STORAGE_KEY_ACTIVE = '_devtoolsActiveGrid';

interface IProps {
  button: boolean;
}

export const GridOverlay = ({ button }: IProps) => {
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useLocalStorage(LOCAL_STORAGE_KEY_ACTIVE, false);
  const keys = useKeyDown();

  console.log(isVisible);
  

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
      className={c(s.grid, { [s.isVisible]: isVisible })}
    >
      <div className={s.grid__container}>
        {isVisible && <div className={s.grid__visual} />}
      </div>

      {button ? (
        <>
          <button className={s.grid__button} onClick={onToggle}>
            <svg className={s.grid__button__svg} width="14" height="14" viewBox="0 0 14 14">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="2" height="14" />
                <rect x="4" y="0" width="2" height="14" />
                <rect x="8" y="0" width="2" height="14" />
                <rect x="12" y="0" width="2" height="14" />
              </g>
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
};
