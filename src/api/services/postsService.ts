import apiClient from '../apiClient';
import { POSTS_ENDPOINT, COMMENTS_ENDPOINT, USERS_ENDPOINT } from '../endpoints';
import { Post, Comment } from '../../types/posts.types';

export const fetchPostsByUser = async (userId: string): Promise<Post[]> => {
    try {
        const response = await apiClient.get(POSTS_ENDPOINT.replace(':userid', userId));
        
        // Get user name
        const usersResponse = await apiClient.get(USERS_ENDPOINT);
        const userName = usersResponse.data.users[userId] || 'Unknown User';
        
        // Map the posts to include the author name and a random image
        return response.data.posts.map(post => ({
            id: post.id,
            userId: post.userid,
            content: post.content,
            title: post.content.substring(0, 30),
            author: userName,
            createdAt: Date.now() - Math.floor(Math.random() * 10000000), // Random recent timestamp
            imageUrl: `https://picsum.photos/seed/${post.id}/300/200` // Random image based on post ID
        }));
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error);
        throw new Error(`Error fetching posts: ${error.message}`);
    }
};

export const fetchCommentsByPost = async (postId: string | number): Promise<Comment[]> => {
    try {
        const response = await apiClient.get(COMMENTS_ENDPOINT.replace(':postid', postId.toString()));
        return response.data.comments || [];
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        throw new Error(`Error fetching comments: ${error.message}`);
    }
};

export const fetchTrendingPosts = async (limit = 5): Promise<Post[]> => {
    try {
        // Get a list of users
        const usersResponse = await apiClient.get(USERS_ENDPOINT);
        const users = usersResponse.data.users;
        const userIds = Object.keys(users).slice(0, 5); // Limited to top 5 users to minimize API calls
        
        // Collect posts from these users
        let allPosts = [];
        for (const userId of userIds) {
            const postsResponse = await apiClient.get(POSTS_ENDPOINT.replace(':userid', userId));
            if (postsResponse.data.posts) {
                // Add author name to each post
                const userPosts = postsResponse.data.posts.map(post => ({
                    ...post,
                    userId: post.userid,
                    author: users[userId],
                    title: post.content.substring(0, 30),
                    createdAt: Date.now() - Math.floor(Math.random() * 10000000),
                    imageUrl: `https://picsum.photos/seed/${post.id}/300/200`
                }));
                allPosts = [...allPosts, ...userPosts];
            }
        }
        
        // Get comment counts for each post
        const postsWithCommentCounts = await Promise.all(
            allPosts.map(async (post) => {
                try {
                    const commentsResponse = await apiClient.get(COMMENTS_ENDPOINT.replace(':postid', post.id));
                    const comments = commentsResponse.data.comments || [];
                    return {
                        ...post,
                        commentsCount: comments.length
                    };
                } catch (error) {
                    console.error(`Error fetching comments for post ${post.id}:`, error);
                    return {
                        ...post,
                        commentsCount: 0
                    };
                }
            })
        );
        
        // Find the maximum comment count
        const maxComments = Math.max(...postsWithCommentCounts.map(p => p.commentsCount), 0);
        
        // Filter posts with the maximum comment count
        const trendingPosts = postsWithCommentCounts
            .filter(post => post.commentsCount === maxComments)
            .slice(0, limit);
            
        return trendingPosts;
    } catch (error) {
        console.error('Error fetching trending posts:', error);
        throw new Error(`Error fetching trending posts: ${error.message}`);
    }
};