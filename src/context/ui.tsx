import { createContext, useState, useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
}

export interface IUIContext {
  navOpen: boolean;
  toggleNav: (open: boolean) => void;
  prefersReducedMotion: boolean;
}

export const UIContext = createContext<IUIContext>({
  navOpen: false,
  toggleNav: (open: boolean) => !open,
  prefersReducedMotion: false,
});

// UI Provider
export const UIProvider = ({ children }: IProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // check user preferences for animation
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // util for overflow on html element
  const preventScroll = (prevent: boolean, isNavOpen?: boolean) => {
    const htmlClassName = isNavOpen ? 'nav-open' : 'scroll-disabled';

    prevent
      ? document.documentElement.classList.add(htmlClassName)
      : document.documentElement.classList.remove(htmlClassName);
  };

  // combine prevent scroll on openning / closing nav
  const toggleNav = (open: boolean) => {
    preventScroll(open, true);
    setNavOpen(open);
  };

  return (
    <UIContext.Provider
      value={{
        navOpen,
        toggleNav,
        prefersReducedMotion,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const withUIContext = (Component: any) => (props: any) => (
  <UIContext.Consumer>{context => <Component {...props} ui={context} />}</UIContext.Consumer>
);
