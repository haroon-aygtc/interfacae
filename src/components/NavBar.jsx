import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import ThemeToggler from './ThemeToggler';
import '../styles/theme.css';

const NavBar = () => {
    const { theme } = useTheme();

    return (
        <nav className={`navbar ${theme}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img
                        src={`/assets/logo-${theme}.png`}
                        alt="Al Yalayis"
                        className="logo-image"
                    />
                    <span className="logo-text">Al Yalayis</span>
                </Link>

                <div className="nav-menu">
                    <ul className="nav-items">
                        <li className="nav-item">
                            <Link to="/government-services" className="nav-link">
                                Government Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/property" className="nav-link">
                                Property
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transport" className="nav-link">
                                Super Wheel
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/labor" className="nav-link">
                                Labor Supply
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="nav-controls">
                    <ThemeToggler />
                    <Link to="/login" className="auth-button login-btn">
                        Login
                    </Link>
                    <Link to="/register" className="auth-button register-btn">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
