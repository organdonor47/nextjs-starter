/* UI CONTEXT
 * ___
 * some common UI values that can be passed into the app
 * NavOpen, toggleNav(), shouldTransition [for pages], get window.scrollY position [for routing?]
 */

import { createContext, useState, useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
}

export interface IUIContext {
  navOpen: boolean;
  toggleNav: (open: boolean) => void;
  prefersReducedMotion: boolean;
  scrollbarWidth: number;
  shouldTransition: boolean;
  setShouldTransition: (shouldTransition: boolean) => void;
  scrollY: number;
  setScrollY: (scrollY: number) => void;
}

export const UIContext = createContext<IUIContext>({
  navOpen: false,
  toggleNav: (open: boolean) => !open,
  prefersReducedMotion: false,
  scrollbarWidth: 0,
  shouldTransition: false,
  setShouldTransition: (shouldTransition: boolean) => !shouldTransition,
  scrollY: 0,
  setScrollY: (scrollY: number) => scrollY,
});

// UI Provider
export const UIProvider = ({ children }: IProps) => {
  // default states
  const [navOpen, setNavOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // create overflow box and return value of scrollbar width
  const getScrollbarWidth = () => {
    const scrollEl = document.createElement('div');
    
    scrollEl.style.overflow = 'scroll';
    document.body.appendChild(scrollEl);

    setScrollbarWidth(scrollEl.offsetWidth - scrollEl.clientWidth);
  
    // Remove box
    document.body.removeChild(scrollEl);
  }

  // check user preferences for animation on mount
  // also check scrollbar width
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    getScrollbarWidth();
  }, []);

  // util for overflow on html element (ie navigation open, modal open etc)
  const preventScroll = (prevent: boolean, isNavOpen?: boolean) => {
    const htmlClassName = isNavOpen ? 'nav-open' : 'scroll-disabled';

    const rootClasses = document.documentElement.classList;

    prevent
      ? rootClasses.add(htmlClassName)
      : rootClasses.remove(htmlClassName);
  };

  // function called to open / close nav
  // combine preventScroll, scrollbarWidth check
  const toggleNav = (open: boolean) => {
    preventScroll(open, true);

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = open ? `${scrollbarWidth}px` : '0';
    }

    setNavOpen(open);
  };

  return (
    <UIContext.Provider
      value={{
        navOpen,
        toggleNav,
        prefersReducedMotion,
        scrollbarWidth,
        shouldTransition,
        setShouldTransition,
        scrollY,
        setScrollY
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const withUIContext = (Component: any) => (props: any) => (
  <UIContext.Consumer>{context => <Component {...props} ui={context} />}</UIContext.Consumer>
);
