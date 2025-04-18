import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { BsGearFill } from 'react-icons/bs';
import { GiDiamonds } from 'react-icons/gi';
import '../styles/theme.css';

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const themeOptions = [
        { id: 'light', name: 'Light', icon: <FiSun className="text-yellow-500" /> },
        { id: 'dark', name: 'Dark', icon: <FiMoon className="text-blue-500" /> },
        { id: 'luxury', name: 'Luxury', icon: <GiDiamonds className="text-purple-500" /> },
        { id: 'system', name: 'System', icon: <BsGearFill className="text-gray-500" /> }
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Find current theme icon
    const currentThemeOption = themeOptions.find(option => option.id === theme) || themeOptions[0];

    return (
        <div className="theme-toggler relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
            >
                <span className="text-lg">{currentThemeOption.icon}</span>
                <span className="font-medium">{currentThemeOption.name}</span>
            </button>

            {isOpen && (
                <div className="animate-in fade-in-80 absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-10 border">
                    {themeOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => changeTheme(option.id)}
                            className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800
                            ${theme === option.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                        >
                            <span className="text-lg">{option.icon}</span>
                            <span className="font-medium">{option.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeToggler;
