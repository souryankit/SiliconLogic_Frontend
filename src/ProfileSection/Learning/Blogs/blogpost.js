import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import styles from './BlogPost.module.css';

const BlogPost = ({ post, onLike, onComment, currentUser }) => {
  const [comment, setComment] = useState('');
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className={styles['blog-post']}>
      <div className={styles['blog-header']}>
        <div className={styles['user-info']}>
          <img src={post.authorAvatar || '/default-avatar.png'} alt={post.author} className={styles['avatar']} />
          <h3>{post.author}</h3>
        </div>
        <span className={styles['post-date']}>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</span>
      </div>
      
      <h2 className={styles['blog-title']}>{post.title}</h2>
      
      <div className={styles['blog-content']}>
        {post.content.split('\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      
      <div className={styles['blog-tags']}>
        {post.tags && post.tags.map(tag => (
          <span key={tag} className={styles['tag']}>#{tag}</span>
        ))}
      </div>
      
      <div className={styles['blog-stats']}>
        <span className={styles['likes']} onClick={() => onLike(post.id)}>
          <i className={`fa fa-heart ${post.likedBy.includes(currentUser) ? styles['liked'] : ''}`}></i> {post.likedBy.length}
        </span>
        <span className={styles['comments']}>
          <i className="fa fa-comment"></i> {post.comments.length}
        </span>
      </div>
      
      <div className={styles['comments-section']}>
        <h4>Comments</h4>
        {post.comments.length > 0 ? (
          <ul className={styles['comment-list']}>
            {post.comments.map((comment, idx) => (
              <li key={idx} className={styles['comment']}>
                <div className={styles['comment-header']}>
                  <span className={styles['comment-author']}>{comment.author}</span>
                  <span className={styles['comment-date']}>{formatDistanceToNow(new Date(comment.date), { addSuffix: true })}</span>
                </div>
                <p className={styles['comment-text']}>{comment.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles['no-comments']}>No comments yet. Be the first to share your thoughts!</p>
        )}
        
        <form className={styles['comment-form']} onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows="3"
          />
          <button type="submit" className={styles['submit-comment']}>Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default BlogPost;
