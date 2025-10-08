import { React, useState } from "react";
//import "../component/style.css";
import useScrollAnimation from '../../hooks/useScrollAnimation';

function Clubs() {
  const [toggleState, setToggleState] = useState(1);
  
  // Use the scroll animation hook for fade-in effect
  useScrollAnimation();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="about-page">
      <div className="container club-section">
        <h2 className="subtitle" style={{ textAlign: "center" }}>OUR CLUBS</h2>

        <div className="row" style={{ paddingTop: "10px", marginLeft: "3px" }}>
          <div className="col-4">
            <div className={toggleState === 1 ? "hometab1 active-tab1" : "hometab1"}
              onClick={() => toggleTab(1)} style={{ fontSize: "24px", padding: "5px", fontWeight: "bold" }}><img src="/static_img/esd-logo.png" style={{ width: 45, height: 45 }} /> ESD Club</div>
          </div>
          <div className="col-4">
            <div className={toggleState === 2 ? "hometab2 active-tab2" : "hometab2"}
              onClick={() => toggleTab(2)} style={{ fontSize: "24px", padding: "5px", fontWeight: "bold" }}><img src="/static_img/iot-logo.png" style={{ width: 45, height: 45 }} /> IOT Club </div>
          </div>
          <div className="col-4">
            <div className={toggleState === 3 ? "hometab3 active-tab3" : "hometab3"}
              onClick={() => toggleTab(3)} style={{ fontSize: "24px", padding: "5px", fontWeight: "bold" }}> <img src="/static_img/cns-logo.png" style={{ width: 45, height: 45 }} /> CNS Club</div>
          </div>
        </div>

        <div className={toggleState === 1 ? "content active-content club-content" : "content"}>
          <div className="row" style={{ marginBottom: '60px' }}>
            <div className="col-5">
              <p><img src="/static_img/esd-logo.png" alt="ESD Club Logo" /></p>
              <p className="club-name" style={{ fontSize: "38px", color: "red" }}>Electronics System Design Club</p>
              <p className="club-description">
                ESD includes sub sections such as electronic
                components design, semi-conductor and product
                design. Bringing together a set of key EDA topics, this club
                enhance the core knowledge, software tools Vivado,
                algorithms, methodologies, and infrastructure required
                to optimize synthesis, verification, and manufacturing test
                of a functional & reliable integrated circuits.
                <br /><br />
                Along with this it also includes PCB Designing where students learn
                to design and simulate electrical systems, from simple circuits to complex electronics.
                Students improve electromechanical design with true electrical and mechanical
                collaboration with the help of right software tools and oversees the
                creation of printed circuit boards (PCB) used in most electronic devices, phones and computers.
              </p>
            </div>
            <div className="col-7">
              <div className="row club-image-container" style={{ marginTop: "50px", padding: "25px" }}>
                <div className="col-7">
                  <div className="imgcard row"><img src="/static_img/esd-img5.webp" style={
                    { width: "50vw", height: "60vh", borderEndStartRadius: "30px 20px", borderStartEndRadius: "30px 20px", borderStartStartRadius: "30px 20px", borderEndEndRadius: "30px 20px" }
                  } alt="ESD Club" /></div>
                </div>
                <div className="col-5">
                  <div className="imgcard row"><img src="/static_img/esd-img6.jpg" style={{ width: "20vw", height: "26vh", borderRadius: "8%" }} alt="ESD Project" /></div>
                  <div className="imgcard row" ><img src="/static_img/esd-img2.jpg" style={{ width: "20vw", height: "26vh", marginTop: "5vh", borderRadius: "8%" }} alt="ESD Project" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className={toggleState === 2 ? "content active-content club-content" : "content"}>
          <div className="row" style={{ marginBottom: '60px' }}>
            <div className="col-5">
              <p><img src="/static_img/iot-logo.png" alt="IoT Club Logo" /></p>
              <p className="club-name" style={{ fontSize: "38px", color: "deepskyblue" }}>Internet of Things Club</p>
              <p className="club-description">
                IoT is a network of physical objects, vehicles,
                buildings, and other items that have sensors, actuators,
                and software built in to collect and exchange data. It is
                predicted to have a significant impact on practically
                every industry, including manufacturing, healthcare,
                and transportation, and will enable new services and
                business models that would not have been conceivable
                without it, also known as the Fourth Industrial Revolution.
                <br /><br />
                An embedded system is a combination of computer
                hardware and software designed for a specific function.
                Embedded systems may also function within a larger
                system. The systems can be programmable or have a
                fixed functionality.
                <br /><br />
                Embedded systems are commonly found in consumer, home appliances
                industrial, automotive, medical, and aerospace and military applications.
                Here students work on microcontroller systems like (Arduino & Raspberry pi).
                With the help of projects, they learn how to integrate all distinct
                components of IoT: sensors/devices, connectivity, data processing, and a
                user interface and try to create a real-life solution.
              </p>
            </div>

            <div className="col-7">
              <div className="row club-image-container">
                <div className="imgcard col"><img src="/static_img/iot-img72.png" style={{ width: "40vw", height: "55vh", marginTop: "10vh", marginLeft: "4vw" }} alt="IoT Club" /></div>
              </div>
            </div>
          </div>
        </div>

        <div className={toggleState === 3 ? "content active-content club-content" : "content"}>
          <div className="row" style={{ marginBottom: '40px' }}>
            <div className="col-5">
              <p><img src="/static_img/cns-logo.png" alt="CNS Club Logo" /></p>
              <p className="club-name" style={{ fontSize: "38px", color: "#31E6B8" }}>Communication and Networking System Club</p>
              <p className="club-description">
                The field of communication includes a
                collection of individual transmission
                systems, telecommunication networks,
                relay stations and terminal equipment
                usually capable of interconnection and
                interoperation. The transmission model
                describe as a one-way, linear process in
                which a sender encodes a message and
                transmits it through a channel to a
                receiver who decodes it.
                <br /><br />
                Here we discuss and design Wireless Communication
                Systems (antenna, transmitter and
                receiver, signal types, signal strength and
                degradation) with the help of proper
                hardware and software tools.
                <br /><br />
                While in the context of networking systems it includes the analysis, design, implementation, and use of
                local, wide-area and mobile networks that link computers together.
                The Internet itself is a network that makes it
                feasible for nearly all computers in the world to communicate.
              </p>
            </div>

            <div className="col-7">
              <div className="row club-image-container">
                <div className="imgcard col"><img src="/static_img/cns-img52.png" style={{ width: "45vw", height: "60vh", marginTop: "4vh", marginLeft: "2vw" }} alt="CNS Club" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clubs;
