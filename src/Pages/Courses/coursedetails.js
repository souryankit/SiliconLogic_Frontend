import { React, useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBCard,
    MDBCardBody,
    MDBProgress,
    MDBProgressBar,
    MDBBadge,
    MDBBtn,
    MDBIcon,
    MDBCollapse,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';

const CourseDetails = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [activeMobileTab, setActiveMobileTab] = useState('overview');
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [progress, setProgress] = useState({
        section1: 20,
        section2: 0,
        section3: 10,
        section4: 5
    });
    const [showSection1, setShowSection1] = useState(false);
    const [showSection2, setShowSection2] = useState(false);

    // Handle window resize for mobile detection
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth < 768);
            }
        };
        
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }
        
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    // Handle section toggle with direct state control for each section
    const toggleSection = (sectionId) => {
        if (sectionId === 'collapseOne') {
            setShowSection1(!showSection1);
        } else if (sectionId === 'course2') {
            setShowSection2(!showSection2);
        }
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

    // Handle mobile tab change
    const handleMobileTabClick = (tabId) => {
        if (activeMobileTab !== tabId) {
            setActiveMobileTab(tabId);
        }
    };

    return (
        <MDBContainer className="course-details-container py-4">            
            <MDBCard className="course-banner mb-4 border-0 shadow-sm">
                <MDBCardBody className={`p-${isMobile ? '3' : '4'}`}>
                    <MDBRow>
                        <MDBCol lg="8"> 
                            <MDBBadge color='primary' className="px-3 py-2 mb-3">VLSI DESIGN VERIFICATION</MDBBadge>
                            
                            <h2 className={`fw-bold mb-3 ${isMobile ? 'fs-4' : ''}`}>The Complete VLSI DV Course 2.0</h2>
                            <p className={`${isMobile ? '' : 'lead'} mb-4`}>
                                Learn Web Development by building 25 websites and mobile apps
                                using HTML, CSS, Javascript, PHP, Python, MySQL & more!
                            </p>
                            
                            <div className={`d-flex ${isMobile ? 'flex-wrap' : ''} course-stats mb-4`}>
                                <div className={`${isMobile ? 'w-50 mb-2' : 'me-4'} d-flex align-items-center`}>
                                    <MDBIcon fas icon="book" className="me-2 text-primary" />
                                    <span>12+ Lessons</span>
                                </div>
                                <div className={`${isMobile ? 'w-50 mb-2' : 'me-4'} d-flex align-items-center`}>
                                    <MDBIcon fas icon="clock" className="me-2 text-primary" />
                                    <span>9hr 30min</span>
                                </div>
                                <div className={`${isMobile ? 'w-100' : ''} d-flex align-items-center`}>
                                    <MDBIcon fas icon="users" className="me-2 text-primary" />
                                    <span>32 students enrolled</span>
                                </div>
                            </div>
                            <div className={`d-flex ${isMobile ? 'flex-column' : 'align-items-center'} instructor-profile mb-3`}>
                                <div className={`instructor-img ${isMobile ? 'mb-2' : 'me-3'}`}>
                                    <img 
                                        src="assets/img/user/user1.jpg" 
                                        alt="Instructor" 
                                        className="rounded-circle"
                                        style={{ width: isMobile ? "50px" : "60px", height: isMobile ? "50px" : "60px", objectFit: "cover" }}
                                    />
                                </div>
                                <div className={isMobile ? 'mb-2' : ''}>
                                    <h5 className="mb-0 fw-bold">Nicole Brown</h5>
                                    <p className="text-muted mb-0">UX/UI Designer</p>
                                </div>
                                <div className={isMobile ? 'mb-3' : 'ms-auto'}>
                                    <div className="d-flex align-items-center">
                                        <div className="rating me-2">
                                            <MDBIcon fas icon="star" className="text-warning" />
                                            <MDBIcon fas icon="star" className="text-warning" />
                                            <MDBIcon fas icon="star" className="text-warning" />
                                            <MDBIcon fas icon="star" className="text-warning" />
                                            <MDBIcon fas icon="star" className="text-muted" />
                                        </div>
                                        <span className="fw-bold">4.5</span>
                                        <span className="text-muted ms-1">(15reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

            {/* Mobile Tabs Navigation */}
            {isMobile && (
                <MDBTabs className='mb-3 nav-fill'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleMobileTabClick('overview')} active={activeMobileTab === 'overview'}>
                            <MDBIcon fas icon="info-circle" className="me-2" /> Overview
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleMobileTabClick('content')} active={activeMobileTab === 'content'}>
                            <MDBIcon fas icon="book" className="me-2" /> Content
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleMobileTabClick('instructor')} active={activeMobileTab === 'instructor'}>
                            <MDBIcon fas icon="user" className="me-2" /> Instructor
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleMobileTabClick('enroll')} active={activeMobileTab === 'enroll'}>
                            <MDBIcon fas icon="shopping-cart" className="me-2" /> Enroll
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
            )}

            <MDBRow>
                <MDBCol lg="8">
                    {/* Desktop view or mobile tabs content */}
                    {!isMobile || (isMobile && activeMobileTab === 'overview') ? (
                        <MDBCard className="mb-4 shadow-sm">
                            <MDBCardBody className={`p-${isMobile ? '3' : '4'}`}>
                                <h4 className="fw-bold mb-3">Overview</h4>
                                <h5 className="text-primary mb-3">Course Description</h5>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining
                                    essentially unchanged.
                                </p>
                                <p>
                                    It was popularised in the 1960s with the release of Letraset
                                    sheets containing Lorem Ipsum passages, and more recently
                                    with desktop publishing software like Aldus PageMaker
                                    including versions of Lorem Ipsum.
                                </p>
                                
                                <h5 className="text-primary mt-4 mb-3">What you'll learn</h5>
                                <MDBRow>
                                    <MDBCol md="6">
                                        <ul className="learning-list">
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                Become a UX designer.
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                You will be able to add UX designer to your CV
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                Become a UI designer.
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                Build & test a full website design.
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                Build & test a full mobile app.
                                            </li>
                                        </ul>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <ul className="learning-list">
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                Learn to design websites & mobile phone apps.
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                You'll learn how to choose colors.
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                Prototype your designs with interactions.
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                Export production ready assets.
                                            </li>
                                            <li>
                                                <MDBIcon fas icon="check-circle" className="me-2 text-success" />
                                                All the techniques used by UX professionals
                                            </li>
                                        </ul>
                                    </MDBCol>
                                </MDBRow>
                                
                                <h5 className="text-primary mt-4 mb-3">Requirements</h5>
                                <ul className="requirements-list mb-0">
                                    <li>
                                        <MDBIcon fas icon="circle" className="me-2 text-primary" size="sm" />
                                        You will need a copy of Adobe XD 2019 or above. A free
                                        trial can be downloaded from Adobe.
                                    </li>
                                    <li>
                                        <MDBIcon fas icon="circle" className="me-2 text-primary" size="sm" />
                                        No previous design experience is needed.
                                    </li>
                                    <li>
                                        <MDBIcon fas icon="circle" className="me-2 text-primary" size="sm" />
                                        No previous Adobe XD skills are needed.
                                    </li>
                                </ul>
                            </MDBCardBody>
                        </MDBCard>
                    ) : null}

                    {!isMobile || (isMobile && activeMobileTab === 'content') ? (
                        <MDBCard className="mb-4 shadow-sm">
                            <MDBCardBody className={`p-${isMobile ? '3' : '4'}`}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold mb-0">Course Content</h4>
                                    <span className="text-muted">{isMobile ? null : '92 Lectures 10:56:11'}</span>
                                </div>
                                
                                <div className="mb-4">
                                    <MDBProgress height='10'>
                                        <MDBProgressBar width='15' valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="text-muted">Course Progress</span>
                                        <span className="text-primary fw-bold">15% Complete</span>
                                    </div>
                                </div>
                                
                                {/* Section 1 */}
                                <div className="course-section mb-3">
                                    <div className="section-header">
                                        <div
                                            className={`d-flex justify-content-between align-items-center p-3 rounded ${activeSection === 'collapseOne' ? 'active-section' : ''}`}
                                            onClick={() => toggleSection('collapseOne')}
                                            style={{ cursor: 'pointer' }}
                                            role="button"
                                            tabIndex={0}
                                            aria-expanded={showSection1}
                                        >
                                            <div className={isMobile ? 'w-75' : ''}>
                                                <MDBIcon fas icon={showSection1 ? 'angle-down' : 'angle-right'} className="me-2" />
                                                <span className="fw-bold">Section 1: Introduction to User Experience</span>
                                            </div>
                                            <div className={`section-stats ${isMobile ? 'small' : ''}`}>
                                                {isMobile ? (
                                                    <span><MDBIcon fas icon="book" className="me-1" /> 5</span>
                                                ) : (
                                                    <>
                                                        <span className="me-3"><MDBIcon fas icon="clock" className="me-1" /> 22:53</span>
                                                        <span><MDBIcon fas icon="book" className="me-1" /> 5 Lectures</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Direct conditional rendering instead of MDBCollapse */}
                                    {showSection1 && (
                                        <div className="section-content p-3">
                                            <div className="section-progress mb-3">
                                                <MDBProgress height='6'>
                                                    <MDBProgressBar width={progress.section1} valuemin={0} valuemax={100} />
                                                </MDBProgress>
                                                <div className="d-flex justify-content-end mt-1">
                                                    <span className="small text-muted">{progress.section1}% Complete</span>
                                                </div>
                                            </div>
                                            <ul className="lecture-list p-0 m-0">
                                                <li className="lecture-item completed">
                                                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                                                        <div className="lecture-title">
                                                            <MDBIcon fas icon="play-circle" className="me-2 text-success" />
                                                            Lecture 1.1: Introduction to the User Experience Course
                                                            <MDBBadge color='success' pill className="ms-2">Completed</MDBBadge>
                                                        </div>
                                                        <div className={`lecture-actions ${isMobile ? 'mt-2' : ''}`}>
                                                            <MDBBtn color='light' size='sm' className="me-2">Preview</MDBBtn>
                                                            <span className="lecture-duration">02:53</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="lecture-item completed">
                                                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                                                        <div className="lecture-title">
                                                            <MDBIcon fas icon="play-circle" className="me-2 text-success" />
                                                            Lecture 1.2: Exercise: Your first design challenge
                                                            <MDBBadge color='success' pill className="ms-2">Completed</MDBBadge>
                                                        </div>
                                                        <div className={`lecture-actions ${isMobile ? 'mt-2' : ''}`}>
                                                            <MDBBtn color='light' size='sm' className="me-2">Preview</MDBBtn>
                                                            <span className="lecture-duration">02:53</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="lecture-item current">
                                                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                                                        <div className="lecture-title">
                                                            <MDBIcon fas icon="play-circle" className="me-2 text-primary" />
                                                            Lecture 1.3: How to solve the previous exercise
                                                            <MDBBadge color='primary' pill className="ms-2">In Progress</MDBBadge>
                                                        </div>
                                                        <div className={`lecture-actions ${isMobile ? 'mt-2' : ''}`}>
                                                            <MDBBtn color='primary' size='sm' className="me-2">Continue</MDBBtn>
                                                            <span className="lecture-duration">02:53</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="lecture-item">
                                                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                                                        <div className="lecture-title">
                                                            <MDBIcon fas icon="play-circle" className="me-2" />
                                                            Lecture 1.4: Applying design principles
                                                        </div>
                                                        <div className={`lecture-actions ${isMobile ? 'mt-2' : ''}`}>
                                                            <MDBBtn color='light' size='sm' className="me-2">Preview</MDBBtn>
                                                            <span className="lecture-duration">02:53</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="lecture-item">
                                                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                                                        <div className="lecture-title">
                                                            <MDBIcon fas icon="play-circle" className="me-2" />
                                                            Lecture 1.5: How to use text layers effectively
                                                        </div>
                                                        <div className={`lecture-actions ${isMobile ? 'mt-2' : ''}`}>
                                                            <MDBBtn color='light' size='sm' className="me-2">Preview</MDBBtn>
                                                            <span className="lecture-duration">02:53</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="lecture-item resource">
                                                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                                                        <div className="lecture-title">
                                                            <MDBIcon fas icon="file-download" className="me-2 text-info" />
                                                            Resources: Section 1 Materials
                                                        </div>
                                                        <div className={`lecture-actions ${isMobile ? 'mt-2' : ''}`}>
                                                            <MDBBtn color='info' size='sm' className="me-2">Download</MDBBtn>
                                                            <span className="lecture-duration">4.2MB</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Section 2 */}
                                <div className="course-section mb-3">
                                    <div className="section-header">
                                        <div
                                            className={`d-flex justify-content-between align-items-center p-3 rounded ${activeSection === 'course2' ? 'active-section' : ''}`}
                                            onClick={() => toggleSection('course2')}
                                            style={{ cursor: 'pointer' }}
                                            role="button"
                                            tabIndex={0}
                                            aria-expanded={showSection2}
                                        >
                                            <div className={isMobile ? 'w-75' : ''}>
                                                <MDBIcon fas icon={showSection2 ? 'angle-down' : 'angle-right'} className="me-2" />
                                                <span className="fw-bold">Section 2: The Brief of VLSI Technology</span>
                                            </div>
                                            <div className={`section-stats ${isMobile ? 'small' : ''}`}>
                                                {isMobile ? (
                                                    <span><MDBIcon fas icon="book" className="me-1" /> 5</span>
                                                ) : (
                                                    <>
                                                        <span className="me-3"><MDBIcon fas icon="clock" className="me-1" /> 18:45</span>
                                                        <span><MDBIcon fas icon="book" className="me-1" /> 5 Lectures</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Direct conditional rendering instead of MDBCollapse */}
                                    {showSection2 && (
                                        <div className="section-content p-3">
                                            <div className="section-progress mb-3">
                                                <MDBProgress height='6'>
                                                    <MDBProgressBar width={progress.section2} valuemin={0} valuemax={100} />
                                                </MDBProgress>
                                                <div className="d-flex justify-content-end mt-1">
                                                    <span className="small text-muted">{progress.section2}% Complete</span>
                                                </div>
                                            </div>
                                            <ul className="lecture-list p-0 m-0">
                                                <li className="lecture-item">
                                                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                                                        <div className="lecture-title">
                                                            <MDBIcon fas icon="play-circle" className="me-2" />
                                                            Lecture 2.1: Introduction to VLSI Technology
                                                        </div>
                                                        <div className={`lecture-actions ${isMobile ? 'mt-2' : ''}`}>
                                                            <MDBBtn color='light' size='sm' className="me-2">Preview</MDBBtn>
                                                            <span className="lecture-duration">03:45</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    ) : null}

                    {!isMobile || (isMobile && activeMobileTab === 'instructor') ? (
                        <MDBCard className="mb-4 shadow-sm">
                            <MDBCardBody className={`p-${isMobile ? '3' : '4'}`}>
                                <h4 className="fw-bold mb-3">About the instructor</h4>
                                <div className={`d-flex ${isMobile ? 'flex-column' : 'align-items-center'} mb-4`}>
                                    <img 
                                        src="assets/img/user/user1.jpg" 
                                        alt="Instructor" 
                                        className={`rounded-circle ${isMobile ? 'mb-3 mx-auto' : 'me-3'}`}
                                        style={{ width: isMobile ? "100px" : "80px", height: isMobile ? "100px" : "80px", objectFit: "cover" }}
                                    />
                                    <div className={isMobile ? 'text-center mb-3' : ''}>
                                        <h5 className="mb-1">Nicole Brown</h5>
                                        <p className="text-muted mb-1">UX/UI Designer</p>
                                        <div className={`d-flex align-items-center ${isMobile ? 'justify-content-center' : ''}`}>
                                            <div className="rating me-2">
                                                <MDBIcon fas icon="star" className="text-warning" />
                                                <MDBIcon fas icon="star" className="text-warning" />
                                                <MDBIcon fas icon="star" className="text-warning" />
                                                <MDBIcon fas icon="star" className="text-warning" />
                                                <MDBIcon fas icon="star" className="text-muted" />
                                            </div>
                                            <span>4.5 Instructor Rating</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`instructor-stats d-flex flex-wrap mb-4 ${isMobile ? 'justify-content-between' : ''}`}>
                                    <div className={`${isMobile ? 'w-50 mb-2' : 'me-4 mb-2'} d-flex align-items-center`}>
                                        <MDBIcon fas icon="video" className="me-2 text-primary" />
                                        <span>5 Courses</span>
                                    </div>
                                    <div className={`${isMobile ? 'w-50 mb-2' : 'me-4 mb-2'} d-flex align-items-center`}>
                                        <MDBIcon fas icon="book" className="me-2 text-primary" />
                                        <span>12+ Lessons</span>
                                    </div>
                                    <div className={`${isMobile ? 'w-50 mb-2' : 'me-4 mb-2'} d-flex align-items-center`}>
                                        <MDBIcon fas icon="clock" className="me-2 text-primary" />
                                        <span>9hr 30min</span>
                                    </div>
                                    <div className={`${isMobile ? 'w-50 mb-2' : 'mb-2'} d-flex align-items-center`}>
                                        <MDBIcon fas icon="users" className="me-2 text-primary" />
                                        <span>{isMobile ? '270K students' : '270,866 students enrolled'}</span>
                                    </div>
                                </div>
                                
                                <p>
                                    UI/UX Designer, with 7+ Years Experience. Guarantee of High
                                    Quality Work.
                                </p>
                                <p>
                                    Skills: Web Design, UI Design, UX/UI Design, Mobile Design,
                                    User Interface Design, Sketch, Photoshop, GUI, Html, Css,
                                    Grid Systems, Typography, Minimal, Template, English,
                                    Bootstrap, Responsive Web Design, Pixel Perfect, Graphic
                                    Design, Corporate, Creative, Flat, Luxury and much more.
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    ) : null}
                </MDBCol>
                
                {/* Sidebar/Enrollment section */}
                {(!isMobile || (isMobile && activeMobileTab === 'enroll')) && (
                    <MDBCol lg="4">
                        <MDBCard className={`${isMobile ? 'mb-4' : 'mb-4 shadow-sm'} course-sidebar`}>
                            <MDBCardBody className={`p-${isMobile ? '3' : '4'}`}>
                                <div className="text-center mb-4">
                                    <h3 className="fw-bold mb-3">FREE</h3>
                                    <p className="text-muted"><span className="text-decoration-line-through">$99.00</span> <span className="text-success fw-bold">50% off</span></p>
                                    <MDBBtn color='primary' className="w-100 mb-3">
                                        <MDBIcon fas icon="graduation-cap" className="me-2" />
                                        Enroll Now
                                    </MDBBtn>
                                    <div className="d-flex justify-content-between mt-3">
                                        <MDBBtn color='light' className="flex-grow-1 me-2">
                                            <MDBIcon far icon="heart" className={isMobile ? '' : 'me-1'} />
                                            {isMobile ? '' : 'Wishlist'}
                                        </MDBBtn>
                                        <MDBBtn color='light' className="flex-grow-1">
                                            <MDBIcon fas icon="share" className={isMobile ? '' : 'me-1'} />
                                            {isMobile ? '' : 'Share'}
                                        </MDBBtn>
                                    </div>
                                </div>
                                
                                <div className="course-includes mb-4">
                                    <h5 className="fw-bold mb-3">This course includes:</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex align-items-center">
                                            <MDBIcon fas icon="video" className="me-3 text-primary" />
                                            <span>11 hours on-demand video</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-center">
                                            <MDBIcon fas icon="file" className="me-3 text-primary" />
                                            <span>69 downloadable resources</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-center">
                                            <MDBIcon fas icon="infinity" className="me-3 text-primary" />
                                            <span>Full lifetime access</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-center">
                                            <MDBIcon fas icon="mobile-alt" className="me-3 text-primary" />
                                            <span>Access on mobile and TV</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-center">
                                            <MDBIcon fas icon="tasks" className="me-3 text-primary" />
                                            <span>Assignments</span>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <MDBIcon fas icon="certificate" className="me-3 text-primary" />
                                            <span>Certificate of Completion</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="course-features">
                                    <h5 className="fw-bold mb-3">Course Features</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex justify-content-between">
                                            <span><MDBIcon fas icon="users" className="me-2 text-primary" /> Enrolled:</span>
                                            <span className="fw-bold">32 students</span>
                                        </li>
                                        <li className="mb-3 d-flex justify-content-between">
                                            <span><MDBIcon fas icon="clock" className="me-2 text-primary" /> Duration:</span>
                                            <span className="fw-bold">20 hours</span>
                                        </li>
                                        <li className="mb-3 d-flex justify-content-between">
                                            <span><MDBIcon fas icon="book" className="me-2 text-primary" /> Chapters:</span>
                                            <span className="fw-bold">15</span>
                                        </li>
                                        <li className="mb-3 d-flex justify-content-between">
                                            <span><MDBIcon fas icon="video" className="me-2 text-primary" /> Video:</span>
                                            <span className="fw-bold">12 hours</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span><MDBIcon fas icon="signal" className="me-2 text-primary" /> Level:</span>
                                            <span className="fw-bold">Beginner</span>
                                        </li>
                                    </ul>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )}
            </MDBRow>
            
            {/* Fixed bottom navigation for mobile */}
            {isMobile && (
                <div className="fixed-bottom bg-white shadow-lg p-2 d-flex justify-content-between">
                    <MDBBtn color='light' size='sm'>
                        <MDBIcon fas icon="arrow-left" className="me-1" /> Previous
                    </MDBBtn>
                    <MDBBtn color='primary' size='sm'>
                        Continue <MDBIcon fas icon="arrow-right" className="ms-1" />
                    </MDBBtn>
                </div>
            )}         
        </MDBContainer>
    );
};

export default CourseDetails;
