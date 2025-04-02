import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>Social Media Analytics</h1>
            <nav>
                <ul>
                    <li><a href="/">Feed</a></li>
                    <li><a href="/top-users">Top Users</a></li>
                    <li><a href="/trending-posts">Trending Posts</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;