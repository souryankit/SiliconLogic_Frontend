import React, { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { Camera, LogOut } from "react-feather";
import { Link, Navigate } from "react-router-dom";
import { auth, uploadImage, updateUserDatabase } from "../../Utils/firebase";
import styles from "./account.module.css";
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
} from "mdb-react-ui-kit";

export function ProfilePage(props) {
  const userDetails = props.userDetails;
  const isAuthenticated = props.auth;
  const imagePicker = useRef();

  const [progress, setProgress] = useState(0);
  const [profileImageUploadStarted, setProfileImageUploadStarted] =
    useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(
    userDetails.profileImage ||
    "https://pixabay.com/vectors/avatar-black-head-monochrome-1299805/"
  );
  const [userProfileValues] = useState({
    name: userDetails.first_name || "",
    lastName: userDetails.last_name || "",
    username: userDetails.username || "",
    designation: userDetails.designation || "",
    mobile: userDetails.phone || "",
    email: userDetails.email || "",
    institute: userDetails.institute || "",
    role: userDetails.role || "",
    address: userDetails.address || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
    website: userDetails.website ||"",
    bio:userDetails.bio ||"",
  });

  // const handleLogout = async () => {
  //   await signOut(auth);
  // };

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

  return isAuthenticated ? (
    <div className={styles.db_container}>
      <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-light rounded-3 p-2 mt-2 mr-2">
            <MDBBreadcrumbItem>
              <Link to="/dashboard">User</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>Account</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow>
      <input
        ref={imagePicker}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div className={styles.db_section}>
        <MDBRow>
          <MDBCol lg="4">
            <MDBRow>
              <MDBCard className="mb-4" style={{ borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.08)" }}>
                <MDBCardBody className="text-center">
                  <div className={styles.db_profile}>
                    <div className={styles.left}>
                      <div 
                        className={styles.image} 
                        style={{ 
                          border: "5px solid #a18eff", 
                          boxShadow: "0 5px 15px rgba(0,0,0,0.1)" 
                        }}
                      >
                        <img src={profileImageUrl} alt="Profile" />
                        <div
                          className={styles.camera}
                          onClick={handleCameraClick}
                          style={{ backgroundColor: "#f8f9fa", boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}
                        >
                          <Camera color="#7d63fb" size={18} />
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
                  <h5 className="mt-3 mb-0" style={{ color: "#392c7d", fontWeight: "600" }}>
                    {userProfileValues.name || "Your Name"}
                  </h5>
                  <p className="text-danger m-1 fw-bold">@{userProfileValues.username}</p>
                  <p className="text-muted mb-4">
                    {userProfileValues.designation}
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <Link to="/dashboard/editprofile" className={styles.button} style={{ borderRadius: "25px", transition: "all 0.3s ease" }}>
                      <MDBIcon far icon="edit" className="me-2" /> Edit Profile
                    </Link>
                    <Link to="/dashboard/editprofile" className={styles.button} style={{ borderRadius: "25px", transition: "all 0.3s ease" }}>
                      <MDBIcon fas icon="file-upload" className="me-2" /> Upload Resume
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <div className="d-flex align-items-center">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <span className="ms-3 fw-bold">Website</span>
                      </div>
                      <MDBCardText className="mb-0">{userProfileValues.website || "-"}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <div className="d-flex align-items-center">
                        <MDBIcon fab icon="github fa-lg" style={{ color: "#333333" }} />
                        <span className="ms-3 fw-bold">GitHub</span>
                      </div>
                      <MDBCardText className="mb-0">{userProfileValues.github || "-"}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <div className="d-flex align-items-center">
                        <MDBIcon fab icon="linkedin fa-lg" style={{ color: "#0077b5" }} />
                        <span className="ms-3 fw-bold">LinkedIn</span>
                      </div>
                      <MDBCardText className="mb-0">{userProfileValues.linkedin || "-"}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <div className="d-flex align-items-center">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: "#ac2bac" }} />
                        <span className="ms-3 fw-bold">Instagram</span>
                      </div>
                      <MDBCardText className="mb-0">mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <div className="d-flex align-items-center">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: "#3b5998" }} />
                        <span className="ms-3 fw-bold">Facebook</span>
                      </div>
                      <MDBCardText className="mb-0">mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className={`mb-4 ${styles["info-card"]}`} style={{ borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.08)" }}>
              <MDBCardBody>
                <div className="d-flex align-items-center mb-4">
                  <div style={{ width: "4px", height: "24px", backgroundColor: "#7d63fb", marginRight: "10px", borderRadius: "2px" }}></div>
                  <h5 className={`mb-0 ${styles["section-title"]}`} style={{ color: "#392c7d", fontWeight: "600" }}>Personal Information</h5>
                </div>
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold text-muted">Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ color: "#392c7d", fontWeight: "500" }}>
                      {userProfileValues.name || "-"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr style={{ height: "1px", opacity: "0.1" }} />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold text-muted">Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ color: "#392c7d", fontWeight: "500" }}>
                      {userProfileValues.email || "-"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr style={{ height: "1px", opacity: "0.1" }} />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold text-muted">Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ color: "#392c7d", fontWeight: "500" }}>
                      {userProfileValues.mobile ? `(+91) ${userProfileValues.mobile}` : "-"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr style={{ height: "1px", opacity: "0.1" }} />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold text-muted">Institution</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ color: "#392c7d", fontWeight: "500" }}>
                      {userProfileValues.institute || "-"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr style={{ height: "1px", opacity: "0.1" }} />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold text-muted">Role</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ color: "#392c7d", fontWeight: "500" }}>
                      {userProfileValues.role || "-"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr style={{ height: "1px", opacity: "0.1" }} />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold text-muted">Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ color: "#392c7d", fontWeight: "500" }}>
                      {userProfileValues.address || "-"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr style={{ height: "1px", opacity: "0.1" }} />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold text-muted">Bio</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{ color: "#392c7d", fontWeight: "500" }}>
                      {userProfileValues.bio || "-"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className={`mb-4 ${styles["info-card"]}`} style={{ borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.08)" }}>
              <MDBCardBody>
                <div className="d-flex align-items-center mb-4">
                  <div style={{ width: "4px", height: "24px", backgroundColor: "#7d63fb", marginRight: "10px", borderRadius: "2px" }}></div>
                  <h5 className={`mb-0 ${styles["section-title"]}`} style={{ color: "#392c7d", fontWeight: "600" }}>Learning Progress</h5>
                </div>
                
                <MDBRow className="mb-4">
                  <MDBCol sm="12" md="6" lg="4" className="mb-3">
                    <div className={styles["progress-card"]} style={{ borderRadius: "12px", padding: "15px", backgroundColor: "rgba(125, 99, 251, 0.05)" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="mb-0 fw-bold" style={{ color: "#392c7d" }}>Web Development</p>
                        <span className="badge" style={{ backgroundColor: "#7d63fb", fontSize: "12px" }}>75%</span>
                      </div>
                      <MDBProgress height="8" style={{ borderRadius: "4px", backgroundColor: "rgba(125, 99, 251, 0.1)" }}>
                        <MDBProgressBar
                          width={75}
                          valuemin={0}
                          valuemax={100}
                          style={{ 
                            backgroundColor: "#7d63fb", 
                            borderRadius: "4px"
                          }}
                        />
                      </MDBProgress>
                      <p className="mb-0 mt-2 text-muted" style={{ fontSize: "12px" }}>Last updated 2 days ago</p>
                    </div>
                  </MDBCol>
                  
                  <MDBCol sm="12" md="6" lg="4" className="mb-3">
                    <div className={styles["progress-card"]} style={{ borderRadius: "12px", padding: "15px", backgroundColor: "rgba(125, 99, 251, 0.05)" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="mb-0 fw-bold" style={{ color: "#392c7d" }}>Data Structures</p>
                        <span className="badge" style={{ backgroundColor: "#7d63fb", fontSize: "12px" }}>60%</span>
                      </div>
                      <MDBProgress height="8" style={{ borderRadius: "4px", backgroundColor: "rgba(125, 99, 251, 0.1)" }}>
                        <MDBProgressBar
                          width={60}
                          valuemin={0}
                          valuemax={100}
                          style={{ 
                            backgroundColor: "#7d63fb", 
                            borderRadius: "4px"
                          }}
                        />
                      </MDBProgress>
                      <p className="mb-0 mt-2 text-muted" style={{ fontSize: "12px" }}>Last updated 5 days ago</p>
                    </div>
                  </MDBCol>
                  
                  <MDBCol sm="12" md="6" lg="4" className="mb-3">
                    <div className={styles["progress-card"]} style={{ borderRadius: "12px", padding: "15px", backgroundColor: "rgba(125, 99, 251, 0.05)" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="mb-0 fw-bold" style={{ color: "#392c7d" }}>Machine Learning</p>
                        <span className="badge" style={{ backgroundColor: "#7d63fb", fontSize: "12px" }}>45%</span>
                      </div>
                      <MDBProgress height="8" style={{ borderRadius: "4px", backgroundColor: "rgba(125, 99, 251, 0.1)" }}>
                        <MDBProgressBar
                          width={45}
                          valuemin={0}
                          valuemax={100}
                          style={{ 
                            backgroundColor: "#7d63fb", 
                            borderRadius: "4px"
                          }}
                        />
                      </MDBProgress>
                      <p className="mb-0 mt-2 text-muted" style={{ fontSize: "12px" }}>Last updated 1 week ago</p>
                    </div>
                  </MDBCol>
                </MDBRow>
                
                <div className="d-flex align-items-center mt-2 mb-3">
                  <div style={{ width: "4px", height: "18px", backgroundColor: "#7d63fb", marginRight: "10px", borderRadius: "2px" }}></div>
                  <h6 className={`mb-0 ${styles["section-title"]}`} style={{ color: "#392c7d", fontWeight: "600" }}>Upcoming Courses</h6>
                </div>
                
                <MDBRow>
                  <MDBCol sm="12" md="6" className="mb-3">
                    <div className={`d-flex align-items-center p-3 ${styles["course-card"]}`} style={{ borderRadius: "12px", border: "1px solid rgba(161, 142, 255, 0.2)" }}>
                      <div className={styles["icon-bg"]} style={{ 
                        backgroundColor: "rgba(125, 99, 251, 0.1)", 
                        borderRadius: "10px", 
                        width: "50px", 
                        height: "50px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        marginRight: "15px"
                      }}>
                        <MDBIcon fas icon="laptop-code" style={{ color: "#7d63fb", fontSize: "20px" }} />
                      </div>
                      <div>
                        <h6 className="mb-0" style={{ color: "#392c7d", fontWeight: "600" }}>Advanced React</h6>
                        <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Starts in 3 days</p>
                      </div>
                    </div>
                  </MDBCol>
                  
                  <MDBCol sm="12" md="6" className="mb-3">
                    <div className={`d-flex align-items-center p-3 ${styles["course-card"]}`} style={{ borderRadius: "12px", border: "1px solid rgba(161, 142, 255, 0.2)" }}>
                      <div className={styles["icon-bg"]} style={{ 
                        backgroundColor: "rgba(125, 99, 251, 0.1)", 
                        borderRadius: "10px", 
                        width: "50px", 
                        height: "50px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginRight: "15px" 
                      }}>
                        <MDBIcon fas icon="database" style={{ color: "#7d63fb", fontSize: "20px" }} />
                      </div>
                      <div>
                        <h6 className="mb-0" style={{ color: "#392c7d", fontWeight: "600" }}>Database Design</h6>
                        <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Starts in 1 week</p>
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
export default ProfilePage;
