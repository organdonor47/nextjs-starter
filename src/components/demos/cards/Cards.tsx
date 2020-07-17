import { useEffect, useRef, useContext } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { UIContext } from 'context/ui';

import { Grid } from 'components/grid/Grid';
import { H2 } from 'components/heading/Heading';

import c from 'classnames';
import s from './Cards.module.scss';

// use <Grid /> component with defualt column options to build an even grid
export const Cards = ({ children }: {children: React.ReactNode; }) => {

  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { uiState } = useContext(UIContext);

  const animate = () => {
    if (!triggerRef.current || uiState.prefersReducedMotion ) {
      return;
    }
      
    gsap.to(listRef.current.childNodes, {
        scrollTrigger: {
          trigger: triggerRef.current,
          toggleActions: 'restart pause resume pause',
          // markers: true,
          scrub: 1,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power4.inOut',
      });
  };

  useEffect(() => {
    animate();
  }, [uiState.prefersReducedMotion]);

  return (
    <div ref={triggerRef}>
      <Grid className={c(s.cards, s.animate)}>
        <ul style={{ display: 'contents' }} ref={listRef}>
          {children}
        </ul>
      </Grid>
    </div>
  );
}

interface ICardProps {
  heading: string | React.ReactElement;
  date: string;
  children: React.ReactNode;
}

// styled with subgrid to align content
export const Card = ({heading, date, children }: ICardProps) => {

  return (
    <li className={s.card}>
      <H2 as="h3" className={s.card__heading}>{heading}</H2>
      {children}
      <div className={s.card__date}>{date}</div>
    </li>
  );
}