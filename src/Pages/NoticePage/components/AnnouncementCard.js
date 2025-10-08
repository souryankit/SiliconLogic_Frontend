import React from 'react';
import { Calendar, Clock, Bell, Users, Award, Briefcase, BookOpen } from 'react-feather';

const AnnouncementCard = ({ 
  type, 
  title, 
  description, 
  date, 
  time, 
  priority, 
  category, 
  actionButton, 
  tags,
  author,
  isNew = false
}) => {
  
  const getIcon = () => {
    switch(type) {
      case 'event': return <Calendar size={20} />;
      case 'deadline': return <Clock size={20} />;
      case 'alert': return <Bell size={20} />;
      case 'competition': return <Award size={20} />;
      case 'job': return <Briefcase size={20} />;
      case 'course': return <BookOpen size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getPriorityColor = () => {
    switch(priority) {
      case 'high': return 'border-left-danger';
      case 'medium': return 'border-left-warning';
      case 'low': return 'border-left-info';
      default: return 'border-left-primary';
    }
  };

  const getCategoryColor = () => {
    switch(category) {
      case 'academic': return 'bg-primary';
      case 'event': return 'bg-success';
      case 'career': return 'bg-info';
      case 'technical': return 'bg-warning';
      case 'urgent': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className={`card announcement-card ${getPriorityColor()} mb-3 position-relative`}>
      {isNew && (
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-danger">New</span>
        </div>
      )}
      
      <div className="card-body">
        <div className="d-flex align-items-start">
          <div className={`announcement-icon ${getCategoryColor()} text-white rounded-circle p-2 me-3`}>
            {getIcon()}
          </div>
          
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-1">{title}</h5>
              <div className="d-flex align-items-center text-muted">
                <Clock size={14} className="me-1" />
                <small>{time}</small>
              </div>
            </div>
            
            <p className="card-text text-muted mb-2">{description}</p>
            
            {tags && (
              <div className="mb-2">
                {tags.map((tag, index) => (
                  <span key={index} className="badge bg-light text-dark me-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <small className="text-muted me-3">
                  <Calendar size={14} className="me-1" />
                  {date}
                </small>
                {author && (
                  <small className="text-muted">
                    <Users size={14} className="me-1" />
                    By {author}
                  </small>
                )}
              </div>
              
              {actionButton && (
                <button className={`btn btn-sm ${actionButton.variant || 'btn-primary'}`}>
                  {actionButton.text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard; 