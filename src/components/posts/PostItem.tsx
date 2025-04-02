import React from 'react';
import { Post } from '../../types/posts.types';
import { formatDate } from '../../utils/dateFormatter';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="post-item card">
      <div className="post-item-header">
        <h3>{post.content}</h3>
      </div>

      <div className="post-item-image">
        <img src={post.imageUrl} alt={post.content} style={{ maxWidth: '100%' }} />
      </div>

      <div className="post-item-content">
        <p>{post.content}</p>
      </div>

      <div className="post-item-footer">
        <span className="author">By: {post.author}</span>
        <span className="date">{formatDate(post.createdAt.toString())}</span>
        <span className="comments-count">Comments: {post.commentsCount || 0}</span>
      </div>
    </div>
  );
};

export default PostItem;