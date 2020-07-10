import { useRouter } from 'next/router';

import { Link, ILinkProps } from 'components/link/Link';

export const NavLink = ({ to, as, children } : ILinkProps) => {
  const router = useRouter();
  
  return (
    <Link to={to} as={as} aria-current={router.pathname === to ? 'page' : undefined}>
      {children}
    </Link>
  );
}