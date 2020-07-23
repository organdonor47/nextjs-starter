import { useRef, useEffect, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Box } from 'components/gsap/box/Box';

import c from 'classnames';
import s from './MediaQueries.module.scss';

export const MediaQueries = () => {

  // elements
  const parentRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  
  // timeline instance - should be ref?
  const [timeline] = useState<GSAPTimeline>(gsap.timeline({ paused: true }));

  const buildTimeline = () => {
    if (!mobileRef.current || !desktopRef.current || !parentRef.current) {
      return;
    }

    // re-apply styles on media change
    ScrollTrigger.saveStyles([mobileRef.current, desktopRef.current]);

    ScrollTrigger.matchMedia({
    
      // desktop
      "(min-width: 720px)": function() {
          // setup animations and ScrollTriggers for screens over 800px wide (desktop) here...
          // ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
      let tl = gsap.timeline({
            scrollTrigger: {
            trigger: parentRef.current,
            scrub: 1,
            end: "200%",
            pin: true
          }
        });
      tl.to(desktopRef.current, {scale: 2, rotation: 360})
        .to(desktopRef.current, {scale: 1});
    }, 
    
      // mobile
      "(max-width: 719px)": function() {
          // Any ScrollTriggers created inside these functions are segregated and get
          // reverted/killed when the media query doesn't match anymore. 
      let tl = gsap.timeline({ 
          scrollTrigger:{
            trigger: parentRef.current,
            scrub: 1,
            end: "200%",
            pin: true
          }
        });
      tl.to(mobileRef.current, {scale: 2, rotation: 360})
        .to(mobileRef.current, {scale: 1});
    }, 
    
      // all 
      "all": function() {
          // ScrollTriggers created here aren't associated with a particular media query,
          // so they persist.
      }
    
  });
  }

  useEffect(() => {
    buildTimeline();
  }, []);

  return (
    <div className={s.parent} ref={parentRef}>
      <Box className={`${s.box} ${s.desktop}`} ref={desktopRef}>
        BOX desktop
      </Box>

      <Box className={`${s.box} ${s.mobile}`} ref={mobileRef}>
        BOX mobile
      </Box>
    </div>
  );
}