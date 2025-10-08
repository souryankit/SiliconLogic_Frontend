import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import Map from "../../component/map";
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './contact.css';

const Contact = () => {
  const form = useRef();
  
  // Use the scroll animation hook

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i1cg9pe",
        "template_t7h8hwf",
        form.current,
        "okWr80IdqTe4hHqw-"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  useScrollAnimation();
  return (
    <>

      <section className="container">
        <div className="pagetitle"> <b>Contact Us</b></div>
        <div>
          <div class="container my-4 py-4">
            <div class="row text-center">
              <div class="col-lg-4 ad-red">
                <div class="ad-icon"><i class="fa fa-home fa-2x"></i></div>
                  <h4>Our Location</h4><p>Outer Ring Road, Sarjapura Road <br />
                                     Bangalore - 560035</p>
               </div>

              <div class="col-lg-4 ad-blue">
                <div class="ad-icon"><i class="fa fa-phone fa-2x"></i></div>
                  <h4>Telephone</h4><p>(+91) 8400134829<br/>(+91) 8542930571</p>
                </div>
              <div class="col-lg-4 ad-green">
                <div class="ad-icon"><i class="fa fa-envelope fa-2x"></i></div>
                  <h4>Send email</h4><p>siliconsociety.org@gmail.com <br/> contact@silicon.org.in</p>
                </div>
            </div></div>
        </div>
        <div className="row">
          <div className="col-6 ">
            <form ref={form} onSubmit={sendEmail} className="container">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1"><b>Name</b></label>
                <input
                  type="text"
                  name="user_name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Your good name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2"><b>Email</b></label>
                <input
                  type="email"
                  name="user_email"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Enter your email."
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1"><b>Subject</b></label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Write subject here."
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1"><b>Message</b></label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="message"
                  placeholder="Kindly tell us your concern !"
                />
              </div>
              <input type="submit" value="Send" className="btn btn-primary" />
            </form>
          </div>
          <div className="col-6 py-4 px-4">
            
           <Map/>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
