import React from 'react';
import UserItem from './UserItem';
import { User } from '../../types/users.types';

interface UsersListProps {
    users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
    return (
        <div className="users-list">
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UsersList;