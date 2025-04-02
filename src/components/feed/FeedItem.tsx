import React from 'react';
import { FeedItem as FeedItemType } from '../../types/feed.types';
import { formatDate } from '../../utils/dateFormatter';

interface FeedItemProps {
    item: FeedItemType;
}

const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
    return (
        <div className="feed-item card">
            <div className="feed-item-header">
                <h3>{item.content}</h3>
                <p className="author">By: {item.author}</p>
            </div>
            
            <div className="feed-item-image">
                <img src={item.imageUrl} alt={item.content} />
            </div>
            
            <div className="feed-item-content">
                <p>{item.content}</p>
            </div>
            
            <div className="feed-item-footer">
                <p className="date">{formatDate(item.createdAt.toString())}</p>
                <p className="comments-count">Comments: {item.commentsCount}</p>
            </div>
        </div>
    );
};

export default FeedItem;