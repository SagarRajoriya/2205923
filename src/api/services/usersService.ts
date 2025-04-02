import apiClient from '../apiClient';
import { USERS_ENDPOINT, POSTS_ENDPOINT } from '../endpoints';
import { User } from '../../types/users.types';

// Fetch all users
export const fetchUsers = async (): Promise<{[key: string]: string}> => {
    try {
        const response = await apiClient.get(USERS_ENDPOINT);
        return response.data.users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error(`Error fetching users: ${error.message}`);
    }
};

// Get top 5 users with most posts
export const fetchTopUsers = async (count = 5): Promise<User[]> => {
    try {
        // First get all users
        const usersResponse = await apiClient.get(USERS_ENDPOINT);
        const users = usersResponse.data.users;
        
        // For each user, count their posts
        const userPostCounts = await Promise.all(
            Object.entries(users).map(async ([userId, name]) => {
                try {
                    const postsResponse = await apiClient.get(POSTS_ENDPOINT.replace(':userid', userId));
                    const posts = postsResponse.data.posts || [];
                    
                    return {
                        id: userId,
                        name: name as string,
                        postCount: posts.length,
                        // Generate random follower count for UI display
                        followerCount: Math.floor(Math.random() * 1000) + 100
                    };
                } catch (error) {
                    console.error(`Error fetching posts for user ${userId}:`, error);
                    return {
                        id: userId,
                        name: name as string,
                        postCount: 0,
                        followerCount: Math.floor(Math.random() * 1000) + 100
                    };
                }
            })
        );
        
        // Sort by post count and return top N
        return userPostCounts
            .sort((a, b) => b.postCount - a.postCount)
            .slice(0, count);
    } catch (error) {
        console.error('Error fetching top users:', error);
        throw new Error(`Error fetching top users: ${error.message}`);
    }
};