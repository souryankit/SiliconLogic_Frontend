import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'react-feather';

const EventCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const events = [
    {
      id: 1,
      title: "VLSI Design Workshop",
      date: "2024-01-15",
      time: "10:00 AM - 4:00 PM",
      location: "ESD Lab",
      category: "workshop",
      club: "ESD",
      attendees: 25,
      maxAttendees: 30,
      description: "Hands-on workshop on VLSI design using Cadence tools",
      registrationLink: "#",
      isRegistrationOpen: true
    },
    {
      id: 2,
      title: "IoT Project Showcase",
      date: "2024-01-18",
      time: "2:00 PM - 5:00 PM",
      location: "IoT Lab",
      category: "showcase",
      club: "IoT",
      attendees: 45,
      maxAttendees: 50,
      description: "Students present their IoT projects and innovations",
      registrationLink: "#",
      isRegistrationOpen: true
    },
    {
      id: 3,
      title: "5G Communication Seminar",
      date: "2024-01-20",
      time: "11:00 AM - 1:00 PM",
      location: "Auditorium",
      category: "seminar",
      club: "CNS",
      attendees: 80,
      maxAttendees: 100,
      description: "Industry expert session on 5G technology and future prospects",
      registrationLink: "#",
      isRegistrationOpen: true
    },
    {
      id: 4,
      title: "Coding Competition",
      date: "2024-01-22",
      time: "9:00 AM - 6:00 PM",
      location: "Computer Lab",
      category: "competition",
      club: "All",
      attendees: 60,
      maxAttendees: 80,
      description: "Inter-club coding competition with exciting prizes",
      registrationLink: "#",
      isRegistrationOpen: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events', color: 'primary' },
    { id: 'workshop', label: 'Workshops', color: 'success' },
    { id: 'seminar', label: 'Seminars', color: 'info' },
    { id: 'competition', label: 'Competitions', color: 'warning' },
    { id: 'showcase', label: 'Showcases', color: 'danger' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const getClubColor = (club) => {
    switch(club) {
      case 'ESD': return 'bg-primary';
      case 'IoT': return 'bg-success';
      case 'CNS': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="event-calendar">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          <Calendar className="me-2" size={24} />
          Upcoming Events
        </h4>
        <button className="btn btn-outline-primary btn-sm">
          <ExternalLink size={16} className="me-1" />
          View All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-3">
        <div className="btn-group btn-group-sm" role="group">
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              className={`btn ${selectedCategory === category.id ? `btn-${category.color}` : 'btn-outline-secondary'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="events-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredEvents.map(event => (
          <div key={event.id} className="card mb-3 event-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-start">
                    <div className="date-badge text-center me-3">
                      <div className="bg-primary text-white rounded p-2">
                        <div className="fw-bold">{new Date(event.date).getDate()}</div>
                        <div className="small">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                      </div>
                    </div>
                    
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <h5 className="card-title mb-0 me-2">{event.title}</h5>
                        <span className={`badge ${getClubColor(event.club)} text-white`}>
                          {event.club}
                        </span>
                      </div>
                      
                      <p className="text-muted mb-2">{event.description}</p>
                      
                      <div className="d-flex align-items-center text-muted small">
                        <Clock size={14} className="me-1" />
                        <span className="me-3">{event.time}</span>
                        <MapPin size={14} className="me-1" />
                        <span className="me-3">{event.location}</span>
                        <Users size={14} className="me-1" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 text-end">
                  <div className="mb-2">
                    <div className="progress" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">
                      {event.maxAttendees - event.attendees} spots left
                    </small>
                  </div>
                  
                  {event.isRegistrationOpen ? (
                    <button className="btn btn-primary btn-sm">
                      Register Now
                    </button>
                  ) : (
                    <button className="btn btn-secondary btn-sm" disabled>
                      Registration Closed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-4">
          <Calendar size={48} className="text-muted mb-2" />
          <p className="text-muted">No events found for selected category</p>
        </div>
      )}
    </div>
  );
};

export default EventCalendar; 