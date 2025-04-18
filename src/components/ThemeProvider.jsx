import React, { createContext, useContext, useEffect, useState } from 'react';
import '../styles/theme.css';

// Create a context for the theme
const ThemeContext = createContext();

// Theme options
const themeOptions = ['light', 'dark', 'luxury'];

// ThemeProvider component to wrap the app and provide theme functionality
export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    // Toggle through themes: light -> dark -> luxury -> light
    const toggleTheme = () => {
        const currentIndex = themeOptions.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themeOptions.length;
        setTheme(themeOptions[nextIndex]);
    };

    // Set specific theme
    const setSpecificTheme = (newTheme) => {
        if (themeOptions.includes(newTheme)) {
            setTheme(newTheme);
        }
    };

    // Update body class and localStorage when theme changes
    useEffect(() => {
        // Remove all theme classes
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-luxury');
        // Add current theme class
        document.body.classList.add(`theme-${theme}`);
        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Values to be provided by the context
    const value = {
        theme,
        toggleTheme,
        setTheme: setSpecificTheme,
        themeOptions
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider;
