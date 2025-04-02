import apiClient from '../apiClient';

export const fetchFeed = async () => {
    try {
        // Since there's no actual feed endpoint, we'll create a feed by combining posts from different users
        // Get users first
        const usersResponse = await apiClient.get('/users');
        const users = usersResponse.data.users;
        
        // Sample randomly from our users to keep API calls limited
        const userIds = Object.keys(users);
        const sampleUserIds = userIds
            .sort(() => 0.5 - Math.random()) // shuffle
            .slice(0, 5); // take 5 random users
        
        // Fetch posts for selected users
        let feedItems = [];
        for (const userId of sampleUserIds) {
            try {
                const postsResponse = await apiClient.get(`/users/${userId}/posts`);
                if (postsResponse.data.posts && postsResponse.data.posts.length > 0) {
                    // Add author and timestamps to posts
                    const userPosts = postsResponse.data.posts.map(post => ({
                        id: post.id,
                        userId: post.userid,
                        content: post.content,
                        author: users[userId],
                        createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
                        commentsCount: 0, // We'll leave this at 0 to minimize API calls
                        imageUrl: `https://picsum.photos/seed/${post.id}/300/200`
                    }));
                    feedItems = [...feedItems, ...userPosts];
                }
            } catch (error) {
                console.error(`Error fetching posts for user ${userId}:`, error);
            }
        }
        
        // Sort by createdAt timestamp (newest first)
        feedItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        return feedItems;
    } catch (error) {
        console.error('Error creating feed:', error);
        throw new Error(`Error fetching feed: ${error.message}`);
    }
};