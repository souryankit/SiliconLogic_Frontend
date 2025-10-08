import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './BlogForm.module.css';

const BlogForm = ({ currentUser, onBlogSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const newBlog = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      author: currentUser,
      authorAvatar: null, // In a real app, this would come from user profile
      date: new Date().toISOString(),
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim().toLowerCase()) : [],
      likedBy: [],
      comments: []
    };
    
    onBlogSubmit(newBlog);
    
    // Reset form
    setTitle('');
    setContent('');
    setTags('');
    setErrors({});
  };
  
  return (
    <div className={styles['blog-form-container']}>
      <h2>Create a New Blog Post</h2>
      <form className={styles['blog-form']} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? styles['error'] : ''}
            placeholder="Enter a descriptive title for your blog post"
          />
          {errors.title && <span className={styles['error-message']}>{errors.title}</span>}
        </div>
        
        <div className={styles['form-group']}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={errors.content ? styles['error'] : ''}
            placeholder="Share your knowledge and insights..."
            rows="12"
          />
          {errors.content && <span className={styles['error-message']}>{errors.content}</span>}
        </div>
        
        <div className={styles['form-group']}>
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, javascript, tutorial"
          />
          <small>Separate tags with commas (e.g. javascript, react, tutorial)</small>
        </div>
        
        <div className={styles['form-actions']}>
          <button type="button" className={styles['cancel-btn']} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles['submit-post-btn']}>
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm; 