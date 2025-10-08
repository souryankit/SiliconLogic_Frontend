import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Eye, Heart, Share2 } from 'react-feather';

const SlideCard = ({ 
  image, 
  title, 
  description, 
  date, 
  time, 
  location, 
  category, 
  attendees,
  isEvent = true,
  tags = []
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 500) + 100);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleView = () => {
    setViewCount(prev => prev + 1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="gallery-slide-card">
      <div className="gallery-card-container">
        {/* Image Section */}
        <div className="gallery-image-section">
          <img src={image} alt={title} className="gallery-image" />
          
          {/* Category Badge */}
          {category && (
            <div className={`gallery-category-badge ${category.toLowerCase().replace(/\s+/g, '-')}`}>
              {category}
            </div>
          )}
          
          {/* Date Badge for Events */}
          {isEvent && date && (
            <div className="gallery-date-badge">
              <div className="date-day">{new Date(date).getDate()}</div>
              <div className="date-month">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</div>
            </div>
          )}
          
          {/* Overlay Actions */}
          <div className="gallery-overlay-actions">
            <button 
              className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button className="action-btn share-btn">
              <Share2 size={18} />
            </button>
            <button className="action-btn view-btn" onClick={handleView}>
              <Eye size={18} />
              <span className="view-count">{viewCount}</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="gallery-content-section">
          <h3 className="gallery-title">{title}</h3>
          
          {/* {description && (
            <p className="gallery-description">{description}</p>
          )} */}
          
          {/* Event Details */}
          {isEvent && (
            <div className="gallery-event-details">
              {date && (
                <div className="event-detail-item">
                  <Calendar size={16} />
                  <span>{formatDate(date)}</span>
                </div>
              )}
              
              {/* {time && (
                <div className="event-detail-item">
                  <Clock size={16} />
                  <span>{time}</span>
                </div>
              )} */}
              
              {location && (
                <div className="event-detail-item">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
              )}
              
              {/* {attendees && (
                <div className="event-detail-item">
                  <Users size={16} />
                  <span>{attendees} attending</span>
                </div>
              )} */}
            </div>
          )}
          
          {/* Tags */}
          {/* {tags.length > 0 && (
            <div className="gallery-tags">
              {tags.map((tag, index) => (
                <span key={index} className="gallery-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )} */}
          
          {/* Action Button */}
          {/* <div className="gallery-action-footer">
            <button className="gallery-action-btn">
              {isEvent ? 'View Event' : 'View Details'}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SlideCard;