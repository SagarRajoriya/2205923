import React from 'react';
import { User } from '../../types/users.types';

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  // Generate a consistent avatar image based on user id
  const avatarUrl = `https://i.pravatar.cc/150?u=${user.id}`;

  return (
    <div className="user-item card">
      <div className="user-avatar">
        <img src={avatarUrl} alt={user.name} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>Posts: <strong>{user.postCount}</strong></p>
        <p>Followers: <strong>{user.followerCount}</strong></p>
      </div>
    </div>
  );
};

export default UserItem;