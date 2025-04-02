import React from 'react';
import FeedItem from './FeedItem';
import { FeedItem as FeedItemType } from '../../types/feed.types';
import Button from '../common/Button';

interface FeedListProps {
    feed: FeedItemType[];
    refreshFeed?: () => void;
}

const FeedList: React.FC<FeedListProps> = ({ feed, refreshFeed }) => {
    return (
        <div className="feed-list">
            {refreshFeed && (
                <div className="refresh-button-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Button label="Refresh Feed" onClick={refreshFeed} className="refresh-button" />
                </div>
            )}

            {feed.length === 0 ? (
                <div className="no-posts">No posts available</div>
            ) : (
                feed.map(item => (
                    <FeedItem key={item.id} item={item} />
                ))
            )}
        </div>
    );
};

export default FeedList;