import React, { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { Camera, LogOut, Book, Clock, Calendar as CalendarIcon, Bell, Award, Briefcase, TrendingUp } from "react-feather";
import { Link, Navigate } from "react-router-dom";
import { auth, uploadImage, updateUserDatabase } from "../../Utils/firebase";
import styles from "./dash.module.css";

import "chart.js/auto";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBTooltip,
} from "mdb-react-ui-kit";

function Dashboard(props) {
  const userDetails = props.userDetails;
  const isAuthenticated = props.auth;
  const imagePicker = useRef();
  const chartRefs = useRef([]);
  const barChartRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [profileImageUploadStarted, setProfileImageUploadStarted] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(
    userDetails.profileImage ||
    "https://pixabay.com/vectors/avatar-black-head-monochrome-1299805/"
  );
  const [userProfileValues] = useState({
    name: userDetails.first_name || "",
    username: userDetails.username || "",
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
  });

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { id: 1, title: "Data Structures Assignment", dueDate: "2025-07-5", course: "Computer Science 101", priority: "high" },
    { id: 2, title: "Machine Learning Project", dueDate: "2025-07-8", course: "AI Fundamentals", priority: "medium" },
    { id: 3, title: "Physics Lab Report", dueDate: "2025-07-3", course: "Physics 202", priority: "low" },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "Completed Quiz", subject: "Python Basics", time: "2 hours ago" },
    { id: 2, action: "Watched Lecture", subject: "Advanced Algorithms", time: "Yesterday" },
    { id: 3, action: "Submitted Assignment", subject: "Web Development", time: "2 days ago" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New course available: Cloud Computing", time: "1 hour ago", read: false },
    { id: 2, message: "Assignment deadline extended", time: "3 hours ago", read: false },
    { id: 3, message: "Your project was graded", time: "1 day ago", read: true },
  ]);

  const [allEvents, setAllEvents] = useState([
    // Past Events
    { id: 1, title: "React Fundamentals Class", date: { year: 2025, month: 6, day: 20 }, description: "Introduction to React components", time: "2:00 PM - 4:00 PM", type: "past" },
    { id: 2, title: "Database Design Workshop", date: { year: 2025, month: 6, day: 18 }, description: "MySQL and MongoDB basics", time: "11:00 AM - 1:00 PM", type: "past" },
    { id: 3, title: "Python Assignment Submission", date: { year: 2025, month: 6, day: 15 }, description: "Data structures project", time: "11:59 PM", type: "past" },

    // Upcoming Events - Updated with realistic dates
    { id: 4, title: "Group Project Meeting", date: { year: 2025, month: 7, day: 25 }, description: "Discussion on final presentation", time: "10:00 AM - 11:30 AM", type: "upcoming" },
    { id: 5, title: "Java Programming Quiz", date: { year: 2025, month: 7, day: 27 }, description: "Chapter 5-7: Data Structures", time: "1:00 PM - 2:30 PM", type: "upcoming" },
    { id: 6, title: "Web Development Workshop", date: { year: 2025, month: 7, day: 29 }, description: "Introduction to React.js", time: "11:00 AM - 2:00 PM", type: "upcoming" },
    { id: 7, title: "AI/ML Seminar", date: { year: 2025, month: 7, day: 3 }, description: "Machine Learning fundamentals", time: "3:00 PM - 5:00 PM", type: "upcoming" },
    { id: 8, title: "Project Demo Day", date: { year: 2025, month: 7, day: 7 }, description: "Final project presentations", time: "9:00 AM - 12:00 PM", type: "upcoming" },
    { id: 9, title: "Code Review Session", date: { year: 2025, month: 7, day: 12 }, description: "Peer code review and feedback", time: "2:00 PM - 4:00 PM", type: "upcoming" },
    { id: 10, title: "Final Exam Preparation", date: { year: 2025, month: 7, day: 18 }, description: "Study group for final exams", time: "6:00 PM - 8:00 PM", type: "upcoming" },

    // July 2025 events for testing
    { id: 11, title: "Summer Workshop", date: { year: 2025, month: 7, day: 24 }, description: "Advanced programming techniques", time: "10:00 AM - 3:00 PM", type: "upcoming" },
    { id: 12, title: "Team Building Event", date: { year: 2025, month: 7, day: 24 }, description: "Fun activities and networking", time: "4:00 PM - 6:00 PM", type: "upcoming" },
  ]);

  // Get formatted upcoming events for the old upcoming events section
  const getFormattedUpcomingEvents = () => {
    const today = new Date();
    return allEvents
      .filter(event => event.type === 'upcoming')
      .sort((a, b) => {
        const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
        const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);
        return dateA - dateB;
      })
      .slice(0, 3)
      .map(event => {
        const eventDate = new Date(event.date.year, event.date.month - 1, event.date.day);
        const dayName = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = eventDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: eventDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        });

        return {
          ...event,
          displayDate: formatDateForDisplay(event.date),
          fullDateDisplay: `${dayName}, ${dateStr}`
        };
      });
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCameraClick = () => {
    imagePicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProfileImageUploadStarted(true);
    uploadImage(
      file,
      (progress) => {
        setProgress(progress);
      },
      (url) => {
        setProfileImageUrl(url);
        updateProfileImageToDatabase(url);
        setProfileImageUploadStarted(false);
        setProgress(0);
      },
      (err) => {
        console.error("Error->", err);
        setProfileImageUploadStarted(true);
      }
    );
  };

  const updateProfileImageToDatabase = (url) => {
    updateUserDatabase(
      { ...userProfileValues, profileImage: url },
      userDetails.uid
    );
  };

  const linetdata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Study Hours",
        data: [33, 53, 75, 68, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Assignment Completion",
        data: [33, 25, 35, 51, 54, 76],
        fill: true,
        borderColor: "#742774",
      },
    ],
  };

  const bardata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept"],
    datasets: [
      {
        label: "Course Performance",
        data: [65, 59, 80, 81, 56, 55, 40, 68, 35],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const donoughtdata1 = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        label: "Courses",
        data: [50, 30, 20],
        backgroundColor: ["rgb(60, 179, 113)", "rgb(255, 205, 86)", "rgb(211, 211, 211)"],
        hoverOffset: 4,
      },
    ],
  };

  const donoughtdata2 = {
    labels: ["Attended", "Missed", "Upcoming"],
    datasets: [
      {
        label: "Classes",
        data: [70, 10, 20],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };
  const today = new Date();
  const defaultValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1, // getMonth() returns 0-11, but we need 1-12
    day: today.getDate()
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Preventive cleanup on mount
  useEffect(() => {
    // Clean up any existing charts before mounting new ones
    try {
      if (typeof window !== 'undefined' && window.Chart && window.Chart.instances) {
        Object.values(window.Chart.instances).forEach(instance => {
          try {
            if (instance && typeof instance.destroy === 'function') {
              instance.destroy();
            }
          } catch (err) {
            // Ignore cleanup errors
          }
        });
      }
    } catch (error) {
      // Ignore preventive cleanup errors
    }
  }, []);

  // Cleanup effect for third-party components
  useEffect(() => {
    // Add window beforeunload handler as backup cleanup
    const handleBeforeUnload = () => {
      try {
        if (window.Chart && window.Chart.instances) {
          Object.values(window.Chart.instances).forEach(instance => {
            try {
              if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
              }
            } catch (err) {
              // Ignore cleanup errors
            }
          });
        }
      } catch (error) {
        // Ignore beforeunload cleanup errors
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Remove beforeunload handler
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Clean up Chart.js instances with multiple approaches
      try {
        // Method 1: Clean up ref-tracked chart
        if (barChartRef.current && barChartRef.current.chartInstance) {
          try {
            barChartRef.current.chartInstance.destroy();
          } catch (err) {
            // Ignore chart ref cleanup errors
          }
        }

        if (typeof window !== 'undefined') {
          // Method 2: Clean up global Chart instances
          if (window.Chart && window.Chart.instances) {
            Object.values(window.Chart.instances).forEach(instance => {
              try {
                if (instance && typeof instance.destroy === 'function') {
                  instance.destroy();
                }
              } catch (err) {
                // Ignore individual chart cleanup errors
              }
            });
          }
          
          // Method 3: Clean up any chart canvases
          const chartCanvases = document.querySelectorAll('canvas[role="img"]');
          chartCanvases.forEach(canvas => {
            try {
              const chart = window.Chart && window.Chart.getChart && window.Chart.getChart(canvas);
              if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
              }
            } catch (err) {
              // Ignore individual canvas cleanup errors
            }
          });

          // Method 4: Force cleanup of any remaining chart canvases by removing them
          const remainingChartCanvases = document.querySelectorAll('canvas.chartjs-render-monitor');
          remainingChartCanvases.forEach(canvas => {
            try {
              if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
              }
            } catch (err) {
              // Ignore canvas removal errors
            }
          });

          // Method 5: Clear Chart.js global registry
          try {
            if (window.Chart && window.Chart.registry) {
              // Clear any remaining chart instances
              if (window.Chart.registry.controllers) {
                Object.keys(window.Chart.registry.controllers).forEach(key => {
                  try {
                    delete window.Chart.registry.controllers[key];
                  } catch (err) {
                    // Ignore registry cleanup errors
                  }
                });
              }
            }
          } catch (err) {
            // Ignore registry cleanup errors
          }
        }
      } catch (error) {
        // Silently ignore cleanup errors
      }

      // Clean up calendar component
      try {
        // Force re-render of calendar by clearing its container
        const calendarContainer = document.querySelector('.Calendar');
        if (calendarContainer && calendarContainer.parentNode) {
          const placeholder = document.createElement('div');
          calendarContainer.parentNode.replaceChild(placeholder, calendarContainer);
          setTimeout(() => {
            try {
              if (placeholder && placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
              }
            } catch (err) {
              // Ignore placeholder removal errors
            }
          }, 0);
        }
      } catch (error) {
        // Silently ignore calendar cleanup errors
      }

      // Reset all state to prevent stale references
      try {
        setSelectedDay(null);
        setSelectedDateEvents([]);
      } catch (error) {
        // Silently ignore state cleanup errors
      }
    };
  }, []);

  // Function to get events for a specific date
  const getEventsForDate = (dateObj) => {
    if (!dateObj) return [];
    return allEvents.filter(event =>
      event.date.year === dateObj.year &&
      event.date.month === dateObj.month &&
      event.date.day === dateObj.day
    );
  };

  // Function to handle calendar date selection
  const handleDateSelect = (date) => {
    setSelectedDay(date);
    if (date) {
      const eventsForDate = getEventsForDate(date);
      setSelectedDateEvents(eventsForDate);
    } else {
      setSelectedDateEvents([]);
    }
  };

  // Function to get all events for calendar display (including past and upcoming)
  const getAllEventsForCalendarDisplay = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    const upcomingEvents = [];
    const pastEvents = [];

    allEvents.forEach(event => {
      const eventDate = new Date(event.date.year, event.date.month - 1, event.date.day);
      const eventWithDisplay = {
        ...event,
        displayDate: formatDateForDisplay(event.date),
        eventDate: eventDate
      };

      if (eventDate >= today) {
        upcomingEvents.push(eventWithDisplay);
      } else {
        pastEvents.push(eventWithDisplay);
      }
    });

    // Sort upcoming events by date (earliest first)
    upcomingEvents.sort((a, b) => a.eventDate - b.eventDate);

    // Sort past events by date (most recent first)
    pastEvents.sort((a, b) => b.eventDate - a.eventDate);

    // Return upcoming events first, then past events
    return [...upcomingEvents, ...pastEvents];
  };

  // Function to format date for display
  const formatDateForDisplay = (dateObj) => {
    const today = new Date();
    const eventDate = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1 && diffDays <= 7) return eventDate.toLocaleDateString('en-US', { weekday: 'short' });
    return eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return isAuthenticated ? (
    <div className="dashboard-container">
      <div className={styles.db_container}>
        <MDBCard className="shadow-sm mb-4">
          <MDBCardBody>
            <div className={styles.db_header}>
              <div>
                <h4 className="mb-0 fw-bold">Welcome, <span className="text-primary">{userProfileValues.name}</span></h4>
                <p className="text-muted small mb-0">Last login: Today, 09:41 AM</p>
              </div>
              <div className="d-flex align-items-center">
                <MDBTooltip tag="a" title="Notifications">
                  <div className="position-relative me-4 cursor-pointer">
                    <Bell size={20} />
                    <MDBBadge color="danger" notification pill className="position-absolute top-0 end-0">
                      {notifications.filter(n => !n.read).length}
                    </MDBBadge>
                  </div>
                </MDBTooltip>
                <MDBBtn color="danger" size="sm" onClick={handleLogout} className="d-flex align-items-center">
                  <LogOut size={16} className="me-2" /> Logout
                </MDBBtn>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>

        <input ref={imagePicker} type="file" style={{ display: "none" }} onChange={handleImageChange} />

        <div className={styles.db_section}>
          <MDBRow className="mb-0">
            <MDBCol lg="4">
              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody className="text-center">
                  <div className={styles.db_profile}>
                    <div className={styles.left}>
                      <div className={styles.image}>
                        <img src={profileImageUrl} alt="Profile" className="rounded-circle shadow" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                        <div
                          className={styles.camera}
                          onClick={handleCameraClick}
                        >
                          <Camera />
                        </div>
                      </div>
                      {profileImageUploadStarted ? (
                        <p className={styles.progress}>
                          {progress == 100
                            ? "Getting image url..."
                            : `${progress.toFixed(1)}% uploaded`}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <h5 className="mt-3 mb-0">{userProfileValues.name}</h5>
                  <p className="text-danger mb-1">@{userProfileValues.username}</p>
                  <p className="text-muted mb-3">
                    {userProfileValues.designation || "Design Verification Engineer"}
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link to="/dashboard/account" className="btn btn-primary me-2">View Profile</Link>
                    <Link to="/dashboard/editprofile" className="btn btn-outline-primary">Edit Profile</Link>
                  </div>

                  <div className="mt-4">
                    <MDBCardText className="text-start fw-bold mb-2" >
                      Profile Completion
                    </MDBCardText>
                    <MDBProgress className="mb-2" height='10'>
                      <MDBProgressBar bgColor='success' width='45' valuemin={0} valuemax={100}>
                      </MDBProgressBar>
                    </MDBProgress>
                    <p className="text-end text-muted small">45% Complete</p>
                  </div>
                </MDBCardBody>
              </MDBCard>
              {/* Quick Links Component */}
              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  <h5 className="card-title mb-3 d-flex align-items-center">
                    <i className="fas fa-link me-2"></i> Quick Links
                  </h5>
                  <MDBListGroup>
                    <MDBListGroupItem action href="#" className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="fas fa-book-open me-2"></i>
                        My Courses
                      </div>
                      <MDBBadge pill color='primary'>12</MDBBadge>
                    </MDBListGroupItem>
                    <MDBListGroupItem action href="#" className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="fas fa-tasks me-2"></i>
                        Assignments
                      </div>
                      <MDBBadge pill color='warning'>5</MDBBadge>
                    </MDBListGroupItem>
                    <MDBListGroupItem action href="#" className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="fas fa-award me-2"></i>
                        Certificates
                      </div>
                      <MDBBadge pill color='success'>3</MDBBadge>
                    </MDBListGroupItem>
                    <MDBListGroupItem action href="#" className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="fas fa-chart-line me-2"></i>
                        Performance
                      </div>
                    </MDBListGroupItem>
                    <MDBListGroupItem action href="#" className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="fas fa-comments me-2"></i>
                        Discussion Forums
                      </div>
                      <MDBBadge pill color='danger'>8</MDBBadge>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
              {/* Recent Activity Component */}
              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  <h5 className="card-title mb-3 d-flex align-items-center">
                    <Clock size={18} className="me-2" /> Recent Activity
                  </h5>
                  <MDBListGroup flush>
                    {recentActivities.map((activity) => (
                      <MDBListGroupItem key={activity.id} className="d-flex justify-content-between align-items-center border-bottom py-3">
                        <div>
                          <p className="mb-0 fw-bold">{activity.action}</p>
                          <p className="text-muted small mb-0">{activity.subject}</p>
                        </div>
                        <span className="text-muted smaller">{activity.time}</span>
                      </MDBListGroupItem>
                    ))}
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>


            </MDBCol>

            <MDBCol lg="8">
              <MDBRow>
                <MDBCol md="4" className="mb-4">
                  <MDBCard className="shadow-sm h-100">
                    <MDBCardBody className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="text-muted mb-0">Total Courses</h6>
                        <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                          <Book size={18} className="text-primary" />
                        </div>
                      </div>
                      <h4 className="fw-bold mb-0">12</h4>
                      <p className="text-success mt-2 mb-0"><i className="fas fa-arrow-up me-1"></i> 3 new this month</p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                  <MDBCard className="shadow-sm h-100">
                    <MDBCardBody className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="text-muted mb-0">Assignments</h6>
                        <div className="bg-warning bg-opacity-10 p-2 rounded-circle">
                          <Briefcase size={18} className="text-warning" />
                        </div>
                      </div>
                      <h4 className="fw-bold mb-0">5</h4>
                      <p className="text-danger mt-2 mb-0"><i className="fas fa-clock me-1"></i> 2 due this week</p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                  <MDBCard className="shadow-sm h-100">
                    <MDBCardBody className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="text-muted mb-0">Certificates</h6>
                        <div className="bg-success bg-opacity-10 p-2 rounded-circle">
                          <Award size={18} className="text-success" />
                        </div>
                      </div>
                      <h4 className="fw-bold mb-0">3</h4>
                      <p className="text-primary mt-2 mb-0"><i className="fas fa-trophy me-1"></i> Latest: Web Development</p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>

              {/* <MDBCard className="mb-4 shadow-sm">
                    <MDBCardBody>
                      <h5 className="card-title mb-3 d-flex align-items-center">
                        <Bell size={18} className="me-2" /> Notifications
                      </h5>
                      <MDBListGroup flush className="border-top">
                        {notifications.map((notification) => (
                          <MDBListGroupItem key={notification.id} className="d-flex justify-content-between align-items-center border-bottom py-3">
                            <div className={`${!notification.read ? 'fw-bold' : ''}`}>
                              {notification.message}
                              {!notification.read && <MDBBadge color="danger" dot className="ms-2" />}
                            </div>
                            <span className="text-muted small">{notification.time}</span>
                          </MDBListGroupItem>
                        ))}
                      </MDBListGroup>
                      <div className="text-end mt-3">
                        <MDBBtn color="link" size="sm">View All Notifications</MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard> */}

              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  <h5 className="card-title mb-3 d-flex align-items-center">
                    <TrendingUp size={18} className="me-2" /> Learning Progress
                  </h5>
                  <MDBRow>
                    <Bar 
                      ref={barChartRef}
                      key="dashboard-bar-chart" 
                      data={bardata} 
                      options={{ 
                        maintainAspectRatio: true,
                        responsive: true,
                        plugins: {
                          legend: {
                            display: true
                          }
                        }
                      }} 
                    />
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  <h5 className="card-title mb-3 d-flex align-items-center">
                    <CalendarIcon size={18} className="me-2" /> Upcoming Deadlines
                  </h5>
                  <MDBListGroup flush className="border-top">
                    {upcomingDeadlines.map((deadline) => (
                      <MDBListGroupItem key={`deadline-${deadline.id}`} className="d-flex justify-content-between align-items-center border-bottom py-3">
                        <div>
                          <p className="mb-0 fw-bold">{deadline.title}</p>
                          <p className="text-muted small mb-0">{deadline.course}</p>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-muted small">{deadline.dueDate}</span>
                          <MDBBadge color={
                            deadline.priority === 'high' ? 'danger' :
                              deadline.priority === 'medium' ? 'warning' : 'info'
                          } className="mt-1">{deadline.priority}</MDBBadge>
                        </div>
                      </MDBListGroupItem>
                    ))}
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="shadow-sm">
                <MDBCardBody>
                  <MDBRow>
                                            <MDBCol lg="5" md="6" sm="12" className="mb-3 mb-lg-0">
                          <h5 className="card-title mb-3 d-flex align-items-center">
                            <CalendarIcon size={18} className="me-2" /> Study Calendar
                          </h5>
                          <div className="d-flex justify-content-center px-2">
                            <div className="w-100 d-flex justify-content-center" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <Calendar
                                key="dashboard-calendar"
                                value={selectedDay}
                                onChange={handleDateSelect}
                                shouldHighlightWeekends
                                calendarClassName="responsive-calendar"
                                colorPrimary="#0d6efd"
                                colorPrimaryLight="#b6d7ff"
                              />
                            </div>
                          </div>
                      {/* {selectedDay && (
                            <div className="mt-3 p-2 bg-light rounded">
                              <small className="text-muted">
                                Selected: {selectedDay.day}/{selectedDay.month}/{selectedDay.year}
                              </small>
                            </div>
                          )} */}
                    </MDBCol>
                    <MDBCol lg="7" md="6" sm="12">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title mb-0">
                          {selectedDay && selectedDateEvents.length > 0
                            ? `Events for ${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`
                            : "All Events"}
                        </h5>
                        {selectedDay && (
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              setSelectedDay(null);
                              setSelectedDateEvents([]);
                            }}
                          >
                            Show All
                          </button>
                        )}
                      </div>
                      <MDBListGroup
                        flush
                        className="border-top"
                        style={{
                          maxHeight: '400px',
                          overflowY: 'auto',
                          scrollBehavior: 'smooth'
                        }}
                      >
                        {selectedDay ? (
                          selectedDateEvents.length > 0 ? (
                            selectedDateEvents.map((event) => (
                              <MDBListGroupItem key={event.id} className="border-bottom py-3">
                                <div className="d-flex w-100 justify-content-between align-items-start">
                                  <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h6 className="mb-1">{event.title}</h6>
                                      <div className="d-flex align-items-center gap-2">
                                        <small className="text-muted">
                                          {selectedDay.day}/{selectedDay.month}/{selectedDay.year}
                                        </small>
                                        <MDBBadge
                                          color={event.type === 'past' ? 'secondary' : event.type === 'upcoming' ? 'primary' : 'success'}
                                          size="sm"
                                        >
                                          {event.type}
                                        </MDBBadge>
                                      </div>
                                    </div>
                                    <p className="mb-1 small text-muted">{event.description}</p>
                                    <small className="text-muted">
                                      <i className="fas fa-clock me-1"></i>
                                      {event.time}
                                    </small>
                                  </div>
                                </div>
                              </MDBListGroupItem>
                            ))
                          ) : (
                            <MDBListGroupItem className="text-center py-4 text-muted">
                              <i className="fas fa-calendar-times fa-2x mb-2"></i>
                              <p className="mb-0">No events scheduled for this date</p>
                            </MDBListGroupItem>
                          )
                        ) : (
                          getAllEventsForCalendarDisplay().map((event) => (
                            <MDBListGroupItem key={event.id} className="border-bottom py-3">
                              <div className="d-flex w-100 justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="mb-1">{event.title}</h6>
                                    <div className="d-flex align-items-center gap-2">
                                      <small className="text-muted">
                                        {event.displayDate}
                                      </small>
                                      <MDBBadge
                                        color={event.type === 'past' ? 'secondary' : event.type === 'upcoming' ? 'primary' : 'success'}
                                        size="sm"
                                      >
                                        {event.type}
                                      </MDBBadge>
                                    </div>
                                  </div>
                                  <p className="mb-1 small text-muted">{event.description}</p>
                                  <small className="text-muted">
                                    <i className="fas fa-clock me-1"></i>
                                    {event.time}
                                  </small>
                                </div>
                              </div>
                            </MDBListGroupItem>
                          ))
                        )}
                      </MDBListGroup>
                      {!selectedDay && getAllEventsForCalendarDisplay().length > 5 && (
                        <div className="text-center py-2">
                          <small className="text-muted">
                            <i className="fas fa-chevron-down me-1"></i>
                            Scroll to see more events ({getAllEventsForCalendarDisplay().length} total)
                          </small>
                        </div>
                      )}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Dashboard;
