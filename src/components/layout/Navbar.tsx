import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/">Social Media Analytics</Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <Link to="/" className="navbar-item">Feed</Link>
                        <Link to="/top-users" className="navbar-item">Top Users</Link>
                        <Link to="/trending-posts" className="navbar-item">Trending Posts</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;