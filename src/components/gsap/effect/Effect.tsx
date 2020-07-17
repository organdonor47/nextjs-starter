import { gsap } from 'gsap';
import { useState, useEffect, useRef, useContext, ChangeEvent } from 'react';

import s from './Effect.module.scss';
import { Button } from 'components/button/Button';
import { UIContext } from 'context/ui';
import { Box } from '../box/Box';

interface ITimelineProps {
  paused?: boolean;
  forwards?: boolean;
  duration?: number;
}

export const Effect = ({children}: { children?: React.ReactNode }) => {

  const { prefersReducedMotion } = useContext(UIContext);
  const divRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false); // flag for init
  const [timeline] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));
  
  const [timelineState, setTimelineState] = useState<ITimelineProps>({
    paused: true,
    forwards: true,
    duration: 0,
  });

  const { paused, forwards, duration } = timelineState;

  // shorthand alias to update misc states
  const updateState = (items: ITimelineProps) => {
    setTimelineState((prevState) => ({
      ...prevState,
      ...items,
    }));
  }

  // pause on complete
  const onComplete = () => {
    updateState({paused: true });
  }

  const onReverseComplete = () => {
    updateState({paused: true });
  }

  // called on mount
  const buildTimeline = () => {

    // timeline complete callbacks
    timeline.eventCallback('onComplete', onComplete).eventCallback('onReverseComplete', onReverseComplete);

    // register a reusable effect
    gsap.registerEffect({
      name: 'slideFadeSpin',
      effect: (targets, config) => {
          return gsap.to(targets, {duration: config.duration, opacity: 1, y: 0, rotate: 180 });
      },
      defaults: {
        duration: 3,
      },
      extendTimeline: true, // call the effect directly on timeline
    });

    // @ts-ignore (property slideFadeSpin does not exist on timeline)
    timeline.slideFadeSpin(divRef.current, {});
    // effect can also be called as `gsap.effects.slideFadeSpin(el, {opts});`

    // let component know real duration post-mount
    updateState({duration: timeline.duration()});
  }

  // animate based on direction
  const handleDirection = () => {
    const currentTime = timeline.time();

    console.log('forwards:', forwards);

    if (forwards) {
      if (currentTime === duration) {
        // has ended, start from beginnning
        timeline.seek(0).play();
      } else {
        timeline.play();
      }
    }
    
    else {
      if (currentTime === duration) {
        // has ended, start from end and reverse
        timeline.reverse();
        } else {
        currentTime > 0 ? timeline.reverse() : timeline.seek(duration).reverse();
      }
    }
  }

  // mount / play / pause logic
  useEffect(() => {
    if (!hasAnimated.current) {

      // build timeline onMount
      buildTimeline();

      hasAnimated.current = true;
    }

    if (paused) {
      timeline.pause();
    }

    else {
      handleDirection();
    }

    return () => {
      timeline.kill();
    }
    
  }, [paused]);

  // directional
  useEffect(() => {
    if (paused) {
      return;
    }

    handleDirection();
  }, [forwards]);

  return (
    <>
      <Button
        style={{ marginBottom: 30 }}
        onClick={() => updateState({ paused: !paused })}
      >
        {paused ? 'Play' : 'Pause'}
      </Button>

      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateState({ forwards: e.target.value === 'forwards' })}
        defaultValue="forwards"
        style={{ marginLeft: 30 }}
      >
        <option value="forwards">Direction: forwards</option>
        <option value="backwards">Direction: Backwards</option>
      </select>

      <div className={s.grid}>
        <Box ref={divRef} className={s.grid__box}>BOXX!</Box>
      </div>
    </>
  );
}