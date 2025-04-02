import React, { useEffect, useState } from 'react';
import { fetchTrendingPosts } from '../api/services/postsService';
import Loading from '../components/common/Loading';
import { Post } from '../types/posts.types';
import PostItem from '../components/posts/PostItem';

const TrendingPosts: React.FC = () => {
    const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTrendingPosts = async () => {
            try {
                setLoading(true);
                const posts = await fetchTrendingPosts();
                setTrendingPosts(posts);
            } catch (err) {
                setError('Failed to fetch trending posts');
            } finally {
                setLoading(false);
            }
        };

        getTrendingPosts();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="trending-posts-page container">
            <h1>Trending Posts</h1>
            <p>Posts with the maximum number of comments</p>

            {trendingPosts.length === 0 ? (
                <div className="no-posts">No trending posts found</div>
            ) : (
                <div className="posts-container">
                    {trendingPosts.map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingPosts;