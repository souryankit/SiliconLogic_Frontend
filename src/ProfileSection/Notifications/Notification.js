import React, { useState } from 'react';
import './notify.module.css';
import { Link } from 'react-router-dom';
import {
  MDBCol,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBIcon,
  MDBBadge
} from 'mdb-react-ui-kit';
import styles from './notify.module.css';

function Notify(){
  const [activeTab4, setActiveTab4] = useState('all');

  const handleTab4Click = (tab4) => {
    setActiveTab4(tab4);
  };

  return (
    <section className="pt-4">
      <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-light rounded-3 p-2">
            <MDBBreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>Notifications</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow>

      <div className="container">
        <header className="title-sec mb-4">
          <MDBRow className="align-items-center">
            <MDBCol md="6">
              <h3>Student Notifications</h3>
              <p>Important updates and announcements from your institution</p>
            </MDBCol>
            <MDBCol md="6" className="text-end">
              <button className="btn btn-primary">
                <MDBIcon far icon="check-circle" className="me-2" />
                Mark All as Read
              </button>
            </MDBCol>
          </MDBRow>
        </header>

        <div className={styles['tabs-container']}>
          <MDBTabs pills className="mb-2">
            <MDBTabsItem>
              <MDBTabsLink 
                onClick={() => handleTab4Click('all')} 
                active={activeTab4 === 'all'}
                className={`${styles['tab-link']} ${activeTab4 === 'all' ? styles['active'] : ''}`}
              >
                All <MDBBadge color="danger" className="ms-2">3</MDBBadge>
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink 
                onClick={() => handleTab4Click('academic')} 
                active={activeTab4 === 'academic'}
                className={`${styles['tab-link']} ${activeTab4 === 'academic' ? styles['active'] : ''}`}
              >
                Academic
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink 
                onClick={() => handleTab4Click('events')} 
                active={activeTab4 === 'events'}
                className={`${styles['tab-link']} ${activeTab4 === 'events' ? styles['active'] : ''}`}
              >
                Events
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink 
                onClick={() => handleTab4Click('financial')} 
                active={activeTab4 === 'financial'}
                className={`${styles['tab-link']} ${activeTab4 === 'financial' ? styles['active'] : ''}`}
              >
                Financial
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </div>

        <MDBTabsContent >
          <MDBTabsPane open={activeTab4 === 'all' || activeTab4 === 'academic'}>
            <div className="notification-group">
              <h6 className="text-muted mb-3">Today</h6>
              <article className="notification-card mb-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center">
                      <div className="notification-icon bg-primary-soft rounded-circle p-2">
                        <MDBIcon fas icon="book" className="text-primary" />
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">New Course Material Available</h6>
                        <p className="text-muted mb-0">
                          Updated lecture notes for Advanced Mathematics have been uploaded
                        </p>
                        <small className="text-muted">2 hours ago</small>
                      </div>
                      <div className="notification-actions">
                        <button className="btn btn-link p-0 me-2">View</button>
                        <button className="btn btn-link text-muted p-0">Dismiss</button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </MDBTabsPane>

          <MDBTabsPane open={activeTab4 === 'all' || activeTab4 === 'events'}>
            <div className="notification-group">
              <h6 className="text-muted mb-3">Upcoming Events</h6>
              <article className="notification-card mb-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center">
                      <div className="notification-icon bg-warning-soft rounded-circle p-2">
                        <MDBIcon fas icon="calendar-alt" className="text-warning" />
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">Annual Tech Symposium</h6>
                        <p className="text-muted mb-0">
                          Register for the upcoming tech symposium on May 15th
                        </p>
                        <small className="text-muted">1 day ago</small>
                      </div>
                      <div className="notification-actions">
                        <button className="btn btn-primary btn-sm">Register</button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </MDBTabsPane>

          <MDBTabsPane open={activeTab4 === 'all' || activeTab4 === 'financial'}>
            <div className="notification-group">
              <h6 className="text-muted mb-3">Financial Updates</h6>
              <article className="notification-card mb-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center">
                      <div className="notification-icon bg-success-soft rounded-circle p-2">
                        <MDBIcon fas icon="dollar-sign" className="text-success" />
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">Semester Fee Reminder</h6>
                        <p className="text-muted mb-0">
                          Last date for semester fee payment is approaching
                        </p>
                        <small className="text-muted">2 days ago</small>
                      </div>
                      <div className="notification-actions">
                        <button className="btn btn-success btn-sm">Pay Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </section>
  );
};

export default Notify;