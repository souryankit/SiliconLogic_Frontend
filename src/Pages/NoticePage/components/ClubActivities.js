import React, { useState } from 'react';
import { Users, Calendar, MapPin, ExternalLink, Award, Activity } from 'react-feather';

const ClubActivities = () => {
  const [selectedClub, setSelectedClub] = useState('all');

  const clubs = [
    {
      id: 'esd',
      name: 'Electronics System Design',
      shortName: 'ESD',
      color: 'primary',
      icon: '🔬',
      memberCount: 245,
      description: 'VLSI Design, Analog Circuits, FPGA Programming'
    },
    {
      id: 'iot',
      name: 'Internet of Things',
      shortName: 'IoT',
      color: 'success',
      icon: '🌐',
      memberCount: 189,
      description: 'Embedded Systems, Sensor Networks, Smart Devices'
    },
    {
      id: 'cns',
      name: 'Communication & Networking',
      shortName: 'CNS',
      color: 'info',
      icon: '📡',
      memberCount: 167,
      description: 'Wireless Communication, Network Design, 5G Technology'
    }
  ];

  const activities = [
    {
      id: 1,
      title: "VLSI Design Competition",
      club: 'esd',
      date: "2024-01-20",
      time: "10:00 AM",
      location: "ESD Lab",
      type: "competition",
      status: "upcoming",
      participants: 25,
      maxParticipants: 30,
      description: "Design and simulate a 32-bit ALU using Verilog HDL",
      prizes: ["$500", "$300", "$200"],
      tags: ["VLSI", "Verilog", "Competition"]
    },
    {
      id: 2,
      title: "Smart Home Automation Workshop",
      club: 'iot',
      date: "2024-01-22",
      time: "2:00 PM",
      location: "IoT Lab",
      type: "workshop",
      status: "upcoming",
      participants: 35,
      maxParticipants: 40,
      description: "Build a complete smart home system using Arduino and ESP32",
      resources: ["Arduino Kit", "ESP32", "Sensors"],
      tags: ["Arduino", "ESP32", "Smart Home"]
    },
    {
      id: 3,
      title: "5G Network Design Seminar",
      club: 'cns',
      date: "2024-01-25",
      time: "11:00 AM",
      location: "Auditorium",
      type: "seminar",
      status: "upcoming",
      participants: 80,
      maxParticipants: 100,
      description: "Industry expert session on 5G architecture and implementation",
      speaker: "Dr. Sarah Johnson - Qualcomm",
      tags: ["5G", "Networking", "Industry"]
    },
    {
      id: 4,
      title: "PCB Design Challenge",
      club: 'esd',
      date: "2024-01-18",
      time: "9:00 AM",
      location: "Design Lab",
      type: "challenge",
      status: "ongoing",
      participants: 18,
      maxParticipants: 20,
      description: "Design a 4-layer PCB for a power management system",
      tools: ["Altium Designer", "KiCad"],
      tags: ["PCB", "Design", "Challenge"]
    },
    {
      id: 5,
      title: "Raspberry Pi Bootcamp",
      club: 'iot',
      date: "2024-01-15",
      time: "3:00 PM",
      location: "IoT Lab",
      type: "bootcamp",
      status: "completed",
      participants: 30,
      maxParticipants: 30,
      description: "Complete beginner's guide to Raspberry Pi programming",
      completion: "100%",
      tags: ["Raspberry Pi", "Python", "Bootcamp"]
    }
  ];

  const getFilteredActivities = () => {
    if (selectedClub === 'all') return activities;
    return activities.filter(activity => activity.club === selectedClub);
  };

  const getClubInfo = (clubId) => {
    return clubs.find(club => club.id === clubId);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'primary';
      case 'ongoing': return 'warning';
      case 'completed': return 'success';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'competition': return '🏆';
      case 'workshop': return '🔧';
      case 'seminar': return '📚';
      case 'challenge': return '⚡';
      case 'bootcamp': return '🚀';
      default: return '📅';
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
    <div className="club-activities">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          <Activity className="me-2" size={24} />
          Club Activities
        </h4>
        <button className="btn btn-outline-primary btn-sm">
          <ExternalLink size={16} className="me-1" />
          View All
        </button>
      </div>

      {/* Club Stats */}
      <div className="row mb-4">
        {clubs.map(club => (
          <div key={club.id} className="col-md-4 mb-3">
            <div className="card club-stat-card">
              <div className="card-body text-center">
                <div className="club-icon mb-2" style={{ fontSize: '2rem' }}>
                  {club.icon}
                </div>
                <h6 className="card-title">{club.shortName}</h6>
                <p className="text-muted small mb-2">{club.description}</p>
                <div className="d-flex justify-content-center align-items-center">
                  <Users size={14} className="me-1" />
                  <span className="small">{club.memberCount} members</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Club Filter */}
      <div className="mb-3">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${selectedClub === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedClub('all')}
          >
            All Clubs
          </button>
          {clubs.map(club => (
            <button
              key={club.id}
              type="button"
              className={`btn ${selectedClub === club.id ? `btn-${club.color}` : 'btn-outline-secondary'}`}
              onClick={() => setSelectedClub(club.id)}
            >
              {club.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="activities-container">
        {getFilteredActivities().map(activity => {
          const clubInfo = getClubInfo(activity.club);
          return (
            <div key={activity.id} className="card mb-3 activity-card">
              <div className="card-body">
                <div className="d-flex align-items-start">
                  <div className="activity-type-icon me-3">
                    <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(activity.type)}</span>
                  </div>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <h5 className="card-title mb-0 me-2">{activity.title}</h5>
                      <span className={`badge bg-${clubInfo.color} me-2`}>
                        {clubInfo.shortName}
                      </span>
                      <span className={`badge bg-${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    
                    <p className="card-text text-muted mb-2">{activity.description}</p>
                    
                    <div className="d-flex align-items-center mb-2">
                      {activity.tags.map((tag, index) => (
                        <span key={index} className="badge bg-light text-dark me-1">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="d-flex align-items-center text-muted small">
                          <Calendar size={14} className="me-1" />
                          <span className="me-3">{formatDate(activity.date)} at {activity.time}</span>
                          <MapPin size={14} className="me-1" />
                          <span className="me-3">{activity.location}</span>
                          <Users size={14} className="me-1" />
                          <span>{activity.participants}/{activity.maxParticipants}</span>
                        </div>
                      </div>
                      
                      <div className="col-md-4 text-end">
                        {activity.status === 'upcoming' && (
                          <button className="btn btn-primary btn-sm">
                            Join Activity
                          </button>
                        )}
                        {activity.status === 'ongoing' && (
                          <button className="btn btn-warning btn-sm">
                            View Progress
                          </button>
                        )}
                        {activity.status === 'completed' && (
                          <button className="btn btn-success btn-sm">
                            View Results
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    {activity.prizes && (
                      <div className="mt-2">
                        <small className="text-muted">
                          <Award size={14} className="me-1" />
                          Prizes: {activity.prizes.join(', ')}
                        </small>
                      </div>
                    )}
                    
                    {activity.speaker && (
                      <div className="mt-2">
                        <small className="text-muted">
                          <Users size={14} className="me-1" />
                          Speaker: {activity.speaker}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {getFilteredActivities().length === 0 && (
        <div className="text-center py-4">
          <Activity size={48} className="text-muted mb-2" />
          <p className="text-muted">No activities found for selected club</p>
        </div>
      )}
    </div>
  );
};

export default ClubActivities; 