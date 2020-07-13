// container Nav component, any data for nav structure should go here
// container gets imported into 'components/layout/Layout'

import { Nav } from 'components/nav/Nav';
import { NavLink } from 'components/nav/NavLink';

export const NavContainer = () => (
  <Nav>
    <NavLink to="/examples">Examples</NavLink>
    <NavLink to="/posts/[id]" as={`/posts/markdown-kitchen-sink`}>HTML elements</NavLink>
    <NavLink to="/forms">Form elements</NavLink>
  </Nav>
);