import { gsap } from 'gsap';
import { useState, useEffect, useRef, useContext } from 'react';

import s from './Effect.module.scss';
import { Button } from 'components/button/Button';
import { UIContext } from 'context/ui';
import { Box } from '../box/Box';

interface ITimelineProps {
  paused: boolean;
  forwards: boolean;
  showDirectionControl: boolean;
  duration: number;
}

export const Effect = ({children}: { children?: React.ReactNode }) => {

  const { prefersReducedMotion } = useContext(UIContext);
  const divRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false); // flag for init
  const [timeline] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));
  
  const [timelineState, setTimelineState] = useState<ITimelineProps>({
    paused: true,
    forwards: true,
    showDirectionControl: false,
    duration: 0
  });

  const { paused, forwards, showDirectionControl } = timelineState;

  // forward animation finishes
  const onComplete = () => {
    setTimelineState((prevState) => ({
      ...prevState,
      paused: true,
      showDirectionControl: true,
    }));
  }

  const onReverseComplete = () => {
    setTimelineState((prevState) => ({
      ...prevState,
      paused: true,
      forwards: true,
    }));
  }

  const buildTimeline = () => {
    // build timeline on mount

    // complete callbacks
    timeline.eventCallback('onComplete', onComplete).eventCallback('onComplete', onReverseComplete);

    // register a reusable effect
    gsap.registerEffect({
      name: 'slideFadeSpin',
      effect: (targets, config) => {
          return gsap.to(targets, {duration: config.duration, opacity: 1, y: 0, rotate: 180 });
      },
      defaults: {
        duration: 2,
      },
      extendTimeline: true, // call the effect directly on timeline
    });

    // @ts-ignore (property slideFadeSpin does not exist on timeline)
    timeline.slideFadeSpin(divRef.current, {});

    setTimelineState((prevState) => ({
      ...prevState,
      duration: timeline.duration(),
    }));
  }

  useEffect(() => {
    const currentTime = timeline.time();
    const { duration } = timelineState;

    if (!hasAnimated.current) {
      buildTimeline();

      hasAnimated.current = true;
    }

    // timeline built
    if (hasAnimated.current) {
      if (paused) {
        timeline.pause();
      }

      else {
        if (currentTime === duration) {
          // has ended, start from beginnning
          timeline.seek(0).play();
        } else {
          currentTime > 0 ? timeline.resume() : timeline.play();
        }
      }
    }

    return () => {
      timeline.kill();
    }
    
  }, [paused]);

  useEffect(() => {
    // const duration = timeline.duration();
    // const currentTime = timeline.time();

    // if (paused && currentTime !== duration) {
    //   return;
    // }

    // if (currentTime !== duration) {

    // }
    
    // forwards ? timeline.play() : timeline.reverse();

  }, [forwards]);

  return (
    <>
      <Button
        style={{ marginBottom: 30 }}
        onClick={() => setTimelineState((prevState) => ({...prevState, paused: !paused }))}
      >
        {paused ? 'Play' : 'Pause'}
      </Button>

      {/* <Button disabled={!showDirectionControl} style={{ marginLeft: 30 }} onClick={() => setForwards(!forwards)}>{forwards ? 'Rewind' : 'Forward'}</Button> */}

      <div className={s.grid}>
        <Box ref={divRef} className={s.grid__box}>BOXX!</Box>
      </div>
    </>
  );
}