import { useRouter } from 'next/router';

import { Link, ILinkProps } from 'components/link/Link';

export const NavLink = ({ to, children }: ILinkProps) => {
  const router = useRouter();

  return (
    <Link to={to} aria-current={router.pathname === to ? 'page' : undefined} tabIndex={0}>
      {children}
    </Link>
  );
};
