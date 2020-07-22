import { useRef, useEffect, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Box } from 'components/gsap/box/Box';

import s from './GetTweenValue.module.scss';
// counter object for gsap to update
// thats what it expects to be able to tween
const counter = {
  totalValue: 0,
};

export const GetTweenValue = () => {

  // elements
  const triggerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  
  // timeline instance - should be ref?
  const [timeline] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));

  // twwen value to be updated on scroll
  const [index, setIndex] = useState(0);
  
  // blend some volours on scroll
  const initialColor = 'rgba(204, 153, 0, 0.3)';
  const lastColor = '#1699ca';
  const interpolation = gsap.utils.interpolate([initialColor, lastColor]);

  const buildTimeline = () => {
    if (!parentRef.current || !triggerRef.current) {
      return;
    }
  
    timeline.addLabel('start');
    
    // timeline defaults
    const duration = 1;
    const ease = 'power0.out';
    // how many times to loop sequence within scrollTrigger
    const sequenceIterations = 3;

    // update state from tweened counter value
    const onUpdate = () => {
      setIndex(counter.totalValue);
    }

    ScrollTrigger.create({
      id: 'od47',
      trigger: triggerRef.current,
      start: 'top 30%',
      end: 'bottom 100%',
      scrub: 1,
      // this is a required property in 3.4.1
      refreshPriority: 0,
      // animate counter object, parent box css vars and rotation on box
      animation: 
        timeline
          .to(counter, // counter
          {
            duration,
            ease,
            // animate totalValue to 99
            totalValue: 99 * sequenceIterations,
            modifiers: {
              totalValue: (value) =>  {
                var newX = value % 99;

                return gsap.utils.snap(1, newX); // round number
              }
            },
            onUpdate,
          }, 'start')
          .to(boxRef.current, { rotateY: 180, duration, ease }, 'start')
          .fromTo(parentRef.current,
            { '--background': interpolation(0) },
            { '--background': interpolation(1), duration, ease }, 'start')
        
    })
  }

  useEffect(() => {
    parentRef.current.style.setProperty('--background', initialColor);
    buildTimeline();

    return () => ScrollTrigger.getById('od47').kill(true);
  }, []);

  // *could* use quickSetter on state update of value
  // useEffect(() => {
  //   const setBg = gsap.quickSetter(parentRef.current, '--background');
  // }, [index]);

  return (
    <>
    <div ref={triggerRef} className={s.trigger}></div>
      <div ref={parentRef}>
        <Box className={s.box} ref={boxRef}>
          <span className={s.box__text} style={{ background: 'var(--background)' }}>{index}</span>
        </Box>
      </div>
    </>
  );
}