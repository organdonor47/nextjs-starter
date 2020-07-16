// a sane version of Link without having to write a child anchor & whatnot
import { useContext } from 'react';
import NextLink from 'next/link'; // alias of Link

import { UIContext } from 'context/ui';

export interface ILinkProps {
  children: React.ReactNode;
  to: string;
  as?: string;
  transition?: boolean;
  className?: string;
  [key: string]: any;
}

export const Link = ({ children, to, as, transition = true, ...props } :
  ILinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {

  // prop: transiton = opt in or out of a page transition
  // (i.e tabs might not require a transition)
  // defaults to active page transitions
  const { toggleNav, setcanTransition, prefersReducedMotion } = useContext(UIContext);

  const handleClick = () => {
    toggleNav(false);
    setcanTransition(prefersReducedMotion ? false : transition);
  };
  
  return (
    <NextLink href={to} as={as} scroll={prefersReducedMotion ? true : !transition}>
      <a {...props} onClick={handleClick}>{children}</a>
    </NextLink>
  );

}
