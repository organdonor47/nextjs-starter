import * as React from 'react';

import { Link } from 'components/link/Link';
import { ILinkProps } from 'components/link/Link';

import c from 'classnames';
import s from './Button.module.scss';

interface IProps {
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
  transition?: boolean;
}

export const Button = ({ to, children, className, disabled, transition, ...props }: IProps) => {
  const passProps: React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>  = { ...props };
  const isLink = (typeof to !== 'undefined');
  const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to || '');

  passProps.className = c(s.button, className, { [s.disabled]: disabled });

  if (isExternal) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={to}
        {...passProps}
      >
        {children}
      </a>
    );
  }

  if (isLink) {
    return (
      <Link
        to={to || '#'}
        {...passProps}
      >
        {children}
      </Link>
    );
  }

  return <button {...passProps} disabled={disabled} aria-disabled={disabled}>{children}</button>;
};
