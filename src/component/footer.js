import React from "react";
//import "./style.css";
import styles from './footer.module.css';
import Map from "./map"
import { AiFillFacebook, AiOutlineTwitter, AiFillLinkedin, AiFillMail, AiFillInstagram } from "react-icons/ai"
import { Link } from "react-router-dom";




function Footer() {


  return (
    <section>
    <footer className={styles['footer']} style={{ paddingTop: 50, color: "#004d99", background: '#cccccc' }}>
      <div className="container-fluid">

        <div className="container">
          <div className="row">
            <div className="col-md-4">
            <div ><img src="/static_img/weblogo.png" style={{ height: 50, width: 190 }} alt="logo" /></div>

              <address>
                <strong>SOCIETY FOR INTEGRATED LEARNING OF INTEGRATED CIRCUIT, COMMUNICATION AND NETWORKING SYSTEMS</strong>
                <br />
                
                <br />
                <i></i>
              </address>


              <div className="social-icons">
                <ul className={`social-network ${styles['social-network']}`}>
                  <li>
                    <a href="https://www.linkedin.com/company/silicon-ggv/"
                      data-placement="top"
                      title=""
                      data-original-title="Linkedin"
                      target={"_blank"}
                      
                    >
                      <AiFillLinkedin style={{ height: 40, width: 40 }} />
                    </a>
                  </li>
                  <li>
                    <a href="www.facebook.com"
                      data-placement="top"
                      title=""
                      data-original-title="Facebook"
                      target={"_blank"}
                    >
                      <AiFillFacebook style={{ height: 40, width: 40 }} />
                    </a>
                  </li>

                  <li>
                    <a href="https://www.instagram.com/siliconggv/"
                      data-placement="top"
                      title=""
                      data-original-title="Instagram"
                      target={"_blank"}
                    >
                      <AiFillInstagram style={{ height: 40, width: 40 }} />
                    </a>
                  </li>
                  <li>
                    <a href="siliconggvofficial@gmail.com"
                      data-placement="top"
                      title=""
                      data-original-title="Mail Us"
                      target={"_blank"}
                    >
                      < AiFillMail style={{ height: 40, width: 40 }} />
                    </a>
                  </li>
                </ul>
              </div>


            </div>

            <div className="col-md-3">
              <h6 className="mx-4">Quick Links</h6>
              <ul className="link-list" style={{ listStyle: "none" }}>
                <li>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" style={{ textDecoration: "none" }}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/clubs" style={{ textDecoration: "none" }}>
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link to="/coreteam" style={{ textDecoration: "none" }}>
                    Core Team
                  </Link>
                </li>
                {/* <li>
                  <Link to="/alumni" style={{ textDecoration: "none" }}>
                    Alumni & Mentors
                  </Link>
                </li>
                <li>
                  <Link to="/recrut" style={{ textDecoration: "none" }}>
                    Recruitment & Membership
                  </Link>
                </li>
                <li>
                  <Link to="/projects" style={{ textDecoration: "none" }}>
                    Projects
                  </Link>
                </li> */}
                <li>
                  <Link to="/contact" style={{ textDecoration: "none" }}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-5">
            <address>
              <div class="ad-icon"><i class="fa fa-home"> </i>  Outer Ring Road, Sarjapura Road  Bangalore - 560035</div>
              <div class="ad-icon"><i class="fa fa-phone"> </i> 8400134829</div>
              <div class="ad-icon"><i class="fa fa-envelope"> </i> siliconsociety.org@gmail.com</div>
            </address>
            <div>Note: Kindly contact with above mentioned email for quick response.</div>

              {/* <Map /> */}
            </div>
          </div>
        </div>
        <div id="sub-footer" className={styles['sub-footer']} style={{ background: '#000000' }}>
          <div className="container">
            <div className="row">
            <div className="col-lg-8">
                <p>
                  <span> Terms</span> | <span>Policy </span>
                  <Link to="/policy" > Read Me   </Link>
                </p>
              </div>
              <div className="col-lg-4">
                <div className={`copyright ${styles['copyright']}`}>
                  <p>
                    <span style={{ fontSize: 15 }}>
                      © 2024 SILICON ORG.  All Right Reserved {" "}
                    </span>
                  </p>
                </div>
              </div>

              

            </div>
          </div>
        </div>
      </div>
    </footer>
    </section>
  );
}

export default Footer;
