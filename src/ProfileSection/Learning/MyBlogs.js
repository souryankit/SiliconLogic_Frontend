import React from 'react';
import BlogList from './Blogs/BlogList';

const MyBlogs = () => {
  // Set initialTab to 'mine' to show user's blogs by default
  const myBlogsProps = {
    currentUser: 'Current User', // In a real app, this would come from authentication
    initialTab: 'mine'
  };

  return <BlogList {...myBlogsProps} />;
};

export default MyBlogs; 