import * as React from 'react';

import { Link } from 'components/link/Link';

import c from 'classnames';
import s from './Button.module.scss';

interface IProps {
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Button = ({ to, children, className, disabled, ...rest }: IProps) => {
  const passProps = { ...rest };
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

  // disabled prop only on <button>
  passProps.disabled = disabled;

  return <button {...passProps}>{children}</button>;
};
