/* UI CONTEXT
 * ___
 * some common UI values that can be passed into the app
 * overflow state on content; toggle nav state; transition opt in / out;
 */
import { createContext, useState, useEffect } from 'react';

export interface IContext {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;

  navOpen: boolean;
  toggleNav: (open: boolean) => void;

  canTransition: boolean;
  setcanTransition: (canTransition: boolean) => void;
  
  canScroll: boolean;
  setCanScroll: (canScroll: boolean) => void;

  prefersReducedMotion: boolean;
  // scrollbarWidth: number;
}

// export: allows useContext(UIContext);
export const UIContext = createContext<IContext>({
  // writeable states
  isLoading: false,
  setLoading: (isLoading: boolean) => !isLoading,

  navOpen: false,
  toggleNav: (open: boolean) => !open,
    
  canTransition: false,
  setcanTransition: (canTransition: boolean) => !canTransition,

  canScroll: false,
  setCanScroll: (canScroll: boolean) => !canScroll,

  // read-only
  prefersReducedMotion: false,
  // scrollbarWidth: 0,
  
});

// exported UIProvider Component that wraps _app for children to optionally consume with useContext() hook
export const UIProvider = ({ children }: {children: React.ReactNode}) => {
  const [canScroll, setCanScroll] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [canTransition, setcanTransition] = useState(true);

  // create overflow box and return value as scrollbarWidth
  const getScrollbarWidth = () => {
    const scrollEl = document.createElement('div');
    
    scrollEl.style.overflow = 'scroll';
    document.body.appendChild(scrollEl);

    setScrollbarWidth(scrollEl.offsetWidth - scrollEl.clientWidth);
  
    // remove box
    document.body.removeChild(scrollEl);
  }

  // check user preferences for animation on mount
  // also check scrollbar width
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(reducedMotion.matches);
    getScrollbarWidth();

  }, []);

  // on canScroll change, call preventScroll()
  useEffect(() => {
    preventScroll(!canScroll);

  }, [canScroll]);

  // function for overflow on html element (ie navigation open, modal open etc)
  const preventScroll = (prevent: boolean, isNavOpen?: boolean) => {
    // nav open distinction is so overflow is only in "mobile"
    const htmlClassName = isNavOpen ? 'nav-open' : 'scroll-disabled';
    const rootClasses = document.documentElement.classList;

    // if a scrollbar exists, add this value to body on overflow hiddn to prevent content jump
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = prevent ? `${scrollbarWidth}px` : '0';
    }

    prevent
      ? rootClasses.add(htmlClassName)
      : rootClasses.remove(htmlClassName);
  };

  // function called to open / close nav
  // combine preventScroll, scrollbarWidth check
  const toggleNav = (open: boolean) => {
    preventScroll(open, true);

    setNavOpen(open);
  };

  return (
    <UIContext.Provider
      value={{
        canScroll,
        setCanScroll,

        isLoading,
        setLoading,

        navOpen,
        toggleNav,

        canTransition,
        setcanTransition,

        prefersReducedMotion,
        // scrollbarWidth,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
