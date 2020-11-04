import * as React from 'react';

import { Link } from 'components/link/Link';

import classnames from 'classnames/bind';
import s from './Button.module.scss';
const c = classnames.bind(s);

interface IProps {
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
  transition?: boolean;
}

export const Button = ({
  to,
  children,
  className,
  disabled,
  transition,
  ...props
}: IProps) => {
  const passProps: React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> = { ...props };
  const isLink = typeof to !== 'undefined';
  const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to || '');

  passProps.className = c(className, { button: true, disabled });

  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={to} {...passProps}>
        {children}
      </a>
    );
  }

  if (isLink) {
    return (
      <Link to={to || '#'} transition={transition} {...passProps}>
        {children}
      </Link>
    );
  }

  return (
    <button {...passProps} disabled={disabled} aria-disabled={disabled}>
      {children}
    </button>
  );
};
