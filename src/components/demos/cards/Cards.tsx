import { Grid } from 'components/grid/Grid';
import { H2 } from 'components/heading/Heading';

import s from './Cards.module.scss';

// use <Grid /> component with defualt column options to build an even grid
export const Cards = ({children }: {
  children: React.ReactNode;
}) => {

  return (
    <Grid as="ul" className={s.cards}>
      {children}
    </Grid>
  );
}

interface ICardProps {
  heading: string | React.ReactElement;
  date?: string;
  children: React.ReactNode;
}

// styled with subgrid to align content
export const Card = ({heading, date, children }: ICardProps) => {

  return (
    <li className={s.card}>
      <H2 as="h3" className={s.card__heading}>{heading}</H2>
      {children}
      {date && <div className={s.card__date}>{date}</div>}
    </li>
  );
}