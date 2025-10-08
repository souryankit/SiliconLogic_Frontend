import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { LogOut } from 'react-feather';
import { auth } from '../../Utils/firebase';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './MobileNavbar.module.css';

function MobileNavbar(props) {
  const navigate = useNavigate();
  const isAuthenticated = props.auth ? true : false;
  const [expanded, setExpanded] = useState(false);

  const handleNextButtonClick = () => {
    if (isAuthenticated) navigate('/dashboard');
    else navigate('/login');
    setExpanded(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setExpanded(false);
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <section className={styles['sticky-topnav']}>
      <Navbar 
        bg="light" 
        expand="lg" 
        id="mobileNav" 
        className={styles['mobile-nav']}
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
            <img 
              src="/static_img/weblogo.png" 
              style={{ height: 50, width: 190 }} 
              alt="logo" 
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="" />
          <Navbar.Collapse id="mobile-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" onClick={closeNavbar} className={styles['nav-item']}>
                <div className={styles['nav-text']}>Home</div>
              </Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={closeNavbar} className={styles['nav-item']}>
                <div className={styles['nav-text']}>About</div>
              </Nav.Link>
              <Nav.Link as={Link} to="/course" onClick={closeNavbar} className={styles['nav-item']}>
                <div className={styles['nav-text']}>Course</div>
              </Nav.Link>
              <Nav.Link as={Link} to="/notice" onClick={closeNavbar} className={styles['nav-item']}>
                <div className={styles['nav-text']}>Notice</div>
              </Nav.Link>
              <Nav.Link as={Link} to="/pricing" onClick={closeNavbar} className={styles['nav-item']}>
                <div className={styles['nav-text']}>Pricing</div>
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={closeNavbar} className={styles['nav-item']}>
                <div className={styles['nav-text']}>Contact</div>
              </Nav.Link>
              
              {isAuthenticated ? (
                <NavDropdown 
                  title={
                    <div className="d-inline-block">
                      <img 
                        src="/user/user16.jpg" 
                        style={{ height: 40, width: 40, borderRadius: '50%' }} 
                        alt="User" 
                      />
                    </div>
                  } 
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/dashboard" onClick={closeNavbar}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/learning" onClick={closeNavbar}>
                    Learning
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/practicelist" onClick={closeNavbar}>
                    Practice
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/account" onClick={closeNavbar}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <LogOut size={16} className="me-2" /> Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={handleNextButtonClick} className={styles['nav-item']}>
                  <img 
                    src="/static_img/userid.png" 
                    style={{ height: 40, width: 40 }} 
                    alt="User"
                  />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
}

export default MobileNavbar; 