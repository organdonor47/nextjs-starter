import { useRef, useEffect, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Box } from 'components/gsap/box/Box';

// counter object for gsap to update
// thats what it expects to be able to tween
const counter = {
  totalValue: 0,
};

export const Interpolate = () => {

  const parentRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [timeline] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));
  const [index, setIndex] = useState(0);
  
  // blend some volours on scroll
  const initialColor = 'rgba(204, 153, 0, 0.3)';
  const lastColor = '#1699ca';
  const interpolation = gsap.utils.interpolate([initialColor, lastColor]);

  const buildTimeline = () => {
    // not going to use quicksetter here, use a tween instead
    // const setBg = gsap.quickSetter(parentRef.current, '--background');
    timeline.addLabel('start');
    const duration = 1;
    const ease = 'none';

    // update state from tween value
    const onUpdate = () => {
      if (!parentRef.current) {
        return;
      }

      setIndex(counter.totalValue)
    }

    ScrollTrigger.create({
      trigger: parentRef.current,
      start: 'top 90%',
      end: 'bottom 90%',
      scrub: 1,
      // animate counter object, parent box css vars and rotation on box
      animation: 
        timeline
          .to(counter, // counter
          {
            duration,
            ease,
            // animate totalValue to 100
            totalValue: 100,
             // snap to whole integer
            snap: { totalValue: 1 },
            onUpdate,
          }, 'start')
          .to(boxRef.current, { rotation: 180, duration, ease }, 'start')
          .fromTo(parentRef.current,
            { '--background': interpolation(0) },
            { '--background': interpolation(1), duration, ease }, 'start')
        
    })
  }

  useEffect(() => {
    parentRef.current.style.setProperty('--background', initialColor);
    buildTimeline();

    return () => timeline.kill();
  }, []);

  return (
    <div ref={parentRef}>
      {index}
      <Box ref={boxRef} style={{ background: 'var(--background, initialColor)' }} />
      
    </div>
  );
}