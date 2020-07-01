// a sane version of Link without having to write a child anchor & whatnot
import React from 'react';
// alias of Link
import NextLink from 'next/link';

interface IProps {
  children: React.ReactNode;
  to: string;
  as?: string;
}

export const Link = ({ children, to, as, ...props } : IProps) => (
  <NextLink href={to} as={as}>
    <a {...props}>{children}</a>
  </NextLink>
);
