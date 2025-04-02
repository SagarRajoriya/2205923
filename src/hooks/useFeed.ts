import { useState, useEffect, useCallback } from 'react';
import { fetchFeed } from '../api/services/feedService';
import { FeedItem } from '../types/feed.types';

export const useFeed = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    try {
      setLoading(true);
      const feedItems = await fetchFeed();
      setFeed(feedItems);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch feed');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadFeed();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      loadFeed();
    }, 30000); // Poll every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [loadFeed]);

  return { feed, loading, error, refreshFeed: loadFeed };
};

export default useFeed;