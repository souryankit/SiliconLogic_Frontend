import React from 'react';
import { Users, BookOpen, Award, Briefcase, Calendar, TrendingUp } from 'react-feather';

const QuickStats = () => {
  const stats = [
    {
      id: 1,
      title: "Active Students",
      value: "1,247",
      change: "+15%",
      changeType: "increase",
      icon: Users,
      color: "primary"
    },
    {
      id: 2,
      title: "Courses Available",
      value: "48",
      change: "+3",
      changeType: "increase",
      icon: BookOpen,
      color: "success"
    },
    {
      id: 3,
      title: "Competitions Won",
      value: "23",
      change: "+5",
      changeType: "increase",
      icon: Award,
      color: "warning"
    },
    {
      id: 4,
      title: "Job Placements",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: Briefcase,
      color: "info"
    },
    {
      id: 5,
      title: "Events This Month",
      value: "8",
      change: "+2",
      changeType: "increase",
      icon: Calendar,
      color: "danger"
    },
    {
      id: 6,
      title: "Project Submissions",
      value: "342",
      change: "+25%",
      changeType: "increase",
      icon: TrendingUp,
      color: "dark"
    }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-danger';
  };

  return (
    <div className="quick-stats">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Platform Statistics</h4>
        <small className="text-muted">Updated just now</small>
      </div>

      <div className="row">
        {stats.map(stat => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className={`stat-icon bg-${stat.color} text-white rounded-circle p-3 me-3`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="stat-value h4 mb-0">{stat.value}</div>
                      <div className="stat-title text-muted small">{stat.title}</div>
                      <div className={`stat-change ${getChangeColor(stat.changeType)} small`}>
                        {stat.change} from last month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Recent Achievements</h6>
            <div className="row">
              <div className="col-md-4">
                <div className="achievement-item">
                  <div className="text-success">
                    <Award size={16} className="me-2" />
                    <strong>National Hackathon</strong>
                  </div>
                  <div className="text-muted small">1st Place - Team Alpha</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="achievement-item">
                  <div className="text-primary">
                    <Users size={16} className="me-2" />
                    <strong>IEEE Student Branch</strong>
                  </div>
                  <div className="text-muted small">Best Chapter Award</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="achievement-item">
                  <div className="text-warning">
                    <TrendingUp size={16} className="me-2" />
                    <strong>Industry Recognition</strong>
                  </div>
                  <div className="text-muted small">Top 10 Engineering Society</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats; 