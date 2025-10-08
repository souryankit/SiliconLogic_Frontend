import { React, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';


function MyCourse() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    return (
        <div>

            <MDBRow>
                <MDBCol>
                    <MDBBreadcrumb className="bg-light rounded-3 p-2 mt-2 mr-2">
                        <MDBBreadcrumbItem><Link to="/dashboard">User</Link></MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>My Learning</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBCol>
            </MDBRow>

            <div className="container " style={{ backgroundColor: '#eee' }} >
                <div class="col-xr-12 py-2">
                    <div class=" card-info">
                        <div class="checkout-form pb-0">

                            <div className="row d-flex" >
                                <div className="col-8 pb-4"  >
                                    <div className="row tabp">
                                        <div className="col">
                                            <div className={toggleState === 1 ? "tabp active-tabs" : "tabp"}
                                                onClick={() => toggleTab(1)} > Enrolled Courses (06)</div>
                                        </div>
                                        <div className="col">
                                            <div className={toggleState === 2 ? "tabp active-tabs" : "tabp"}
                                                onClick={() => toggleTab(2)}> Active Courses (03)</div>
                                        </div>
                                        <div className="col">
                                            <div className={toggleState === 3 ? "tabp active-tabs" : "tabp"}
                                                onClick={() => toggleTab(3)} > Completed Courses (03)</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="enroll-courses">
                                    <div class="row">

                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-02.jpg"></img>
                                                        </a>
                                                        <div class="price">
                                                            <h3>₹80 <span>₹99.00</span></h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user2.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Cooper</a>
                                                                    </h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#rate"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><Link to="/dashboard/courseplayer">Wordpress for
                                                            Beginners - Master Wordpress Quickly</Link></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>12+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>70hr 30min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <span class="d-inline-block average-rating"><span>5.0</span>
                                                                (20)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-03.jpg"></img>
                                                        </a>
                                                        <div class="price combo">
                                                            <h3>FREE</h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user5.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Jenny</a>
                                                                    </h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Sketch from A to Z
                                                            (2024): Become an app designer</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>10+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>40hr 10min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>3.0</span>
                                                                (18)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-04.jpg"></img>
                                                        </a>
                                                        <div class="price">
                                                            <h3>₹65 <span>₹70.00</span></h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user4.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Nicole
                                                                        Brown</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Learn Angular
                                                            Fundamentals From beginning to advance lavel</a>
                                                        </h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>15+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>80hr 40min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>4.0</span>
                                                                (10)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-05.jpg"></img>
                                                        </a>
                                                        <div class="price combo">
                                                            <h3>FREE</h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user3.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">John
                                                                        Smith</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Build Responsive Real
                                                            World Websites with Crash Course</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>12+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>70hr 30min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>4.0</span>
                                                                (15)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-07.jpg"></img>
                                                        </a>
                                                        <div class="price">
                                                            <h3>₹70 <span>₹80.00</span></h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user6.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Stella
                                                                        Johnson</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Learn JavaScript and
                                                            Express to become a Expert</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>15+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>70hr 30min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>4.6</span>
                                                                (15)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-08.jpg"></img>
                                                        </a>
                                                        <div class="price combo">
                                                            <h3>FREE</h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user1.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Nicole
                                                                        Brown</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Introduction to
                                                            Programming- Python & Java</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>10+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>70hr 30min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <span class="d-inline-block average-rating"><span>5.0</span>
                                                                (13)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="active-courses">
                                    <div class="row">

                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-04.jpg"></img>
                                                        </a>
                                                        <div class="price">
                                                            <h3>₹65 <span>₹70.00</span></h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user4.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Nicole
                                                                        Brown</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Learn Angular
                                                            Fundamentals From beginning to advance lavel</a>
                                                        </h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>15+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>80hr 40min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>4.0</span>
                                                                (10)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-07.jpg"></img>
                                                        </a>
                                                        <div class="price">
                                                            <h3>₹70 <span>₹80.00</span></h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user6.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Stella
                                                                        Johnson</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Learn JavaScript and
                                                            Express to become a Expert</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>15+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>70hr 30min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>4.6</span>
                                                                (15)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-08.jpg"></img>
                                                        </a>
                                                        <div class="price combo">
                                                            <h3>FREE</h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user1.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Nicole
                                                                        Brown</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Introduction to
                                                            Programming- Python & Java</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>10+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>70hr 30min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <span class="d-inline-block average-rating"><span>5.0</span>
                                                                (13)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="complete-courses">
                                    <div class="row">

                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-03.jpg"></img>
                                                        </a>
                                                        <div class="price combo">
                                                            <h3>FREE</h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user5.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Jenny</a>
                                                                    </h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Sketch from A to Z
                                                            (2024): Become an app designer</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>10+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>40hr 10min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>3.0</span>
                                                                (18)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-04.jpg"></img>
                                                        </a>
                                                        <div class="price">
                                                            <h3>₹65 <span>₹70.00</span></h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user4.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Nicole
                                                                        Brown</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Learn Angular
                                                            Fundamentals From beginning to advance lavel</a>
                                                        </h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>15+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>80hr 40min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>4.0</span>
                                                                (10)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xxl-4 col-md-6 d-flex">
                                            <div class="course-box flex-fill">
                                                <div class="product">
                                                    <div class="product-img">
                                                        <a href="course-details.html">
                                                            <img class="img-fluid" alt="Img" src="/course/course-07.jpg"></img>
                                                        </a>
                                                        <div class="price">
                                                            <h3>₹70 <span>₹80.00</span></h3>
                                                        </div>
                                                    </div>
                                                    <div class="product-content">
                                                        <div class="course-group d-flex">
                                                            <div class="course-group-img d-flex">
                                                                <a href="instructor-profile.html"><img src="/user/user6.jpg" alt="Img" class="img-fluid"></img></a>
                                                                <div class="course-name">
                                                                    <h4><a href="instructor-profile.html">Stella
                                                                        Johnson</a></h4>
                                                                    <p>Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div class="course-share d-flex align-items-center justify-content-center">
                                                                <a href="#"><i class="fa fa-heart"></i></a>
                                                            </div>
                                                        </div>
                                                        <h3 class="title instructor-text"><a href="course-details.html">Learn JavaScript and
                                                            Express to become a Expert</a></h3>
                                                        <div class="course-info d-flex align-items-center">
                                                            <div class="rating-img d-flex align-items-center">
                                                                <img src="/icon/icon-01.svg" alt="Img"></img>
                                                                <p>15+ Lesson</p>
                                                            </div>
                                                            <div class="course-view d-flex align-items-center">
                                                                <img src="/icon/icon-02.svg" alt="Img"></img>
                                                                <p>70hr 30min</p>
                                                            </div>
                                                        </div>
                                                        <div class="rating mb-0">
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star filled"></i>
                                                            <i class="fas fa-star"></i>
                                                            <span class="d-inline-block average-rating"><span>4.6</span>
                                                                (15)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="pagination lms-page">
                                <li class="page-item prev">
                                    <a class="page-link" href="javascript:void(0)" tabindex="-1">
                                        <i class="fas fa-angle-left"></i>
                                    </a>
                                </li>
                                <li class="page-item first-page active">
                                    <a class="page-link" href="javascript:void(0)">
                                        1
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="javascript:void(0)">
                                        2
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="javascript:void(0)">
                                        3
                                    </a>
                                </li>
                                <li class="page-item next">
                                    <a class="page-link" href="javascript:void(0)">
                                        <i class="fas fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyCourse;
