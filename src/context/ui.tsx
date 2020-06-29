import { createContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

export interface IUIContext {
  navOpen: boolean;
  toggleNav: (open: boolean) => void;
}

export const UIContext = createContext<IUIContext>({
  navOpen: false,
  toggleNav: (open: boolean) => !open,
});

// UI Provider
export const UIProvider = ({ children }: IProps) => {
  const [navOpen, setNavOpen] = useState(false);

  const preventScroll = (prevent: boolean) => {
    const htmlClassName = 'scroll-disabled';

    prevent
      ? document.documentElement.classList.add(htmlClassName)
      : document.documentElement.classList.remove(htmlClassName);
  };

  const toggleNav = (open: boolean) => {
    preventScroll(open);
    setNavOpen(open);
  };

  return (
    <UIContext.Provider
      value={{
        navOpen,
        toggleNav,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const withUIContext = (Component: any) => (props: any) => (
  <UIContext.Consumer>{context => <Component {...props} ui={context} />}</UIContext.Consumer>
);
