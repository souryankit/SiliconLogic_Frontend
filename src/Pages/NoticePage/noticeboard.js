import React, { useState } from "react";
import { Bell, Settings, Filter, Search, Plus, RefreshCw } from "react-feather";
import useScrollAnimation from '../../hooks/useScrollAnimation';

// Import new components
import AnnouncementCard from './components/AnnouncementCard';
import EventCalendar from './components/EventCalendar';
import QuickStats from './components/QuickStats';
import FeaturedAnnouncements from './components/FeaturedAnnouncements';
import ClubActivities from './components/ClubActivities';

// Import existing components
import AutoSlider from "./AutoSlider/Slider";
import Leaderboard from "./components/leaderboard";
import CompanyList from "./components/company";
import JobRole from "./components/jobrole";

// Import styles
import styles from './NoticeBoard.module.css';

const Notice = () => {
  useScrollAnimation();

  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'activities', label: 'Activities', icon: '🎯' },
    { id: 'careers', label: 'Careers', icon: '💼' },
    { id: 'leaderboard', label: 'Rankings', icon: '🏆' }
  ];

  return (
    <section className={styles['notice-board']}>
      <div className="container">
        {/* Header Section */}

        <div>
          <h2 className="pagetitle mb-4">
            {/* <Bell className="me-2" size={28} /> */}
            <b>Notice Board</b>
          </h2>
          {/* <p className="text-muted">Stay updated with the latest announcements, events, and activities</p> */}
        </div>


        <div className="row mb-4">
          <div className="col-12">
            {/* Search and Filter Bar */}
            <div className="row mb-2">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search announcements, events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <button className="btn btn-outline-primary btn-sm me-2">
                  <Filter size={16} className="me-1" />
                  Filter
                </button>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw size={16} className={`me-1 ${refreshing ? 'fa-spin' : ''}`} />
                  Refresh
                </button>

                <button className="btn btn-outline-secondary btn-sm">
                  <Settings size={16} className="me-1" />
                  Settings
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <ul className="nav nav-pills nav-fill mb-2">
              {tabs.map(tab => (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="me-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="fade-in">
            {/* Quick Stats Row */}
            <div className="row mb-1">
              <div className="col-lg-7">
                <QuickStats />
              </div>
              <div className="col-lg-5">
                <AutoSlider />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="row">
              {/* Left Column */}
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-12 mb-4">
                    <FeaturedAnnouncements />
                  </div>
                  
                </div>
              </div>

              {/* Right Column */}
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-12 mb-4">
                    <Leaderboard />
                  </div>

                  <div className="col-12 mb-4">
                    <EventCalendar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="fade-in">
            <div className="row">
              <div className="col-12">
                <FeaturedAnnouncements />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="fade-in">
            <div className="row">
              <div className="col-lg-12">
                <EventCalendar />
              </div>
              {/* <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Event Categories</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary">Workshops</button>
                      <button className="btn btn-outline-success">Seminars</button>
                      <button className="btn btn-outline-warning">Competitions</button>
                      <button className="btn btn-outline-info">Networking</button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="fade-in">
            <div className="row">
              <div className="col-12">
                <ClubActivities />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'careers' && (
          <div className="fade-in">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Career Opportunities</h5>
                  </div>
                  <div className="card-body">
                    <JobRole />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Partner Companies</h5>
                  </div>
                  <div className="card-body">
                    <CompanyList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="fade-in">
            <div className="row">
              <div className="col-lg-8">
                <Leaderboard />
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Achievement Categories</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        Coding Challenges
                        <span className="badge bg-primary rounded-pill">42</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        Project Submissions
                        <span className="badge bg-success rounded-pill">28</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        Workshop Attendance
                        <span className="badge bg-info rounded-pill">15</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        Research Papers
                        <span className="badge bg-warning rounded-pill">8</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h5 className="mb-0">Monthly Highlights</h5>
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <h3 className="text-primary">🎉</h3>
                      <h6>Top Performer</h6>
                      <p className="text-muted">John Doe - 1,250 points</p>
                      <hr />
                      <h6>Rising Star</h6>
                      <p className="text-muted">Jane Smith - +450 points</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h6 className="mb-3">Stay Connected</h6>
                <p className="text-muted mb-3">
                  Get real-time notifications and updates from SILICON community
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-primary btn-sm">
                    <Bell size={16} className="me-1" />
                    Enable Notifications
                  </button>
                  <button className="btn btn-outline-primary btn-sm">
                    Join Telegram Group
                  </button>
                  <button className="btn btn-outline-primary btn-sm">
                    Follow on Social Media
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notice;

