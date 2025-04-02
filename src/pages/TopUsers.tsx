import React, { useEffect, useState } from 'react';
import { fetchTopUsers } from '../api/services/usersService';
import UsersList from '../components/users/UsersList';
import Loading from '../components/common/Loading';
import { User } from '../types/users.types';

const TopUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTopUsers = async () => {
            try {
                setLoading(true);
                const topUsers = await fetchTopUsers(5);
                setUsers(topUsers);
            } catch (err) {
                setError('Failed to fetch top users');
            } finally {
                setLoading(false);
            }
        };

        getTopUsers();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="top-users-page container">
            <h1>Top Users</h1>
            <p>The users with the highest number of posts</p>
            <UsersList users={users} />
        </div>
    );
};

export default TopUsers;