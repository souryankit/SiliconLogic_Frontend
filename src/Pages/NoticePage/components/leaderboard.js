import React, { useState, useEffect } from 'react';
import { Award, Users, TrendingUp, Star, Target, Circle } from 'react-feather';
import './Leaderboard.css';

// Enhanced leaderboard data with more realistic information
const initialLeaderboardData = [
  { 
    id: 1, 
    name: "Arjun Sharma", 
    score: 1250, 
    rank: 1,
    avatar: "./user/user1.jpg",
    department: "VLSI Design",
    streak: 15,
    badges: ["🏆", "⚡", "🎯"],
    change: "+5",
    level: "Expert",
    projects: 8,
    achievements: 12
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    score: 1180, 
    rank: 2,
    avatar: "./user/user2.jpg",
    department: "IoT Systems",
    streak: 12,
    badges: ["🥈", "💡", "🚀"],
    change: "+2",
    level: "Advanced",
    projects: 6,
    achievements: 10
  },
  { 
    id: 3, 
    name: "Rohit Kumar", 
    score: 1120, 
    rank: 3,
    avatar: "./user/user3.jpg",
    department: "Embedded Systems",
    streak: 8,
    badges: ["🥉", "🔧", "⭐"],
    change: "-1",
    level: "Advanced",
    projects: 7,
    achievements: 9
  },
  { 
    id: 4, 
    name: "Sneha Reddy", 
    score: 1050, 
    rank: 4,
    avatar: "./user/user4.jpg",
    department: "Communication",
    streak: 6,
    badges: ["🎖️", "📡"],
    change: "+3",
    level: "Intermediate",
    projects: 5,
    achievements: 8
  },
  { 
    id: 5, 
    name: "Vikram Singh", 
    score: 980, 
    rank: 5,
    avatar: "./user/user5.jpg",
    department: "VLSI Design",
    streak: 4,
    badges: ["🌟", "⚙️"],
    change: "0",
    level: "Intermediate",
    projects: 4,
    achievements: 7
  },
  { 
    id: 6, 
    name: "Ananya Gupta", 
    score: 920, 
    rank: 6,
    avatar: "./user/user6.jpg",
    department: "IoT Systems",
    streak: 3,
    badges: ["🏅"],
    change: "+1",
    level: "Intermediate",
    projects: 3,
    achievements: 6
  },
  { 
    id: 7, 
    name: "Karthik Nair", 
    score: 860, 
    rank: 7,
    avatar: "./user/user1.jpg",
    department: "Verification",
    streak: 2,
    badges: ["⚡"],
    change: "-2",
    level: "Beginner",
    projects: 3,
    achievements: 5
  },
  { 
    id: 8, 
    name: "Divya Iyer", 
    score: 800, 
    rank: 8,
    avatar: "./user/user2.jpg",
    department: "Physical Design",
    streak: 1,
    badges: ["🎯"],
    change: "+4",
    level: "Beginner",
    projects: 2,
    achievements: 4
  }
];

// Simulated backend API
const fetchLeaderboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialLeaderboardData);
    }, 800);
  });
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      setLoading(true);
      const data = await fetchLeaderboardData();
      setLeaderboardData(data);
      setLoading(false);
    };

    loadLeaderboardData();
  }, [selectedPeriod]);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Award className="rank-icon gold" size={20} />;
      case 2: return <Circle className="rank-icon silver" size={18} />;
      case 3: return <Star className="rank-icon bronze" size={18} />;
      default: return <span className="rank-number">#{rank}</span>;
    }
  };

  const getRankClass = (rank) => {
    switch(rank) {
      case 1: return 'rank-1';
      case 2: return 'rank-2';
      case 3: return 'rank-3';
      default: return 'rank-other';
    }
  };

  const getChangeIcon = (change) => {
    if (change.startsWith('+')) {
      return <TrendingUp className="change-up" size={14} />;
    } else if (change.startsWith('-')) {
      return <TrendingUp className="change-down" size={14} style={{transform: 'rotate(180deg)'}} />;
    }
    return <span className="change-neutral">-</span>;
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return '#ff6b6b';
      case 'Advanced': return '#4ecdc4';
      case 'Intermediate': return '#45b7d1';
      case 'Beginner': return '#96ceb4';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h4 className="leaderboard-title">
            <Award className="me-2" size={20} />
            Leaderboard
          </h4>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div className="leaderboard-header">
        <div className="header-content">
          <h4 className="leaderboard-title">
            <Award className="me-2" size={20} />
            Leaderboard
          </h4>
          <button 
            className="stats-toggle"
            onClick={() => setShowStats(!showStats)}
          >
            <Target size={16} />
          </button>
        </div>
        
        {/* Period Selector */}
        <div className="period-selector">
          {['daily', 'weekly', 'monthly'].map(period => (
            <button
              key={period}
              className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      {showStats && (
        <div className="quick-stats-mini">
          <div className="stat-mini">
            <Users size={16} />
            <span>{leaderboardData.length} Students</span>
          </div>
          <div className="stat-mini">
            <Award size={16} />
            <span>Avg: {Math.round(leaderboardData.reduce((sum, p) => sum + p.score, 0) / leaderboardData.length)}</span>
          </div>
        </div>
      )}

      {/* Top 3 Podium */}
      <div className="podium-container">
        {leaderboardData.slice(0, 3).map((player, index) => (
          <div key={player.id} className={`podium-item ${getRankClass(player.rank)}`}>
            <div className="podium-avatar">
              <img src={player.avatar} alt={player.name} />
              <div className="podium-rank">{getRankIcon(player.rank)}</div>
            </div>
            <div className="podium-info">
              <h6>{player.name.split(' ')[0]}</h6>
              <div className="podium-score">{player.score}</div>
              <div className="podium-badges">
                {player.badges.slice(0, 2).map((badge, i) => (
                  <span key={i} className="mini-badge">{badge}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Rankings List */}
      <div className="rankings-list">
        <div className="list-header">
          <h6>Complete Rankings</h6>
          <span className="total-count">{leaderboardData.length} participants</span>
        </div>
        
        <div className="rankings-scroll">
          {leaderboardData.map((player, index) => (
            <div key={player.id} className={`ranking-item ${getRankClass(player.rank)}`}>
              <div className="ranking-left">
                <div className="rank-display">
                  {getRankIcon(player.rank)}
                </div>
                <div className="player-avatar">
                  <img src={player.avatar} alt={player.name} />
                  <div 
                    className="level-indicator" 
                    style={{ backgroundColor: getLevelColor(player.level) }}
                  ></div>
                </div>
                <div className="player-info">
                  <div className="player-name">{player.name}</div>
                  <div className="player-department">{player.department}</div>
                </div>
              </div>
              
              <div className="ranking-right">
                <div className="score-section">
                  <div className="score-main">{player.score}</div>
                  <div className="score-change">
                    {getChangeIcon(player.change)}
                    <span className={`change-value ${player.change.startsWith('+') ? 'positive' : player.change.startsWith('-') ? 'negative' : 'neutral'}`}>
                      {player.change}
                    </span>
                  </div>
                </div>
                
                <div className="player-stats">
                  <div className="stat-item">
                    <span className="stat-icon">🔥</span>
                    <span>{player.streak}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📁</span>
                    <span>{player.projects}</span>
                  </div>
                </div>
                
                <div className="player-badges">
                  {player.badges.map((badge, i) => (
                    <span key={i} className="achievement-badge">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="leaderboard-footer">
        <button className="view-all-btn">
          View Full Leaderboard
        </button>
        <div className="update-time">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;