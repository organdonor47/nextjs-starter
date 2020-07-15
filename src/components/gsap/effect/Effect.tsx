import { gsap } from 'gsap';
import { useState, useEffect, useRef } from 'react';

import s from './Effect.module.scss';

export const Effect = ({children}: { children?: React.ReactNode }) => {

  const divRef = useRef<HTMLDivElement>(null);

  const hasAnimated = useRef<boolean>(false);
  const [paused, setPaused] = useState(true);
  const [timeline] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));

  const buildTimeline = () => {

    gsap.registerEffect({
      name: 'slideIn',
      effect: (targets, config) => {
          return gsap.to(targets, {duration: config.duration, opacity: 1, y: 0 });
      },
      defaults: {
        duration: 2,
      },
      extendTimeline: true, // call the effect directly on timeline
    });

    if (!hasAnimated.current) {
      timeline.slideIn(divRef.current, {});

      hasAnimated.current = true;
    }
  }

  useEffect(() => {
    buildTimeline();

    if (!paused) {
      timeline.play();
    } else {
      timeline.reverse();
    }

    return () => {
      timeline.kill();
    }
    
  }, [paused]);

  return (
    <>
      <button onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>
      <div ref={divRef} className={s.box}>{children}</div>
    </>
  );
}