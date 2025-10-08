import React, { useState, useEffect } from 'react';
import BlogPost from './blogpost';
import BlogForm from './BlogForm';
import styles from './BlogList.module.css';
import { v4 as uuidv4 } from 'uuid';

const BlogList = ({ currentUser, initialTab = 'all' }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialTab); // all, mine, popular
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    // Load blogs from local storage on component mount
    const loadBlogs = () => {
      try {
        const savedBlogs = localStorage.getItem('blogs');
        if (savedBlogs) {
          setBlogs(JSON.parse(savedBlogs));
        } else {
          // Initial sample data
          const sampleBlogs = [
            {
              id: '1',
              title: 'Getting Started with React Hooks',
              content: 'React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class.\n\nThe most commonly used hooks are useState and useEffect. The useState hook lets you add state to functional components, while useEffect allows you to perform side effects in function components.\n\nLet\'s discuss how to use them effectively in your projects.',
              author: 'Sarah Johnson',
              authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              tags: ['react', 'javascript', 'frontend'],
              likedBy: ['user2', 'user3'],
              comments: [
                {
                  author: 'Alex Chen',
                  text: 'This was really helpful! I\'ve been struggling with understanding useEffect.',
                  date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  author: 'Maria Lopez',
                  text: 'Could you explain the dependency array in useEffect more?',
                  date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                }
              ]
            },
            {
              id: '2',
              title: 'Understanding Big O Notation in Algorithms',
              content: 'Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.\n\nIn computer science, it\'s used to classify algorithms according to how their run time or space requirements grow as the input size grows.\n\nThis is crucial for understanding the efficiency of algorithms and making informed decisions about which algorithms to use for specific problems.',
              author: 'Michael Williams',
              authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
              tags: ['algorithms', 'computerscience', 'datastructures'],
              likedBy: ['user1', 'user4', 'user5'],
              comments: [
                {
                  author: 'David Kim',
                  text: 'Great explanation! It really helped me understand the concept better.',
                  date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
                }
              ]
            }
          ];
          setBlogs(sampleBlogs);
          localStorage.setItem('blogs', JSON.stringify(sampleBlogs));
        }
      } catch (error) {
        console.error('Error loading blogs from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogs();
  }, []);
  
  // Save blogs to local storage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('blogs', JSON.stringify(blogs));
    }
  }, [blogs, loading]);
  
  const handleLike = (blogId) => {
    setBlogs(prevBlogs => {
      return prevBlogs.map(blog => {
        if (blog.id === blogId) {
          // Toggle like
          const userIndex = blog.likedBy.indexOf(currentUser);
          if (userIndex === -1) {
            // Add user to likedBy
            return {
              ...blog,
              likedBy: [...blog.likedBy, currentUser]
            };
          } else {
            // Remove user from likedBy
            const newLikedBy = [...blog.likedBy];
            newLikedBy.splice(userIndex, 1);
            return {
              ...blog,
              likedBy: newLikedBy
            };
          }
        }
        return blog;
      });
    });
  };
  
  const handleComment = (blogId, commentText) => {
    setBlogs(prevBlogs => {
      return prevBlogs.map(blog => {
        if (blog.id === blogId) {
          const newComment = {
            author: currentUser,
            text: commentText,
            date: new Date().toISOString()
          };
          
          return {
            ...blog,
            comments: [...blog.comments, newComment]
          };
        }
        return blog;
      });
    });
  };
  
  const handleBlogSubmit = (newBlog) => {
    // Add the new blog to the beginning of blogs array
    setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
    
    // Save to localStorage
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      const existingBlogs = JSON.parse(savedBlogs);
      localStorage.setItem('blogs', JSON.stringify([newBlog, ...existingBlogs]));
    } else {
      localStorage.setItem('blogs', JSON.stringify([newBlog]));
    }
    
    // Hide the form and go back to blogs view
    setShowForm(false);
    // Show My Blogs tab after posting
    setFilter('mine');
  };
  
  const filteredBlogs = () => {
    switch (filter) {
      case 'mine':
        return blogs.filter(blog => blog.author === currentUser);
      case 'popular':
        return [...blogs].sort((a, b) => b.likedBy.length - a.likedBy.length);
      default:
        return [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };
  
  if (loading) {
    return <div className={styles['loading']}>Loading blogs...</div>;
  }
  
  if (showForm) {
    return (
      <BlogForm 
        currentUser={currentUser}
        onBlogSubmit={handleBlogSubmit}
        onCancel={() => setShowForm(false)}
      />
    );
  }
  
  return (
    <div className={styles['blog-list-container']}>
      <div className={styles['blog-filters']}>
        <button 
          className={`${styles['filter-btn']} ${filter === 'all' ? styles['active'] : ''}`} 
          onClick={() => setFilter('all')}
        >
          Recent
        </button>
        <button 
          className={`${styles['filter-btn']} ${filter === 'mine' ? styles['active'] : ''}`} 
          onClick={() => setFilter('mine')}
        >
          My Blogs
        </button>
        <button 
          className={`${styles['filter-btn']} ${filter === 'popular' ? styles['active'] : ''}`} 
          onClick={() => setFilter('popular')}
        >
          Popular
        </button>
        
        {filter === 'mine' && (
          <button 
            className={styles['create-post-btn']} 
            onClick={() => setShowForm(true)}
          >
            Create New Post
          </button>
        )}
      </div>
      
      <div className={styles['blogs']}>
        {filteredBlogs().length > 0 ? (
          filteredBlogs().map(blog => (
            <BlogPost 
              key={blog.id} 
              post={blog} 
              onLike={handleLike} 
              onComment={handleComment}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className={styles['no-blogs']}>
            {filter === 'mine' ? (
              <div>
                <p>You haven't posted any blogs yet</p>
                <button 
                  className={styles['create-first-post-btn']} 
                  onClick={() => setShowForm(true)}
                >
                  Create Your First Post
                </button>
              </div>
            ) : (
              "No blogs found. Be the first to post one!"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList; 