export const calculateUserPostCounts = (posts) => {
    const userPostCounts = {};

    posts.forEach(post => {
        const userId = post.userId;
        if (userPostCounts[userId]) {
            userPostCounts[userId]++;
        } else {
            userPostCounts[userId] = 1;
        }
    });

    return userPostCounts;
};

export const findTopUsers = (userPostCounts, topN = 5) => {
    const sortedUsers = Object.entries(userPostCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, topN);

    return sortedUsers.map(([userId, count]) => ({ userId, count }));
};

export const calculateTrendingPosts = (posts, comments) => {
    const postCommentCounts = {};

    comments.forEach(comment => {
        const postId = comment.postId;
        if (postCommentCounts[postId]) {
            postCommentCounts[postId]++;
        } else {
            postCommentCounts[postId] = 1;
        }
    });

    const trendingPosts = posts.map(post => ({
        ...post,
        commentCount: postCommentCounts[post.id] || 0
    })).sort((a, b) => b.commentCount - a.commentCount);

    return trendingPosts;
};