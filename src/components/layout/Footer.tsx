import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Social Media Analytics. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;