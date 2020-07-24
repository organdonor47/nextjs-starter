import { gsap } from 'gsap';
import { useState, useEffect, useRef } from 'react';

import { Button } from 'components/button/Button';
import { Box } from 'components/gsap/box/Box';

import s from './Effect.module.scss';

interface ITimelineProps {
  paused?: boolean;
  forwards?: boolean;
  duration?: number;
}

export const Effect = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));
  
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

  // called on mount
  const buildTimeline = () => {

    // timeline complete callbacks
    timeline.current.eventCallback('onComplete', onComplete).eventCallback('onReverseComplete', onComplete);

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

    // @ts-ignore (property slideFadeSpin does not exist on timeline). well i know as i just added it
    timeline.current.slideFadeSpin(divRef.current, {});
    // effect can also be called as `gsap.effects.slideFadeSpin(el, {opts});`

    // let component know real duration post-mount
    updateState({duration: timeline.current.duration()});
  }

  // animate based on direction
  const handleDirection = () => {
    const currentTime = timeline.current.time();

    if (forwards) {
      if (currentTime === duration) {
        // has ended, start from beginnning
        timeline.current.seek(0).play();
      } else {
        timeline.current.play();
      }
    }
    
    else {
      if (currentTime === duration) {
        // has ended, start from end and reverse
        timeline.current.reverse();
        } else {
        currentTime > 0 ? timeline.current.reverse() : timeline.current.seek(duration).reverse();
      }
    }
  }

  // mount / play / pause logic

  const hasMounted = useRef<boolean>(false); // flag for initialising timeline
  useEffect(() => {
    if (!hasMounted.current) {
      
      // build timeline onMount
      buildTimeline();
      hasMounted.current = true;
    }

    paused ? timeline.current.pause() : handleDirection();

    return () => {
      timeline.current && timeline.current.kill();
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
        onChange={
          (e: React.ChangeEvent<HTMLSelectElement>) =>
          updateState({ forwards: e.target.value === 'forwards' })
        }
        defaultValue="forwards"
        style={{ marginLeft: 30 }}
      >
        <option value="forwards">Direction: Forwards</option>
        <option value="backwards">Direction: Backwards</option>
      </select>

      <div className={s.grid}>
        <Box ref={divRef} className={s.grid__box}>BOXX!</Box>
      </div>
    </>
  );
}