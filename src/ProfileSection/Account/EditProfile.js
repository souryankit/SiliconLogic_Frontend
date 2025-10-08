import React, { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { Camera, LogOut, Edit2, Trash, GitHub, Paperclip } from "react-feather";
import { Link, Navigate } from "react-router-dom";
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

import InputControl from "./Auth/InputControl/InputControl";
import Spinner from "./Auth/Spinner/Spinner";
import ProjectForm from "../Archives/Myproject/ProjectForm/ProjectForm";

import {
  auth,
  uploadImage,
  updateUserDatabase,
  getAllProjectsForUser,
  deleteProject,
} from "../../Utils/firebase";

import styles from "./edit.module.css";

function EditProfile(props) {

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
  const [userProfileValues, setUserProfileValues] = useState({
    name: userDetails.name || "",
    username: userDetails.username || "",
    designation: userDetails.designation || "",
    mobile: userDetails.mobile || "",
    email: userDetails.email || "",
    institute: userDetails.institute || "",
    address: userDetails.address || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
    website: userDetails.website ||"",
    bio: userDetails.bio || "",
  });
  const [showSaveDetailsButton, setShowSaveDetailsButton] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  // const [isEditProjectModal, setIsEditProjectModal] = useState(false);
  // const [editProject, setEditProject] = useState({});

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

  const handleInputChange = (event, property) => {
    setShowSaveDetailsButton(true);

    setUserProfileValues((prev) => ({
      ...prev,
      [property]: event.target.value,
    }));
  };

  const saveDetailsToDatabase = async () => {
    if (!userProfileValues.name) {
      setErrorMessage("Name required");
      return;
    }

    setSaveButtonDisabled(true);
    await updateUserDatabase({ ...userProfileValues }, userDetails.uid);
    setSaveButtonDisabled(false);
    setShowSaveDetailsButton(false);
  };

  const fetchAllProjects = async () => {
    const result = await getAllProjectsForUser(userDetails.uid);
    if (!result) {
      setProjectsLoaded(true);
      return;
    }
    setProjectsLoaded(true);

    let tempProjects = [];
    result.forEach((doc) => tempProjects.push({ ...doc.data(), pid: doc.id }));
    setProjects(tempProjects);
  };


  useEffect(() => {
    fetchAllProjects();
  }, []);

  return isAuthenticated ? (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span>{userProfileValues.name}</span>
        </p>

        <div className={styles.logout} onClick={handleLogout}>
          <LogOut /> Logout
        </div>
      </div> */}
        <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-light rounded-3 p-3 mt-4 mr-4">
            <MDBBreadcrumbItem>
              <Link to="/dashboard">User</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <Link to="/dashboard/account">Account</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>Edit Profile</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow>
      <input
        ref={imagePicker}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div className={styles.section}>
        {/* <div className={styles.title}>Your profile</div> */}
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={profileImageUrl} alt="Profile image" />
              <div className={styles.camera} onClick={handleCameraClick}>
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
          <div className={styles.right}>
            <div className={styles.row}>
              <InputControl
                label="Name"
                placeholder="Enter your Name"
                value={userProfileValues.name}
                onChange={(event) => handleInputChange(event, "name")}
              />
               <InputControl
                label="UserName"
                placeholder="Enter your Name"
                value={userProfileValues.username}
                onChange={(event) => handleInputChange(event, "username")}
              />
              </div>
              <div className={styles.row}>
               <InputControl
                label="Email"
                placeholder="Enter your Email-Id"
                value={userProfileValues.email}
                onChange={(event) => handleInputChange(event, "email")}
              />
               <InputControl
                label="Mobile"
                placeholder="Enter your Mobile No."
                value={userProfileValues.mobile}
                onChange={(event) => handleInputChange(event, "mobile")}
              />
              <InputControl
                label="Designation"
                placeholder="eg. Full stack developer"
                value={userProfileValues.designation}
                onChange={(event) => handleInputChange(event, "designation")}
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Github"
                placeholder="Enter your github link"
                value={userProfileValues.github}
                onChange={(event) => handleInputChange(event, "github")}
              />
              <InputControl
                label="Linkedin"
                placeholder="Enter your linkedin link"
                value={userProfileValues.linkedin}
                onChange={(event) => handleInputChange(event, "linkedin")}
              />
              <InputControl
                label="Website"
                placeholder="Enter your website link"
                value={userProfileValues.website}
                onChange={(event) => handleInputChange(event, "website")}
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Institution"
                placeholder="Enter your institution name"
                value={userProfileValues.institute}
                onChange={(event) => handleInputChange(event, "institute")}
              />
              <InputControl
                label="address"
                placeholder="Enter your current address"
                value={userProfileValues.address}
                onChange={(event) => handleInputChange(event, "address")}
              />
            </div>
         
            <div className={styles.row}>
              <InputControl
                label="Bio"
                placeholder="Enter your bio"
                value={userProfileValues.bio}
                onChange={(event) => handleInputChange(event, "bio")}
              />
            </div>
            
            <div className={styles.footer}>
              <p className={styles.error}>{errorMessage}</p>
              {showSaveDetailsButton && (
                <Link to= "/dashboard/account"
                  disabled={saveButtonDisabled}
                  className={styles.button}
                  onClick={saveDetailsToDatabase}
                >
                  Save Details
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default EditProfile;
