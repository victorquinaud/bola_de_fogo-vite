import { createContext, useCallback } from "react";
import usePersistedState from "../hooks/usePersistedState";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global";

import light from './../styles/themes/light';
import dark from './../styles/themes/dark';

type Themes = "light" | "dark";

interface Response {
  toggleTheme(): void
}

export const StyledThemeContext = createContext<Response | null>(null);

export const StyledThemeProvider = ({ children }: React.PropsWithChildren) => {
  const { state: theme, setState: setTheme } = usePersistedState<Themes>("THEME", "light");

  const toggleTheme = () => {
    setTheme(theme => theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <StyledThemeContext.Provider value={{
        toggleTheme
      }}>
        <GlobalStyle />
        {children}
      </StyledThemeContext.Provider>
    </ThemeProvider>
  );
};

export default StyledThemeProvider;