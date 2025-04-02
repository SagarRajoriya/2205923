import { useEffect, useState } from 'react';
import { fetchPostsByUser } from '../api/services/postsService';
import { Post } from '../types/posts.types';

const usePosts = (userId: string) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const fetchedPosts = await fetchPostsByUser(userId);
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [userId]);

    return { posts, loading, error };
};

export default usePosts;