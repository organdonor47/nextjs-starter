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
}

export const UIContext = createContext<IUIContext>({
  navOpen: false,
  toggleNav: (open: boolean) => !open,
  prefersReducedMotion: false,
  scrollbarWidth: 0,
  shouldTransition: true,
  setShouldTransition: (shouldTransition: boolean) => !shouldTransition,
});

// UI Provider
export const UIProvider = ({ children }: IProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(true);

  const getScrollbarWidth = () => {
      // Add temporary box to wrapper
    const scrollEl = document.createElement('div');
    
    scrollEl.style.overflow = 'scroll';
    document.body.appendChild(scrollEl);

    setScrollbarWidth(scrollEl.offsetWidth - scrollEl.clientWidth);
  
    // Remove box
    document.body.removeChild(scrollEl);
  }

  // check user preferences for animation
  // check scrollbar width
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    getScrollbarWidth();
  }, []);

  // util for overflow on html element
  const preventScroll = (prevent: boolean, isNavOpen?: boolean) => {
    const htmlClassName = isNavOpen ? 'nav-open' : 'scroll-disabled';

    prevent
      ? document.documentElement.classList.add(htmlClassName)
      : document.documentElement.classList.remove(htmlClassName);
  };

  // combine prevent scroll, scrollbar measuring on openning / closing nav
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
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const withUIContext = (Component: any) => (props: any) => (
  <UIContext.Consumer>{context => <Component {...props} ui={context} />}</UIContext.Consumer>
);
