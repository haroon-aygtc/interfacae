declare module './ThemeProvider' {
    export interface ThemeContextType {
        theme: string;
        themes: string[];
        setTheme: (theme: string) => void;
        toggleTheme: () => void;
    }

    export const ThemeProvider: React.FC<{ children: React.ReactNode }>;
    export const useTheme: () => ThemeContextType;
    export default ThemeProvider;
}
