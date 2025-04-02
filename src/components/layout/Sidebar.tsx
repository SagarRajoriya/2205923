import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>Navigation</h2>
            <ul>
                <li>
                    <Link to="/top-users">Top Users</Link>
                </li>
                <li>
                    <Link to="/trending-posts">Trending Posts</Link>
                </li>
                <li>
                    <Link to="/feed">Feed</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;