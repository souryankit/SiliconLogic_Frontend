import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LogOut } from "react-feather";
import { auth } from "../../Utils/firebase";
import styles from './Topnavbar.module.css';


function DeskNavbar(props) {

  const navigate = useNavigate();
  const isAuthenticated = props.auth ? true : false;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNextButtonClick = () => {
    if (isAuthenticated) navigate("/dashboard");
    else navigate("/login");
    console.log("handleNext button clicked")
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navigateTo = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Ensure dropdown is closed on unmount
      setDropdownOpen(false);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if we have a valid event target and it's not within the dropdown
      if (event && event.target && !event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    // Only add event listener when dropdown is open
    if (dropdownOpen) {
      // Add a small delay to prevent immediate closure
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 10);

      return () => {
        clearTimeout(timer);
        // Safe removal with try-catch
        try {
          document.removeEventListener('click', handleClickOutside);
        } catch (error) {
          // Silently handle removal errors
        }
      };
    }
  }, [dropdownOpen]);

  return (
    <div  className={`sticky-topnav ${styles['sticky-topnav']}`}>
      <div className={`navbar navbar-expand-lg ${styles['navbar']}`} id="primnav">
        <div className="container">
          <div ><a className="navbar-brand imgcard" href="/"><img src="/static_img/weblogo.png" style={{ height: 40, width: 160 }} alt="logo" /> </a> </div>

          <div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent ">
              <ul className={`navbar-nav me-auto mb-0 mb-lg-0 ${styles['navbar-nav']}`}>

                <li className={`nav-item active my-2 imgcard ${styles['nav-item']}`}>
                  <Link className="nav-link" to="/">
                    <div className={`nav-text ${styles['nav-text']}`}> Home</div>
                  </Link>
                </li>
                <li className={`nav-item my-2 imgcard ${styles['nav-item']}`}>
                  <Link className="nav-link" to="/about">
                    <div className={`nav-text ${styles['nav-text']}`}>About</div>
                  </Link>
                </li>

                <li className={`nav-item my-2 imgcard ${styles['nav-item']}`}>
                  <Link className="nav-link" to="/course">
                    <div className={`nav-text ${styles['nav-text']}`}>Course</div>
                  </Link>
                </li>

                <li className={`nav-item my-2 imgcard ${styles['nav-item']}`}>
                  <Link className="nav-link" to="/notice">
                    <div className={`nav-text ${styles['nav-text']}`}>Notice</div>
                  </Link>
                </li>

                <li className={`nav-item my-2 imgcard ${styles['nav-item']}`}>
                  <Link className="nav-link" to="/pricing">
                    <div className={`nav-text ${styles['nav-text']}`}>Pricing</div>
                  </Link>
                </li>

                <li className={`nav-item my-2 imgcard ${styles['nav-item']}`}>
                  <Link className="nav-link" to="/contact">
                    <div className={`nav-text ${styles['nav-text']}`}>Contact</div>
                  </Link>
                </li>
                {/* <li className="nav-item mx-1" onClick={handleNextButtonClick}></li> */}
                <div onClick={isAuthenticated ? () => setDropdownOpen(!dropdownOpen) : handleNextButtonClick}>
                  {isAuthenticated ? (
                    <div className="dropdown my-2">
                      <div type="button">
                        <div className=""> <img src="/user/user16.jpg" style={{ height: 40, width: 40 }} alt="Me" /> </div>
                      </div>
                      {dropdownOpen && (
                        <div className="dropdown-menu show dropdown-menu-end" style={{ right: 0, left: 'auto', position: 'absolute' }}>
                          <div className="dropdown-item" onClick={() => navigateTo("/dashboard")}>Dashboard</div>
                          <div className="dropdown-item" onClick={() => navigateTo("/dashboard/learning")}>Learning</div>
                          <div className="dropdown-item" onClick={() => navigateTo("/dashboard/codebox")}>Practice</div>
                          <div className="dropdown-item" onClick={() => navigateTo("/dashboard/account")}>Profile</div>
                          <div className="dropdown-item" onClick={handleLogout}>
                            <i className="bx" /> <span><LogOut />Log Out</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link className="nav-link"> <img src="/static_img/userid.png" style={{ height: 40, width: 40 }} /></Link>
                  )}
                </div>               
              </ul>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeskNavbar;
