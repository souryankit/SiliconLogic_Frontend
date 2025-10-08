import {React, useState} from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import SequentialWords from "./tagline";
import  './homepage.css';
import '../Pricing/pricing.css';

const Homepage = () => {
  const counterSectionRef = useRef(null);
  const studentSectionRef = useRef(null);
  const countersAnimated = useRef(false);
  const studentCountersAnimated = useRef(false);
  const sectionsRef = useRef([]);
  const [selectedPlan, setSelectedPlan] = useState("Basic");
    
    // Plan-specific benefits and features
    const planDetails = {
        Basic: {
            benefits: [
                "Access to slack community",
                "Access to support team"
            ],
            features: [
                "Search term isolation",
                "Total sales analytics"
            ]
        },
        Team: {
            benefits: [
                "Access to slack community",
                "Access to support team",
                "Algorithmic bidding",
                "Keyword and ASIN harvesting"
            ],
            features: [
                "Search term isolation",
                "Total sales analytics",
                "Best seller rank",
                "Placement optimization"
            ]
        },
        Enterprise: {
            benefits: [
                "Access to slack community",
                "Access to support team",
                "Algorithmic bidding",
                "Keyword and ASIN harvesting",
                "Priority customer support",
                "Dedicated account manager"
            ],
            features: [
                "Search term isolation",
                "Total sales analytics",
                "Best seller rank",
                "Placement optimization",
                "Advanced analytics dashboard",
                "Custom reporting",
                "API access"
            ]
        }
    };

  useEffect(() => {
    const animateCounters = (sectionRef, animatedRef, counterClass) => {
      if (!sectionRef.current || animatedRef.current) return;

      const counterElements = sectionRef.current.querySelectorAll(counterClass);

      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;

          counterElements.forEach(counter => {
            let targetValue = parseInt(counter.textContent);
            let suffix = '';

            // Extract the suffix (+ or K+ etc.)
            if (counter.textContent.includes('K+')) {
              suffix = 'K+';
            } else if (counter.textContent.includes('K ')) {
              suffix = 'K ';
            } else if (counter.textContent.includes('K')) {
              suffix = 'K';
            } else if (counter.textContent.includes('+')) {
              suffix = '+';
            }

            let currentValue = 0;
            const duration = 2000; // Duration in milliseconds
            const steps = 50;
            const increment = targetValue / steps;
            const stepTime = duration / steps;

            const updateCounter = () => {
              currentValue += increment;
              if (currentValue < targetValue) {
                counter.textContent = Math.ceil(currentValue) + suffix;
                setTimeout(updateCounter, stepTime);
              } else {
                counter.textContent = targetValue + suffix;
              }
            };

            updateCounter();
          });
        }
      }, { threshold: 0.1 });

      observer.observe(sectionRef.current);

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    };

    // Animate both sections for counters
    animateCounters(counterSectionRef, countersAnimated, '.counterUp');
    animateCounters(studentSectionRef, studentCountersAnimated, '.course-inner-content span');

    // Create section fade-in animation
    const sectionsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-bottom');
          sectionsObserver.unobserve(entry.target); // Only animate once
        }
      });
    }, { threshold: 0.15 });

    // Get all sections to animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      // Remove the fade-in-bottom class if it exists already
      section.classList.remove('fade-in-bottom');
      // Observe the section
      sectionsObserver.observe(section);
    });

    
    return () => {
      // Cleanup
      sections.forEach(section => {
        sectionsObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <div>
      <section id="home-content" className= "home-bg">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-7 col-md-6 col-sm-6"
              style={{ height: "90vh" }}
            >
              <div className= "home-title imgcard"  >
                Society for Integrated Learning of ICs, Communication and Networking Systems
              </div>
              <div className= "tagline" >
                <SequentialWords />
              </div>
              <div className="know-more">
                <Link to="/about">
                  Know More !!
                </Link>
              </div>
            </div>
            <div id="atom" className="atom-container">
              <div id="nucleus">
              </div>
              <div className="orbit">
                <div className="electron"></div>
              </div>
              <div className="orbit">
                <div className="electron"></div>
              </div>
              <div className="orbit">
                <div className="electron"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section student-course" ref={studentSectionRef}>
        <div class="container">
          <div class="course-widget">
            <div class="row">
              <div class="col-lg-3 col-md-6">
                <div class="course-full-width">
                  <div
                    class="blur-border course-radius align-items-center aos"
                    data-aos="fade-up"
                  >
                    <div class="online-course d-flex align-items-center">
                      <div class="course-img">
                        <img src="pencil-icon.svg" alt="Img" />
                      </div>
                      <div class="course-inner-content">
                        <h4>
                          <span>10</span>K
                        </h4>
                        <p>Online Courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="course-full-width">
                  <div class="blur-border course-radius aos" data-aos="fade-up">
                    <div class="online-course d-flex align-items-center">
                      <div class="course-img">
                        <img src="/cources-icon.svg" alt="Img" />
                      </div>
                      <div class="course-inner-content">
                        <h4>
                          <span>200</span>+
                        </h4>
                        <p>Expert Tutors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="course-full-width">
                  <div class="blur-border course-radius aos" data-aos="fade-up">
                    <div class="online-course d-flex align-items-center">
                      <div class="course-img">
                        <img src="/certificate-icon.svg" alt="Img" />
                      </div>
                      <div class="course-inner-content">
                        <h4>
                          <span>6</span>K+
                        </h4>
                        <p>Ceritified Courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 d-flex">
                <div class="course-full-width">
                  <div class="blur-border course-radius aos" data-aos="fade-up">
                    <div class="online-course d-flex align-items-center">
                      <div class="course-img">
                        <img src="/gratuate-icon.svg" alt="Img" />
                      </div>
                      <div class="course-inner-content">
                        <h4>
                          <span>60</span>K +
                        </h4>
                        <p>Online Students</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="features">
        <div className="container">
          <div className="row">
            <div className=" col-5 features-bg"></div>

            <div className="grid-content grid-7-columns col-7">
              <div className= "card1 features-icon-card7 imgcard ">
                <img src="/static_img/clubicon.png" />
                <div>
                  <h3 className="display-7 mg-bottom-6px">Technical Clubs</h3>
                  <p>
                    Society has different technical clubs who are responsible
                    for integrated knowledge enhancement of our members.
                  </p>
                </div>
              </div>

              <div className="card1 features-icon-card7 imgcard">
                <img src="/static_img/industry.png" />
                <div>
                  <h3 className="display-7 mg-bottom-6px">
                    Industrial Knowledge
                  </h3>
                  <p>
                    We are commited to provide best knowledge about tools and
                    technologies at industry standards.
                  </p>
                </div>
              </div>

              <div className="card1 features-icon-card7 imgcard">
                <img src="/static_img/learning.png" />
                <div>
                  <h3 className="display-7 mg-bottom-6px">Learning Contents</h3>
                  <p>
                    We have collection of technical contents in various majors
                    for enhancement of knowledge and skills of our members.
                  </p>
                </div>
              </div>

              <div className="card1 features-icon-card7 imgcard">
                <img src="/static_img/workshop.png" />

                <div>
                  <h3 className="display-7 mg-bottom-6px">
                    Workshops & Certification
                  </h3>
                  <p>
                    Society provides several workshops and hands-on training
                    sessions and also provides certificates regarding the same.
                  </p>
                </div>
              </div>

              <div className="card1 features-icon-card7 imgcard">
                <img src="/static_img/projectwork.png" />
                <div>
                  <h3 className="display-7 mg-bottom-6px">Project Support</h3>
                  <p>
                    Society supports various projects under the guidence of
                    Department of Electronics and Communication Engineering.
                  </p>
                </div>
              </div>

              <div className="card1 features-icon-card7 imgcard">
                <img src="/static_img/connect.png" />
                <div>
                  <h3 className="display-7 mg-bottom-6px">
                    Networking Platform
                  </h3>
                  <p>
                    We are providing seamless networking platform for members to
                    connect with best industry professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-course my-4">
        <div className="container">
          <div class="section-header aos" data-aos="fade-up">
            <div class="section-sub-head">
              <span>What's New</span>
              <h2>Featured Courses</h2>
            </div>
            <div class="all-btn all-category d-flex align-items-center">
              <Link to="/course" class="btn btn-primary">
                All Courses
              </Link>
            </div>
          </div>
          <div className="section-text aos" data-aos="fade-up">
            <p class="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              aenean accumsan bibendum gravida maecenas augue elementum et
              neque. Suspendisse imperdiet.
            </p>
          </div>
          <div className="course-feature">
            <div class="row">
              <div class="col-lg-4 col-md-6 d-flex">
                <div class="course-box d-flex aos" data-aos="fade-up">
                  <div class="product">
                    <div class="product-img">
                      <a href="course-details.html">
                        <img
                          class="img-fluid"
                          alt="Img"
                          src="/course/course-04.jpg"
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
                          <a href="#">
                            <i class="fa fa-heart"></i>
                          </a>
                        </div>
                      </div>
                      <h3 class="title instructor-text">
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
                        <div class="rating m-0">
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
              <div class="col-lg-4 col-md-6 d-flex">
                <div class="course-box d-flex aos" data-aos="fade-up">
                  <div class="product">
                    <div class="product-img">
                      <a href="course-details.html">
                        <img
                          class="img-fluid"
                          alt="Img"
                          src="/course/course-02.jpg"
                        />
                      </a>
                      <div class="price">
                        <h3>
                          ₹400 <span>₹99.00</span>
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
                          <a href="#">
                            <i class="fa fa-heart"></i>
                          </a>
                        </div>
                      </div>
                      <h3 class="title instructor-text">
                        <a href="course-details.html">
                          Introduction To Artificial Intelligence
                        </a>
                      </h3>
                      <div class="course-info d-flex align-items-center">
                        <div class="rating-img d-flex align-items-center">
                          <img src="/icon/icon-01.svg" alt="Img" />
                          <p>11+ Lesson</p>
                        </div>
                        <div class="course-view d-flex align-items-center">
                          <img src="/icon/icon-02.svg" alt="Img" />
                          <p>6hr 30min</p>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="rating m-0">
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star"></i>
                          <span class="d-inline-block average-rating">
                            <span>4.3</span> (15)
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
              <div class="col-lg-4 col-md-6 d-flex">
                <div class="course-box d-flex aos" data-aos="fade-up">
                  <div class="product">
                    <div class="product-img">
                      <a href="course-details.html">
                        <img
                          class="img-fluid"
                          alt="Img"
                          src="/course/course-03.jpg"
                        />
                      </a>
                      <div class="price combo">
                        <h3>FREE</h3>
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
                              <a href="instructor-profile.html">
                                Nitish Jha Vats
                              </a>
                            </h4>
                            <p>Instructor</p>
                          </div>
                        </div>
                        <div class="course-share d-flex align-items-center justify-content-center">
                          <a href="#">
                            <i class="fa fa-heart"></i>
                          </a>
                        </div>
                      </div>
                      <h3 class="title instructor-text">
                        <a href="course-details.html">
                          Sketch from A to Z (2024)
                        </a>
                      </h3>
                      <div class="course-info d-flex align-items-center">
                        <div class="rating-img d-flex align-items-center">
                          <img src="/icon/icon-01.svg" alt="Img" />
                          <p>16+ Lesson</p>
                        </div>
                        <div class="course-view d-flex align-items-center">
                          <img src="/icon/icon-02.svg" alt="Img" />
                          <p>12hr 30min</p>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="rating m-0">
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star"></i>
                          <span class="d-inline-block average-rating">
                            <span>4.5</span> (15)
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
              <div class="col-lg-4 col-md-6 d-flex">
                <div class="course-box d-flex aos" data-aos="fade-up">
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
                          ₹500 <span>₹99.00</span>
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
                              <a href="instructor-profile.html">Ankit Kumar</a>
                            </h4>
                            <p>Instructor</p>
                          </div>
                        </div>
                        <div class="course-share d-flex align-items-center justify-content-center">
                          <a href="#">
                            <i class="fa fa-heart"></i>
                          </a>
                        </div>
                      </div>
                      <h3 class="title instructor-text">
                        <a href="course-details.html">
                          Introduction To Mobile Communication Technology
                        </a>
                      </h3>
                      <div class="course-info d-flex align-items-center">
                        <div class="rating-img d-flex align-items-center">
                          <img src="/icon/icon-01.svg" alt="Img" />
                          <p>10+ Lesson</p>
                        </div>
                        <div class="course-view d-flex align-items-center">
                          <img src="/icon/icon-02.svg" alt="Img" />
                          <p>8hr 30min</p>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="rating m-0">
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star"></i>
                          <span class="d-inline-block average-rating">
                            <span>4.2</span> (15)
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
              <div class="col-lg-4 col-md-6 d-flex">
                <div class="course-box d-flex aos" data-aos="fade-up">
                  <div class="product">
                    <div class="product-img">
                      <a href="course-details.html">
                        <img
                          class="img-fluid"
                          alt="Img"
                          src="/course/course-05.jpg"
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
                              src="/user/user3.jpg"
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
                          <a href="#">
                            <i class="fa fa-heart"></i>
                          </a>
                        </div>
                      </div>
                      <h3 class="title instructor-text">
                        <a href="course-details.html">
                          Introduction To Embedded Systems
                        </a>
                      </h3>
                      <div class="course-info d-flex align-items-center">
                        <div class="rating-img d-flex align-items-center">
                          <img src="/icon/icon-01.svg" alt="Img" />
                          <p>13+ Lesson</p>
                        </div>
                        <div class="course-view d-flex align-items-center">
                          <img src="/icon/icon-02.svg" alt="Img" />
                          <p>10hr 30min</p>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="rating m-0">
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
              <div class="col-lg-4 col-md-6 d-flex">
                <div class="course-box d-flex aos" data-aos="fade-up">
                  <div class="product">
                    <div class="product-img">
                      <a href="course-details.html">
                        <img
                          class="img-fluid"
                          alt="Img"
                          src="/course/course-07.jpg"
                        />
                      </a>
                      <div class="price combo">
                        <h3>FREE</h3>
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
                              <a href="instructor-profile.html">
                                Nitish Jha Vats
                              </a>
                            </h4>
                            <p>Instructor</p>
                          </div>
                        </div>
                        <div class="course-share d-flex align-items-center justify-content-center">
                          <a href="#">
                            <i class="fa fa-heart"></i>
                          </a>
                        </div>
                      </div>
                      <h3 class="title instructor-text">
                        <a href="course-details.html">
                          Introduction To IOT Systems
                        </a>
                      </h3>
                      <div class="course-info d-flex align-items-center">
                        <div class="rating-img d-flex align-items-center">
                          <img src="/icon/icon-01.svg" alt="Img" />
                          <p>7+ Lesson</p>
                        </div>
                        <div class="course-view d-flex align-items-center">
                          <img src="/icon/icon-02.svg" alt="Img" />
                          <p>7hr 30min</p>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="rating m-0">
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star"></i>
                          <span class="d-inline-block average-rating">
                            <span>4.6</span> (15)
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
          </div>
        </div>
      </section>

      <section id="activity" className="activity-bg">
        <div className="container">
          <div className="subtitle" style={{ textAlign: "center" }}>
            Activities We Do
          </div>
          <div
            className="row clubactivities"
            id="clubactivities"
            style={{ paddingTop: "25px", paddingBottom: "5px" }}
          >
            <div className="col-4">
              <div className="container-fluid" style={{ padding: "6px" }}>
                <div className="row imgcard">
                  <div className="col ">
                    <img className="clubactivities-img" src="/static_img/iot-img4.webp" />
                  </div>
                  <div className="col">
                    <h4>Projects</h4>
                    <p>
                      {" "}
                      Society coducts projects under mentorship of Department of
                      Electronics and Communication Engineering.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-fluid" style={{ padding: "6px" }}>
                <div className="row imgcard">
                  <div className="col">
                    <img className="imgf" src="/static_img/13.jpg" />
                  </div>
                  <div className="col">
                    <h4>Lectures</h4>
                    <p>
                      {" "}
                      Each club conducts lectures around the year covering
                      various topics related to industrial tools and
                      technologies.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-fluid" style={{ padding: "6px" }}>
                <div className="row imgcard">
                  <div className="col">
                    <img className="imgf" src="/static_img/weblogo.png" />
                  </div>
                  <div className="col">
                    <h4>Silicon Week</h4>
                    <p>
                      {" "}
                      A tech week with different competitons, in which all
                      schools participate to winning the coveted SILICON Badges
                      and Prizes .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 imgcard">
              <img className="middlepic" src="/static_img/16.jpeg" />
            </div>

            <div className="col-4">
              <div className="container-fluid" style={{ padding: "6px" }}>
                <div className="row imgcard">
                  <div className="col">
                    <img className="imgf" src="/static_img/14.jpg" />
                  </div>
                  <div className="col">
                    <h4>Bootcamp</h4>
                    <p>
                      {" "}
                      BootCamps are days long session where we teach everything
                      right from the scratch and discuss about new technologies.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-fluid" style={{ padding: "6px" }}>
                <div className="row imgcard">
                  <div className="col">
                    <img className="imgf" src="/static_img/15.jpg" />
                  </div>
                  <div className="col">
                    <h4>Workshop</h4>
                    <p>
                      {" "}
                      Various workshops are organised over the year to give a
                      hands-on experience in various fields.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-fluid" style={{ padding: "6px" }}>
                <div className="row imgcard">
                  <div className="col">
                    <img className="imgf" src="/static_img/equilibrio.jpg" />
                  </div>
                  <div className="col">
                    <h4>Equilibrio</h4>
                    <p>
                      {" "}
                      The club participates in the annual Technological and
                      Entrepreneurial festival of IT GGV.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section lead-companies" ref={counterSectionRef}>
        <div className="container">
          <div class="enroll-group aos" data-aos="fade-up">
            <div class="row">
              <div class="col-lg-4 col-md-6">
                <div class="total-course d-flex align-items-center">
                  <div class="blur-border">
                    <div class="enroll-img">
                      <img
                        src="/icon/icon-07.svg"
                        alt="Img"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div class="course-count">
                    <h3>
                      <span class="counterUp">2000+</span>
                    </h3>
                    <p>STUDENTS ENROLLED</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="total-course d-flex align-items-center">
                  <div class="blur-border">
                    <div class="enroll-img">
                      <img
                        src="/icon/icon-08.svg"
                        alt="Img"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div class="course-count">
                    <h3>
                      <span class="counterUp">15+</span>
                    </h3>
                    <p>TOTAL COURSES</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="total-course d-flex align-items-center">
                  <div class="blur-border">
                    <div class="enroll-img">
                      <img
                        src="/icon/icon-09.svg"
                        alt="Img"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div class="course-count">
                    <h3>
                      <span class="counterUp">10+</span>
                    </h3>
                    <p>COUNTRIES</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="section-header aos" data-aos="fade-up">
            <div class="section-sub-head feature-head text-center">
              <h3>Trusted By</h3>
              <div className="span1">
                50+ Leading Universities And Companies
              </div>
            </div>
          </div>
          <div className="company-scroll-container">
            <div className="company-scroll-wrapper">
              <img className="companycard" src="./company_logos/apple.png" alt="apple logo" />
              <img className="companycard" src="./company_logos/intel.png" alt="intel logo" />
              <img className="companycard" src="./company_logos/amd.png" alt="amd logo" />
              <img className='companycard' src="./company_logos/nividia.jpg" alt="nvidia logo" />
              <img className="companycard" src="./company_logos/synopsys.png" alt="synopsys logo" />
              <img className="companycard" src="./company_logos/bosch.png" alt="bosch logo" />
              <img className="companycard" src="./company_logos/broadcom.png" alt="broadcom logo" />
              <img className='companycard' src="./company_logos/panasonic.png" alt="panasonic logo" />
              <img className='companycard' src="./company_logos/philips.png" alt="philips logo" />
              <img className='companycard' src="./company_logos/qualcomm.png" alt="qualcomm logo" />
              {/* Duplicate logos for seamless scrolling */}
              <img className="companycard" src="./company_logos/apple.png" alt="apple logo" />
              <img className="companycard" src="./company_logos/intel.png" alt="intel logo" />
              <img className="companycard" src="./company_logos/amd.png" alt="amd logo" />
              <img className='companycard' src="./company_logos/nividia.jpg" alt="nvidia logo" />
              <img className="companycard" src="./company_logos/synopsys.png" alt="synopsys logo" />
              <img className="companycard" src="./company_logos/bosch.png" alt="bosch logo" />
              <img className="companycard" src="./company_logos/broadcom.png" alt="broadcom logo" />
              <img className='companycard' src="./company_logos/panasonic.png" alt="panasonic logo" />
              <img className='companycard' src="./company_logos/philips.png" alt="philips logo" />
              <img className='companycard' src="./company_logos/qualcomm.png" alt="qualcomm logo" />
            </div>
          </div>
        </div>
      </section>
      <section class="pricing-content">
                <div class="container">
                    <div class="row">
                        <div class="col-5 text-center mx-auto">
                            <div class="title-sec">
                                <h5>We keep it simple</h5>
                                <h2>Choose The Right Plan</h2>
                                <p>Improve the way your work, discover a brand new tool and drop the hassle once and for all.</p>
                            </div>
                            
                            <div class="enable-item">
                                <label class="mb-0 me-2">Monthly</label>
                                <div class="form-check form-switch check-on m-2">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked></input>
                                </div>
                                <label class="mb-0 px-4">Annualy</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div 
                                class={`plan-box ${selectedPlan === "Basic" ? "active" : ""}`} 
                                onClick={() => setSelectedPlan("Basic")}
                                style={selectedPlan === "Basic" ? {border: '2px solid rgb(144, 0, 255)', boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'} : {}}
                            >
                                <div>
                                    <h4>Basic</h4>
                                    <p>For individuals who just need to start with the basic features</p>
                                    <p>per user, per month when billed Annualy</p>
                                </div>
                                <h3><span>₹</span>999.0</h3>
                            </div>
                            <div 
                                class={`plan-box ${selectedPlan === "Team" ? "active" : ""}`}
                                onClick={() => setSelectedPlan("Team")}
                                style={selectedPlan === "Team" ? {border: '2px solid rgb(144, 0, 255)', boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'} : {}}
                            >
                                <div>
                                    <h4>Team</h4>
                                    <p>For individuals who just need to start with the basic features</p>
                                    <p>per team, per month when billed Annualy</p>
                                </div>
                                <h3><span>₹</span>4999.0</h3>
                            </div>
                            <div 
                                class={`plan-box ${selectedPlan === "Enterprise" ? "active" : ""}`}
                                onClick={() => setSelectedPlan("Enterprise")}
                                style={selectedPlan === "Enterprise" ? {border: '2px solid rgb(144, 0, 255)', boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'} : {}}
                            >
                                <div>
                                    <h4>Enterprise</h4>
                                    <p>For individuals who just need to start with the basic features</p>
                                    <p> per month when billed Annualy</p>
                                </div>
                                <h3><span>₹</span>12999.0</h3>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="benefit-box">
                                <h5>Benefits</h5>
                                <ul>
                                    {planDetails[selectedPlan].benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                                <h5>Features</h5>
                                <ul>
                                    {planDetails[selectedPlan].features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                <Link to="/billing" class="btn btn-primary w-100">Start with {selectedPlan}</Link>
                            </div>
                        </div>
                    </div>
                </div>
      </section>
      
    </div>
  );
};

export default Homepage;

{/* <Homeanimation/>  */ }
{/* <div class="drop drop1"></div>
  <div class="drop drop2"></div> */}
{/* <HomeSlider /> */ }
{/* className="floating" */ }