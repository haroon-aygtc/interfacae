import React from 'react';
import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon, SparklesIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
    const { theme, setTheme, themes } = useTheme();

    const toggleTheme = () => {
        // Cycle through themes: light -> dark -> luxury -> light
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    // Render the appropriate icon based on current theme
    const renderIcon = () => {
        switch (theme) {
            case 'light':
                return <SunIcon className="h-5 w-5" />;
            case 'dark':
                return <MoonIcon className="h-5 w-5" />;
            case 'luxury':
                return <SparklesIcon className="h-5 w-5" />;
            default:
                return <SunIcon className="h-5 w-5" />;
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle rounded-full p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={`Change theme, current theme: ${theme}`}
        >
            {renderIcon()}
        </button>
    );
};

export default ThemeToggle;
