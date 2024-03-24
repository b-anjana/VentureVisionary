import React from 'react';
import './styles/Design.css'; 

const Design = ({ darkMode, toggleDarkMode }) => {
    return (
        <div>
            {/* Light mode background */}
            {!darkMode && (
                <div className="light-mode-background">
                    {/* Additional content for light mode */}
                    <div className="blur-screen">
                        {/* Add other elements for light mode if needed */}
                    </div>
                </div>
            )}

            {/* Dark mode background */}
            {darkMode && (
                <div className="dark-mode-background">
                    {/* Additional background elements for dark mode */}
                    <div className="dark-mode-content">
                    </div>
                </div>
            )}
            
            {/* Dark Mode Toggle Switch */}
            <div className="dark-mode-toggle">
                <input type="checkbox" id="darkModeToggle" checked={darkMode} onChange={toggleDarkMode} />
                <label htmlFor="darkModeToggle"></label>
            </div>
        </div>
    );
}

export default Design;
