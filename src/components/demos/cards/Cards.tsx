import { useEffect, useRef, useContext, useCallback } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { UIContext } from 'context/ui';

import { Grid } from 'components/grid/Grid';
import { H2 } from 'components/heading/Heading';

import c from 'classnames';
import s from './Cards.module.scss';

// use <Grid /> component with defualt column options to build an even grid
export const Cards = ({ children }: { children: React.ReactNode }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { uiState } = useContext(UIContext);

  const animate = useCallback(() => {
    if (!triggerRef.current || uiState.prefersReducedMotion) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cards = listRef.current!.querySelectorAll(`.${s.card}`);
    console.log(typeof cards);

    ScrollTrigger.batch(cards, {
      interval: 0.25, // wait for [interval] before starting a new "batch"
      batchMax: 3, // number of els to be batched
      onEnter: (elements: Array<Element>) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: { each: 0.15 },
          duration: 0.5,
          ease: 'power1.out',
        });
      },
    });
  }, [uiState.prefersReducedMotion]);

  useEffect(() => {
    animate();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [uiState.prefersReducedMotion, animate]);

  return (
    <div ref={triggerRef}>
      <Grid className={c(s.cards, s.animate)}>
        <ul style={{ display: 'contents' }} ref={listRef}>
          {children}
        </ul>
      </Grid>
    </div>
  );
};

interface ICardProps {
  heading: string | React.ReactElement;
  date?: string;
  children: React.ReactNode;
}

// styled with subgrid to align content
export const Card = ({ heading, date, children }: ICardProps) => {
  return (
    <li className={s.card}>
      <H2 as="h3" className={s.card__heading}>
        {heading}
      </H2>
      {children}
      {date && <div className={s.card__date}>{date}</div>}
    </li>
  );
};
