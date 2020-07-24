import { useRef, useEffect, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Box } from 'components/gsap/box/Box';

import s from './MediaQueries.module.scss';

export const MediaQueries = () => {

  // elements
  const parentRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // set these up and kill individually
  const mobileTimeline = useRef<GSAPTimeline>(gsap.timeline());
  const desktopTimeline = useRef<GSAPTimeline>(gsap.timeline());
  const allTimeline = useRef<GSAPTimeline>(gsap.timeline());

  const hasMounted = useRef<boolean>(false); // flag for initialising timeline

  const buildTimeline = () => {

  if (!parentRef.current) {
    return;
  }

  const triggerDefaults: gsap.plugins.ScrollTriggerInstanceVars = {
    trigger: `.${s.parent}`,
    scrub: 1,
    pin: true,
    end: '200%',
  }

  ScrollTrigger.saveStyles([boxRef.current, mobileRef.current]);

  ScrollTrigger.matchMedia({
    '(min-width: 720px)': () => {
      if (!boxRef.current) {
        console.log('this non-mobile query should be firing only on media query demo page'); 
      }

      ScrollTrigger.create({
        ...triggerDefaults,
        animation: desktopTimeline.current
          .to(boxRef.current, {scale: 2, rotation: 360})
          .to(boxRef.current, {scale: 1})
      });
    }, 
    
    '(max-width: 719px)': () => {
      if (!mobileRef.current) {
        console.log('this mobile query should be firing only on media query demo page'); 
      }

      ScrollTrigger.create({
        ...triggerDefaults,
        animation: mobileTimeline.current
          .to(mobileRef.current, {scale: 1.5, rotation: 360})
          .to(mobileRef.current, {scale: 1})
      });
    }, 
    
    // always happens
    'all': () => {
      if (!parentRef.current) {
        console.log('this query is always executed, but should be firing only on media query demo page'); 
      }

      ScrollTrigger.create({
        ...triggerDefaults,
        animation: allTimeline.current
          .to(parentRef.current.childNodes, {opacity: 1})
      });
    }
    
  });
  }

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      buildTimeline();
    }
    

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());

      // kill specific timelines?
      mobileTimeline.current.kill();
      desktopTimeline.current.kill();
      allTimeline.current.kill();
    }
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.parent} ref={parentRef}>
        <Box className={`${s.box} ${s.notMobile}`} ref={boxRef}>
          <span>I animate when its not mobile</span>
        </Box>

        <Box className={`${s.box} ${s.mobile}`} ref={mobileRef}>
          <span>I animate in mobile</span>
        </Box>
      </div>
    </div>
  );
}