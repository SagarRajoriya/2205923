import React, { useEffect } from 'react';
import useFeed from '../hooks/useFeed';
import FeedList from '../components/feed/FeedList';
import Loading from '../components/common/Loading';

const Feed: React.FC = () => {
    const { feed, loading, error, refreshFeed } = useFeed();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="feed-page container">
            <h1>Real-Time Feed</h1>
            <p>The latest posts from across the platform</p>
            <FeedList feed={feed} refreshFeed={refreshFeed} />
        </div>
    );
};

export default Feed;