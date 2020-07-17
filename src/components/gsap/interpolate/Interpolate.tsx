import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useRef, useEffect } from 'react';

import { Box } from 'components/gsap/box/Box';

export const Interpolate = () => {

  const parentRef = useRef<HTMLDivElement>(null);
  const initialColor = 'rgba(204, 153, 0, 0.3)';
  const lastColor = '#1699ca';
  const interpolation = gsap.utils.interpolate([initialColor, lastColor]);

  const buildTimeline = () => {
    const setBg = gsap.quickSetter(parentRef.current, '--background');
    ScrollTrigger.create({
      trigger: parentRef.current,
      start: 'top 90%',
      end: 'bottom 90%',
      scrub: 1,
      onUpdate: ({progress}) =>  setBg(interpolation(progress)),
    });
  }

  useEffect(() => {
    parentRef.current.style.setProperty('--background', initialColor);
    buildTimeline();
  }, []);

  return (
    <div ref={parentRef}>
      <Box style={{ background: 'var(--background, initialColor)' }} />
    </div>
  );
}