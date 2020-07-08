/* UI CONTEXT
 * ___
 * some common UI values that can be passed into the app
 * NavOpen, toggleNav(), shouldTransition [for pages]
 */
import { createContext, useState, useEffect } from 'react';

export interface IContext {
  navOpen: boolean;
  prefersReducedMotion: boolean;
  scrollbarWidth: number;
  setShouldTransition: (shouldTransition: boolean) => void;
  shouldTransition: boolean;
  toggleNav: (open: boolean) => void;
}

// export: allows useContext(UIContext);
export const UIContext = createContext<IContext>({
  navOpen: false,
  prefersReducedMotion: false,
  scrollbarWidth: 0,
  setShouldTransition: (shouldTransition: boolean) => !shouldTransition,
  shouldTransition: false,
  toggleNav: (open: boolean) => !open,
});

// exported UIProvider Component that wraps _app for children to optionally consume with useContext() hook
export const UIProvider = ({ children }: {children: React.ReactNode}) => {
  const [navOpen, setNavOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(true);

  // create overflow box and return value of scrollbar width
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

  // function for overflow on html element (ie navigation open, modal open etc)
  const preventScroll = (prevent: boolean, isNavOpen?: boolean) => {
    // nav open distinction is so overflow is only in "mobile"
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
        prefersReducedMotion,
        scrollbarWidth,
        setShouldTransition,
        shouldTransition,
        toggleNav,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
