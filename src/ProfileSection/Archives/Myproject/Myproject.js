import React, { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { Camera, LogOut, Edit2, Trash, GitHub, Paperclip, Search, Filter, Plus } from "react-feather";
import { Link, Navigate } from "react-router-dom";

import InputControl from "../../Account/Auth/InputControl/InputControl";
import Spinner from "../../Account/Auth/Spinner/Spinner";
import ProjectForm from "./ProjectForm/ProjectForm";
import ProjectModal from "./ProjectModal/ProjectModal";
import { getAllProjects } from "../../../Utils/firebase";

import {
  auth,
  uploadImage,
  updateUserDatabase,
  getAllProjectsForUser,
  deleteProject,
} from "../../../Utils/firebase";

import styles from "./Myproject.module.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

function Myproject(props) {
  const userDetails = props.userDetails;
  const isAuthenticated = props.auth;
  const imagePicker = useRef();

  const [progress, setProgress] = useState(0);
  const [profileImageUploadStarted, setProfileImageUploadStarted] =
    useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(
    userDetails.profileImage || "./DP.jpg"
  );
  const [userProfileValues, setUserProfileValues] = useState({
    name: userDetails.name || "",
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
  });
  // const [showSaveDetailsButton, setShowSaveDetailsButton] = useState(false);
  // const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isEditProjectModal, setIsEditProjectModal] = useState(false);
  const [editProject, setEditProject] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleProjectCardClick = (project) => {
    setShowProjectModal(true);
    setProjectDetails(project);
  };
  const fetchAllProjects = async () => {
    try {
      setError("");
      const result = await getAllProjectsForUser(userDetails.uid);
      if (!result) {
        setProjectsLoaded(true);
        return;
      }
      setProjectsLoaded(true);

      let tempProjects = [];
      result.forEach((doc) => tempProjects.push({ ...doc.data(), pid: doc.id }));
      setProjects(tempProjects);
    } catch (err) {
      setError("Failed to load projects. Please try again.");
      setProjectsLoaded(true);
      console.error("Error fetching projects:", err);
    }
  };

  const handleEditClick = (project) => {
    setIsEditProjectModal(true);
    setEditProject(project);
    setShowProjectForm(true);
  };

  const handleDeletion = async (pid) => {
    try {
      await deleteProject(pid);
      fetchAllProjects();
    } catch (err) {
      setError("Failed to delete project. Please try again.");
      console.error("Error deleting project:", err);
    }
  };

  // Filter and search projects
  useEffect(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.overview.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, filterStatus]);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return isAuthenticated ? (
    <div className={styles.myProjects}>
      {showProjectModal && (
        <ProjectModal
          onClose={() => setShowProjectModal(false)}
          details={projectDetails}
        />
      )}

      {showProjectForm && (
        <ProjectForm
          onSubmission={fetchAllProjects}
          onClose={() => setShowProjectForm(false)}
          uid={userDetails.uid}
          isEdit={isEditProjectModal}
          default={editProject}
        />
      )}

      <div className={styles.header}>
        <h1>My Projects</h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowProjectForm(true)}
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={() => setError("")} className={styles.errorClose}>×</button>
        </div>
      )}

      <div className={styles.projectsGrid}>
        {!projectsLoaded ? (
          <div className={styles.loadingState}>
            <Spinner />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <p>{searchTerm ? `No projects found matching "${searchTerm}"` : "No projects found. Create your first project!"}</p>
          </div>
        ) : (
          filteredProjects.map((item, index) => (
            <div className={styles.projectCard} key={item.title + index}>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle} onClick={() => handleProjectCardClick(item)}>
                  {item.title}
                </h3>
                <div className={styles.actions}>
                  <button 
                    className={styles.actionButton}
                    onClick={() => handleEditClick(item)}
                    title="Edit project"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className={styles.actionButton}
                    onClick={() => handleDeletion(item.pid)}
                    title="Delete project"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.overview}>{item.overview}</p>
                {item.thumbnail && (
                  <div className={styles.projectImage}>
                    <img
                      src={item.thumbnail}
                      alt="Project thumbnail"
                      onClick={() => handleProjectCardClick(item)}
                    />
                  </div>
                )}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.links}>
                  <Link target="_blank" to={`//${item.github}`} className={styles.linkButton}>
                    <GitHub size={16} />
                    <span>GitHub</span>
                  </Link>
                  {item.link && (
                    <Link target="_blank" to={`//${item.link}`} className={styles.linkButton}>
                      <Paperclip size={16} />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Myproject;
