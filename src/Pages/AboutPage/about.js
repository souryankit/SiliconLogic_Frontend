import React from 'react';
//import "../../component/style.css";
import './about.css';
import Homeclub from "./home_club";
import AboutAnimation from './introAnime';
import VisionAnimation from './visionAnime';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const About = () => {
  // Use the scroll animation hook
  useScrollAnimation();

  return (
    <section className="about-page">

      <div className="about-container">
      <h2 className='pagetitle'><b>ABOUT US</b></h2>
        <div className='container about-container'>
          <div className='row'>
        
            <div className='col-7 about-section-text' id='aboutres'>
              <p><b>S</b>ociety for <b>I</b>ntegrated <b>L</b>earning of <b>I</b>ntegrated circuit , <b>CO</b>mmunication and <b>N</b>etworking
                System is a technical society related to broad domain perspective of Electronics and Communication Engineering. 
                SILICON is a student-led initiative aimed at establishing
                university-based communities for students interested in primarily three technologies: 
                For example : Electronics System Design, VLSI Design, PCB Designing, IoT, Embedded Systems, Signal Processing, Communication and Networking System Analysis etc. 
                Also thrive these communities with their technical mindset and vision to build solutions for a better tomorrow. 
                The society is aimed at motivating and training students who will encourage other students to explore newer areas of technologies
                so that they will be ready for the workspace with a right and required skillset when they step out into the world.
              </p>
            </div>
            <div className='col-5 d-none d-md-block'>
              <AboutAnimation />
            </div>
            
          </div>
        </div>

        <div className='container about-container'>

          <div className='row'>
           
            <div className='col-5 d-none d-md-block' style={{ marginTop: "20px"}}>
             
                <VisionAnimation />
            </div>
            <div className='col-12 col-md-7' >
              
              <p className='about-section-text' id='aboutres1'>
                Our vision is to identify and promote university students interested in
                studying Electronics and Communication technologies and they want
                make their carriers in core technologies. This platform is created to
                help students in essential technologies including Electronics
                System Design, IoT, embedded systems, and Communication
                and Networking Systems Designing to bridge the gap between theoretical
                knowledge and real-life applications.
                The main and most promising goal of this technical
                community is imparting in depth knowledge to the students,
                facilitating technical activity, hand-on projects and cater them to the
                changing industrial demands, global and societal needs. Participating in technical events, students will have a
                significant impact on job opportunities. Students who are collecting
                technical skills and want to be part of real projects have an
                advantage in key areas of professional life.
              </p>
            </div>
          </div>
        </div>

      </div>


      <div className="valuebox-bg ">

        <div className='section' id='aboutvaluesres' >
          <div className="container" >
            <div className="text-center mg-bottom-48px">
              <div className="inner-container center">
                <div className='subtitle mg-bottom-24px '>Our Values</div>
                <h2 className='display-3 mg-bottom-0 display-3'>
                  The core values that drive everything we do
                </h2>
              </div>
            </div>
            <div className="inner-container  center">
              <div className="grid-3-columns" id='aboutvalues' style={{ gap: '20px', padding: '0 15px' }}>

                <div className='card imgcard pd-44px---38px border-1px---neutral-300 '>
                  <div style={{ display: "flex" }}>
                    <img style={{ marginRight: "25px" }} src="/static_img/coreicon1.svg" className='max-w-48px-mbl mg-bottom-32px'/>
                      
                    <h3 className='display-41 mg-bottom-8px'>Involve</h3>
                  </div>
                  <p className='valuetext'>
                    Involve students of campus interested in core technologies, including those with
                    diverse backgrounds and different majors. And support the community by helping others to learn as well.
                  </p>
                </div>
                <div className='card imgcard pd-44px---38px border-1px---neutral-300'>
                  <div style={{ display: "flex" }}>
                    <img style={{ marginRight: "25px" }} src="/static_img/coreicon2.svg" className='max-w-48px-mbl mg-bottom-32px' />
                    <h3 className='display-41 mg-bottom-8px'>Improve</h3>
                  </div>
                  <p className='valuetext'>
                    Improve student's knowledge about technical aspects of particular domains,
                    where new skills are gained through hands-on workshops, in-person trainings and live
                    project activities.
                  </p>
                </div>
                <div className='card imgcard pd-44px---38px border-1px---neutral-300'>
                  <div style={{ display: "flex" }}>
                        <img style={{ marginRight: "25px" }} src="/static_img/coreicon3.svg" className='max-w-48px-mbl mg-bottom-32px'/>
                    <h3 className='display-41 mg-bottom-8px'>Innovate</h3>
                  </div>
                  <p className='valuetext'>
                    Innovate great solutions for problems local as well as global with your new
                    learnings and skill sets.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div className="section " id='aboutvaluesres1'>
          <div className="container">
            <div className="inner-container center">

              <h3 className='subtitle' style={{ textAlign: "center", }}>Features</h3>
              <h4 className='display-3 mg-bottom-48px' style={{ textAlign: "center" }}> We are providing various required features to our members at our best standards. </h4>
              <div className="grid-2-columns" id='aboutvalues' style={{ gap: '20px', padding: '0 5px' }}>

                <div className="card features-icon-left-card imgcard">
                  <img
                    src="/static_img/clubicon.png"
                    loading="eager"
                    alt=""
                  />
                  <div>
                    <h3 className="display-4 mg-bottom-12px">Technical Clubs</h3>
                    <p className="mg-bottom-0">
                      Society has different technical clubs who are responsible for integrated knowledge enhancement of our members.
                    </p>
                  </div>
                </div>

                <div className="card features-icon-left-card imgcard">
                  <img
                    src="/static_img/industry.png"
                    loading="eager"
                    alt="User Journey - Techcloud X Webflow Template"
                  />
                  <div>
                    <h3 className="display-4 mg-bottom-12px">Industrial Knowledge</h3>
                    <p className="mg-bottom-0">
                      We are commited to provide best knowledge about tools and technologies at industry standards.
                    </p>
                  </div>
                </div>

                <div className="card features-icon-left-card imgcard">
                  <img
                    src="/static_img/learning.png"
                    loading="eager"
                    alt=""
                  />
                  <div>
                    <h3 className="display-4 mg-bottom-12px">Learning Contents</h3>
                    <p className="mg-bottom-0">
                      We have collection of technical contents in various majors for enhancement of knowledge and skills of our members.
                    </p>
                  </div>
                </div>

                <div className="card features-icon-left-card imgcard">
                  <img
                    src="/static_img/workshop.png"
                    loading="eager"
                    alt=""
                  />
                  <div>
                    <h3 className="display-4 mg-bottom-12px">Workshops & Certification</h3>
                    <p className="mg-bottom-0">
                      Society provides several workshops and hands-on training sessions and also provides certificates regarding the same.
                    </p>
                  </div>
                </div>

                <div className="card features-icon-left-card imgcard">
                  <img
                    src="/static_img/projectwork.png"
                    loading="eager"
                    alt=""
                  />
                  <div>
                    <h3 className="display-4 mg-bottom-12px">Project Support</h3>
                    <p className="mg-bottom-0">
                      Society supports various projects under the guidence of Department of Electronics and Communication Engineering.
                    </p>
                  </div>
                </div>

                <div className="card features-icon-left-card imgcard">
                  <img
                    src="/static_img/connect.png"
                    loading="eager"
                    alt=""
                  />
                  <div>
                    <h3 className="display-4 mg-bottom-12px">Networking Platform</h3>
                    <p className="mg-bottom-0">
                      We are providing seamless networking platform for members to connect with best industry professionals.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <Homeclub />
{/* 
      <div className='container'>
        <h3 className='subtitle' style={{ textAlign: "center", }}>Organisation Structure</h3>
        <div className='row'>
          <img src='./static_img/team-chart.png' />

        </div>
      </div> */}


      <div className="container about-container">
        <div className='row' >
          <div className='col-12 col-md-6' id='targetres'>

            <h3 className='subtitle' style={{ textAlign: "center", marginTop: "30px", }}>Our Targets</h3>
            <p className='about-section-text'>
               We help students to acquire and develop new skill-sets by conducting various lectures and workshops. <br></br>
               We motivate and guide them to come up with innovative projects that tackle real-life problems, Which
                 will cut the gap between theoretical and real-life applications.<br></br>
               We provide resources and the technical support, how to realize and shape their projects and
                 through regular meetings and sessions we improve
                 students' technical and leadership skills in a peer-to-peer learning.
              <br></br>
               Providing students with advance industry knowledge and hand-on skills.
                  Working with maximum attention to the department towhich they are assigned.<br></br>
               Actively participation in SILICON on-campus and off-campus sessions and events
                 and demonstration of interest in resolving community issues and a willingness to learn new things.
            </p>

          </div>
          <div className='col-12 col-md-6' id='targetres' >
            <img id='targetres1' className="aboutimg" src="/static_img/about-head1.png" />


          </div>
        </div>
      </div>



    </section>
  )
}

export default About 
