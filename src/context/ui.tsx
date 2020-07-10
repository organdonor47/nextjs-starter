/* UI CONTEXT
 * ___
 * some common UI values that can be passed into the app
 * NavOpen, toggleNav(), shouldTransition [for pages]
 */
import { createContext, useState, useEffect } from 'react';

export interface IContext {
  navOpen: boolean;
  toggleNav: (open: boolean) => void;

  shouldTransition: boolean;
  setShouldTransition: (shouldTransition: boolean) => void;
  
  canScroll: boolean;
  setCanScroll: (canScroll: boolean) => void;

  prefersReducedMotion: boolean;
  scrollbarWidth: number;
}

// export: allows useContext(UIContext);
export const UIContext = createContext<IContext>({
  // writeable states
  navOpen: false,
  toggleNav: (open: boolean) => !open,
    
  shouldTransition: false,
  setShouldTransition: (shouldTransition: boolean) => !shouldTransition,

  canScroll: false,
  setCanScroll: (canScroll: boolean) => !canScroll,

  // read-only
  prefersReducedMotion: false,
  scrollbarWidth: 0,
  
});

// exported UIProvider Component that wraps _app for children to optionally consume with useContext() hook
export const UIProvider = ({ children }: {children: React.ReactNode}) => {
  const [canScroll, setCanScroll] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(true);

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
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
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

        navOpen,
        toggleNav,

        shouldTransition,
        setShouldTransition,

        prefersReducedMotion,
        scrollbarWidth,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
