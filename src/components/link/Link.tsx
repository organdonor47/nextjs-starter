// a sane version of Link without having to write a child anchor & whatnot
import { useContext } from 'react';
// alias of Link
import NextLink from 'next/link';
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
  const { setShouldTransition } = useContext(UIContext);

  const onClick = () => {
    setShouldTransition(transition);
  };
  
  return (
    <NextLink href={to} as={as} scroll={!transition}>
      <a {...props} onClick={onClick}>{children}</a>
    </NextLink>
  );

}
