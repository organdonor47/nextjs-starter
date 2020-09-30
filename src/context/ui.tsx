/* UI CONTEXT
 * ___
 * some common UI values that can be passed into the app to children via <UIProvider />
 * states include overflow state; navOpen (mobile only by default); page transition opt in / out;
 */
import { createContext, useState, useEffect, useCallback } from 'react';

interface IUIState {
  isLoading?: boolean;
  isNavOpen?: boolean;
  canTransition?: boolean;
  canScroll?: boolean;
  readonly prefersReducedMotion?: boolean;
  readonly scrollbarWidth?: number;
}

interface IContext {
  uiState: IUIState;
  setUIState: (args: IUIState) => void;
}

// export UIContext. usage: React.useContext(UIContext);
export const UIContext = createContext<IContext>({
  uiState: {
    isLoading: false,
    isNavOpen: false,
    canScroll: true,
    canTransition: false,
    prefersReducedMotion: false,
    scrollbarWidth: 0,
  },

  setUIState: null,
});

// exported UIProvider Component
// wraps _app for children to optionally consume with useContext() hook
export const UIProvider = ({ children }: {children: React.ReactNode}) => {

  // setup initial values, updated from DOM on mount 
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const [uiState, updateUiState] = useState<IUIState>({
    // writable values
    isLoading: false,
    isNavOpen: false,
    canScroll: true,
    canTransition: false,
    // readonly
    prefersReducedMotion,
  });

  // alias to update uiState 
  // stops having to pass previous state back in every time
  const setUIState = (state: IUIState) => {
    updateUiState((prevState) => ({
    ...prevState,
    ...state,
    }));
  }

  // create overflow box and return value as scrollbarWidth
  // useful to prevent page jump when toggling overflow,
  // & scrollbars in OS are set to always be visible
  const getScrollbarWidth = useCallback(() => {
    const scrollEl = document.createElement('div');

    scrollEl.style.overflow = 'scroll';
    document.body.appendChild(scrollEl);

    setUIState({ scrollbarWidth: scrollEl.offsetWidth - scrollEl.clientWidth });

    // remove box
    document.body.removeChild(scrollEl);
  }, []);

  // check user OS preferences for animation & scrollbar width on mount
  // todo: listen to updates rather than just one-hit?
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setUIState({ prefersReducedMotion: reducedMotion.matches });

  }, []);

    // function for setting overflow on html element (ie navigation open, modal open etc)
  // classnames are in global.scss
  const preventScroll = useCallback(
    (prevent: boolean, isNavOpen?: boolean) => {
      // nav open distinction is so overflow is only in "mobile"
      const htmlClassName = isNavOpen ? 'nav-open' : 'scroll-disabled';
      const rootClasses = document.documentElement.classList;
      // if a scrollbar exists, add this value to body on overflow hidden
      if (uiState.scrollbarWidth ?? 0 > 0) {
        document.body.style.paddingRight = prevent ? `${uiState.scrollbarWidth}px` : '0';
      }

      prevent ? rootClasses.add(htmlClassName) : rootClasses.remove(htmlClassName);
    },
    [uiState.scrollbarWidth],
  );

  // on "canScroll" change, toggle preventScroll()
  useEffect(() => {
    getScrollbarWidth();
    preventScroll(!uiState.canScroll);
  }, [uiState.canScroll, getScrollbarWidth, preventScroll]);

  // toggle nav states
  useEffect(() => {
    preventScroll(uiState.isNavOpen ?? false, true);
  }, [uiState.isNavOpen, preventScroll]);

  return (
    <UIContext.Provider
      value={{
        uiState,
        setUIState,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}