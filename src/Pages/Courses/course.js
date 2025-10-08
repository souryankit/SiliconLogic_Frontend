import { React, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './course.module.css';
import './coursesBasic.css';
function Course() {
  const [toggleState, setToggleState] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Use the scroll animation hook
  useScrollAnimation();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <section class="container">
      <h2 className={`pagetitle ${styles['course-category-title']}`}>
        <b>Courses</b>
      </h2>

      <div class="row">
        <div class="col-lg-12">
          <div className="showing-list">
            <div class="row">
              <div class="col-lg-6">
                <div className="d-flex align-items-center">
                  <div class="view-icons">
                    <a href="course-grid.html" class="grid-view active">
                      <i class="fa fa-table"></i>
                    </a>
                    {/* <a href="course-list.html" class="list-view">
                      <i class="fa fa-list "></i>
                    </a> */}
                  </div>
                  <div className="show-result">
                    <h4>Showing 1-9 of 50 results</h4>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="show-filter add-course-info">
                  <form action="#">
                    <div class="row">
                      <div class="col-md-6 align-items-center">
                        <div class="row d-flex">
                          <div class="col  col-item">
                            <div class="input-block select-form mb-0">
                              <select
                                class="form-select select"
                                id="sel1"
                                name="sellist1"
                              >
                                <option>Popular</option>
                                <option>Recently Added</option>
                                <option>Relavent</option>
                                <option>Most Demanded</option>
                              </select>
                            </div>
                          </div>
                          <div class="col col-item">
                            <div class="search-group">
                              <i class="feather-search"></i>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Search Courses"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col  align-items-center">
                        <div class="clear-filter d-flex align-items-center">
                          <div>
                            <button type="button" class="btn btn-link" onClick={toggleFilters}>
                              <i class="fa fa-filter">Filter</i>
                            </button>
                          </div>
                          {showFilters && (
                            <div class="clear-text" type="button" onClick={toggleFilters}>
                              <p>Close</p>
                            </div>)}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class={`col-lg-${showFilters ? '9' : '12'}`}>


          <div class="row">
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class={`course-box course-design d-flex ${styles['course-box']}`}>
                <div class={`product ${styles['product']}`}>
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-10.jpg"
                      />
                    </a>
                    <div class={`price ${styles['price']}`}>
                      <h3>
                        ₹300 <span>₹99.00</span>
                      </h3>
                    </div>
                  </div>
                  <div class={`product-content ${styles['course-content']}`}>
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user1.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Ankit Kumar</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class={`title ${styles['course-title']}`}>
                      <a href="course-details.html">
                        Introduction To VLSI Technology
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-08.jpg"
                      />
                    </a>
                    <div class="price">
                      <h3>
                        ₹200 <span>₹99.00</span>
                      </h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user2.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Ankit Kumar</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To Mobile Communication Technology
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-12.jpg"
                      />
                    </a>
                    <div class="price">
                      <h3 class="free-color">FREE</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user3.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Nitish Jha Vats</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To Embedded Systems
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/AIpic.jpeg"
                      />
                    </a>
                    <div class="price">
                      <h3 class="free-color">FREE</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user4.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Ankit Kumar</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate" class="active-heart">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To Artificial Intelligence
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-14.jpg"
                      />
                    </a>
                    <div class="price">
                      <h3>₹29.99</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user5.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Amit Mishra</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate" class="active-heart">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To Digital Signal Processing
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-15.jpg"
                      />
                    </a>
                    <div class="price">
                      <h3>
                        ₹300 <span>₹99.00</span>
                      </h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user6.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Nitish Jha Vats</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate" class="active-heart">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To Embedded Systems
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-16.jpg"
                      />
                    </a>
                    <div class="price">
                      <h3>
                        ₹200 <span>₹99.00</span>
                      </h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user4.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Amit Mishra</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To Mobile Communication Technology
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-13.jpg"
                      />
                    </a>
                    <div class="price">
                      <h3>
                        ₹300 <span>₹99.00</span>
                      </h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user4.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Nitish Jha Vats</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To IOT Systems
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class={`col-lg-${showFilters ? '4' : '3'} col-md-6 d-flex`}>
              <div class="course-box course-design d-flex">
                <div class="product">
                  <div class="product-img">
                    <a href="course-details.html">
                      <img
                        class="img-fluid"
                        alt="Img"
                        src="/course/course-10.jpg"
                      />
                    </a>
                    <div class="price">
                      <h3 class="free-color">FREE</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="course-group d-flex">
                      <div class="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/user/user6.jpg"
                            alt="Img"
                            class="img-fluid"
                          />
                        </a>
                        <div class="course-name">
                          <h4>
                            <a href="instructor-profile.html">Vamika</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 class="title">
                      <a href="course-details.html">
                        Introduction To VLSI Technology (Part-2)
                      </a>
                    </h3>
                    <div class="course-info d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">
                          <span>4.0</span> (15)
                        </span>
                      </div>
                      <div class="all-btn all-category d-flex align-items-center">
                        <Link to="/coursedetails" class="btn btn-primary">
                          View Details
                          </Link>
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
                <li class="page-item">
                  <a class="page-link" href="javascript:void(0)">
                    4
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="javascript:void(0)">
                    5
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

        <div class="col-lg-3 ">
          <div class="filter-clear">
            
            {showFilters && (
              <>
                <div class="card search-filter">
                  <div class="card-body">
                    <div class="filter-widget mb-0">
                      <div class="categories-head d-flex align-items-center">
                        <h4>Course categories</h4>
                        <i class="fas fa-angle-down"></i>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" checked />
                          <span class="checkmark"></span> VLSI (3)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" checked />
                          <span class="checkmark"></span> Embedded Systems (2)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> AI (2)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> IoT (2)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> Mobile Comm. (2)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> Signal Processing (2)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> Programming Language (3)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check mb-0">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> General Tech (2)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card search-filter">
                  <div class="card-body">
                    <div class="filter-widget mb-0">
                      <div class="categories-head d-flex align-items-center">
                        <h4>Instructors</h4>
                        <i class="fas fa-angle-down"></i>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> Ankit Kumar (10)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> Amit Mishra (5)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span class="checkmark"></span> Nitish Jha Vats (3)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check mb-0">
                          <input type="checkbox" name="select_specialist" checked />
                          <span class="checkmark"></span> All
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card search-filter">
                  <div class="card-body">
                    <div class="filter-widget mb-0">
                      <div class="categories-head d-flex align-items-center">
                        <h4>Price</h4>
                        <i class="fas fa-angle-down"></i>
                      </div>
                      <div>
                        <label class="custom_check custom_one">
                          <input type="radio" name="select_specialist" />
                          <span class="checkmark"></span> All (18)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check custom_one">
                          <input type="radio" name="select_specialist" />
                          <span class="checkmark"></span> Free (3)
                        </label>
                      </div>
                      <div>
                        <label class="custom_check custom_one mb-0">
                          <input type="radio" name="select_specialist" checked />
                          <span class="checkmark"></span> Paid (15)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div class="card post-widget">
                <div class="card-body">
                  <div class="latest-head">
                    <h4 class="card-title">Latest Courses</h4>
                  </div>
                  <ul class="latest-posts">
                    <li>
                      <div class="post-thumb">
                        <a href="course-details.html">
                          <img
                            class="img-fluid"
                            src="/blog/blog-01.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div class="post-info free-color">
                        <h4>
                          <a href="course-details.html">
                            Introduction LearnPress - LMS plugin
                          </a>
                        </h4>
                        <p>FREE</p>
                      </div>
                    </li>
                    <li>
                      <div class="post-thumb">
                        <a href="course-details.html">
                          <img
                            class="img-fluid"
                            src="/blog/blog-02.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div class="post-info">
                        <h4>
                          <a href="course-details.html">
                            Become a PHP Master and Make Money
                          </a>
                        </h4>
                        <p>₹200</p>
                      </div>
                    </li>
                    <li>
                      <div class="post-thumb">
                        <a href="course-details.html">
                          <img
                            class="img-fluid"
                            src="/blog/blog-03.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div class="post-info free-color">
                        <h4>
                          <a href="course-details.html">
                            Learning jQuery Mobile for Beginners
                          </a>
                        </h4>
                        <p>FREE</p>
                      </div>
                    </li>
                    <li>
                      <div class="post-thumb">
                        <a href="course-details.html">
                          <img
                            class="img-fluid"
                            src="/blog/blog-01.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div class="post-info">
                        <h4>
                          <a href="course-details.html">
                            Improve Your CSS Workflow with SASS
                          </a>
                        </h4>
                        <p>₹200</p>
                      </div>
                    </li>
                    <li>
                      <div class="post-thumb">
                        <a href="course-details.html">
                          <img
                            class="img-fluid"
                            src="/blog/blog-02.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div class="post-info free-color">
                        <h4>
                          <a href="course-details.html">
                            HTML5/CSS3 Essentials in 4-Hours
                          </a>
                        </h4>
                        <p>FREE</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
              </>)}
          </div>
        </div>

      </div>
    </section >


  );
}

export default Course;
