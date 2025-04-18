import React, { createContext, useContext, useEffect, useState } from 'react';
import '../styles/theme.css';

// Create theme context
const ThemeContext = createContext({
    theme: 'light',
    themes: ['light', 'dark', 'luxury'],
    setTheme: () => { },
    toggleTheme: () => { },
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
    // Get initial theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    const themes = ['light', 'dark', 'luxury'];

    // Toggle theme function
    const toggleTheme = () => {
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    // Update localStorage and document class when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);

        // Remove all theme classes and add the current one
        document.body.classList.remove(...themes);
        document.body.classList.add(theme);
    }, [theme, themes]);

    // Initial theme class application on mount
    useEffect(() => {
        // Apply the current theme class to the document
        document.body.classList.add(theme);

        // Cleanup function for component unmount
        return () => {
            document.body.classList.remove(...themes);
        };
    }, []);

    // Context value
    const value = {
        theme,
        themes,
        setTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider;
