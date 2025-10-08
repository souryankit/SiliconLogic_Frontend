import React, { useState } from 'react';
import { Bell, Star, Clock, Eye, ChevronRight, Filter } from 'react-feather';

const FeaturedAnnouncements = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const announcements = [
    {
      id: 1,
      title: "Winter Semester Registration Open",
      content: "Registration for Winter 2024 semester courses is now open. Early bird discount available until January 31st.",
      priority: "high",
      category: "academic",
      date: "2024-01-10",
      author: "Academic Office",
      views: 1247,
      isFeatured: true,
      tags: ["registration", "courses", "deadline"],
      actionRequired: true
    },
    {
      id: 2,
      title: "Industry Internship Program",
      content: "Applications open for summer internships with partner companies including Intel, AMD, and Qualcomm.",
      priority: "high",
      category: "career",
      date: "2024-01-12",
      author: "Career Services",
      views: 856,
      isFeatured: true,
      tags: ["internship", "industry", "summer"],
      actionRequired: true
    },
    {
      id: 3,
      title: "Research Paper Competition",
      content: "Submit your research papers for the annual IEEE student paper competition. Winner gets $2000 prize.",
      priority: "medium",
      category: "competition",
      date: "2024-01-14",
      author: "Research Committee",
      views: 634,
      isFeatured: true,
      tags: ["research", "competition", "IEEE"],
      actionRequired: true
    },
    {
      id: 4,
      title: "Lab Equipment Upgrade",
      content: "New FPGA boards and oscilloscopes installed in ESD lab. Training session scheduled for next week.",
      priority: "medium",
      category: "technical",
      date: "2024-01-15",
      author: "Lab Manager",
      views: 423,
      isFeatured: false,
      tags: ["equipment", "training", "lab"],
      actionRequired: false
    },
    {
      id: 5,
      title: "Guest Lecture Series",
      content: "Weekly guest lectures by industry experts every Friday. This week: 'Future of Semiconductor Industry'.",
      priority: "low",
      category: "academic",
      date: "2024-01-16",
      author: "Event Coordinator",
      views: 312,
      isFeatured: false,
      tags: ["lecture", "industry", "weekly"],
      actionRequired: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: announcements.length },
    { id: 'featured', label: 'Featured', count: announcements.filter(a => a.isFeatured).length },
    { id: 'academic', label: 'Academic', count: announcements.filter(a => a.category === 'academic').length },
    { id: 'career', label: 'Career', count: announcements.filter(a => a.category === 'career').length },
    { id: 'technical', label: 'Technical', count: announcements.filter(a => a.category === 'technical').length }
  ];

  const getFilteredAnnouncements = () => {
    if (activeFilter === 'all') return announcements;
    if (activeFilter === 'featured') return announcements.filter(a => a.isFeatured);
    return announcements.filter(a => a.category === activeFilter);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'academic': return '🎓';
      case 'career': return '💼';
      case 'technical': return '⚙️';
      case 'competition': return '🏆';
      default: return '📢';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  return (
    <div className="featured-announcements">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          <Bell className="me-2" size={24} />
          Featured Announcements
        </h4>
        <button className="btn btn-outline-primary btn-sm">
          <Filter size={16} className="me-1" />
          Manage
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-3">
        <ul className="nav nav-pills nav-fill">
          {filters.map(filter => (
            <li key={filter.id} className="nav-item">
              <button
                className={`nav-link ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
                <span className="badge bg-secondary ms-2">{filter.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Announcements List */}
      <div className="announcements-container">
        {getFilteredAnnouncements().map(announcement => (
          <div key={announcement.id} className={`card mb-3 announcement-item ${announcement.isFeatured ? 'featured-card' : ''}`}>
            <div className="card-body">
              <div className="d-flex align-items-start">
                {announcement.isFeatured && (
                  <div className="featured-badge me-2">
                    <Star size={16} className="text-warning" fill="currentColor" />
                  </div>
                )}
                
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <span className="category-icon me-2">{getCategoryIcon(announcement.category)}</span>
                    <h5 className="card-title mb-0 me-2">{announcement.title}</h5>
                    <span className={`badge bg-${getPriorityColor(announcement.priority)} ms-auto`}>
                      {announcement.priority}
                    </span>
                  </div>
                  
                  <p className="card-text text-muted mb-2">{announcement.content}</p>
                  
                  <div className="d-flex align-items-center mb-2">
                    {announcement.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark me-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center text-muted small">
                      <Clock size={14} className="me-1" />
                      <span className="me-3">{timeAgo(announcement.date)}</span>
                      <Eye size={14} className="me-1" />
                      <span className="me-3">{announcement.views} views</span>
                      <span>By {announcement.author}</span>
                    </div>
                    
                    <div className="d-flex align-items-center">
                      {announcement.actionRequired && (
                        <button className="btn btn-primary btn-sm me-2">
                          Take Action
                        </button>
                      )}
                      <button className="btn btn-outline-secondary btn-sm">
                        Read More
                        <ChevronRight size={14} className="ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getFilteredAnnouncements().length === 0 && (
        <div className="text-center py-4">
          <Bell size={48} className="text-muted mb-2" />
          <p className="text-muted">No announcements found for selected filter</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedAnnouncements; 