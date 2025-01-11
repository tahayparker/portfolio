import { createContext, useContext } from 'react';

export type ThemeType = 'dark' | 'light' | 'mono';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext); 