import React, { useEffect, useState } from 'react';
import { fetchTrendingPosts } from '../../api/services/postsService';
import PostItem from './PostItem';

const TrendingPostsList: React.FC = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTrendingPosts = async () => {
            try {
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Trending Posts</h2>
            <ul>
                {trendingPosts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        </div>
    );
};

export default TrendingPostsList;