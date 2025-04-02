import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/services/usersService';
import { User } from '../types/users.types';

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    return { users, loading, error };
};

export default useUsers;