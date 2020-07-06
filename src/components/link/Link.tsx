// a sane version of Link without having to write a child anchor & whatnot
import { useContext } from 'react';
// alias of Link
import NextLink from 'next/link';
import { UIContext } from 'context/ui';

interface IProps {
  children: React.ReactNode;
  to: string;
  as?: string;
  transition?: boolean;
}

export const Link = ({ children, to, as, transition = true, ...props } : IProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {

  const { setShouldTransition } = useContext(UIContext);

  const onClick = () => {
    // opt in or out of page transition, default to transition
    setShouldTransition(transition);
  };
  
  return (
    <NextLink href={to} as={as} scroll={!transition}>
      <a {...props} onClick={onClick}>{children}</a>
    </NextLink>
  );

}
