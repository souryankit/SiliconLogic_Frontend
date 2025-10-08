import { React, useState } from "react";
import { Link } from "react-router-dom";

function Homeclub() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div
      className="container club-section"
      style={{ marginTop: "40px", marginBottom: "20px" }}
    >
      <h2 className="subtitle" style={{ textAlign: "center" }}>
        Tech Clubs
      </h2>

      <div className="card">
        <div className="row" style={{ paddingTop: "10px", marginLeft: "3px" }}>
          <div className="col-4">
            <div
              className={
                toggleState === 1 ? "hometab1 active-tab1" : "hometab1"
              }
              onClick={() => toggleTab(1)}
              style={{ fontSize: "24px", padding: "5px", fontWeight: "bold" }}
            >
              <img
                src="/static_img/esd-logo.png"
                style={{ width: 45, height: 45 }}
              />{" "}
              ESD Club
            </div>
          </div>
          <div className="col-4">
            <div
              className={
                toggleState === 2 ? "hometab2 active-tab2" : "hometab2"
              }
              onClick={() => toggleTab(2)}
              style={{ fontSize: "24px", padding: "5px", fontWeight: "bold" }}
            >
              <img
                src="/static_img/iot-logo.png"
                style={{ width: 45, height: 45 }}
              />{" "}
              IOT Club{" "}
            </div>
          </div>
          <div className="col-4">
            <div
              className={
                toggleState === 3 ? "hometab3 active-tab3" : "hometab3"
              }
              onClick={() => toggleTab(3)}
              style={{ fontSize: "24px", padding: "5px", fontWeight: "bold" }}
            >
              {" "}
              <img
                src="/static_img/cns-logo.png"
                style={{ width: 45, height: 45 }}
              />{" "}
              CNS Club
            </div>
          </div>
        </div>

        <div
          className={
            toggleState === 1 ? "clubcontent active-content club-content" : "content"
          }
        >
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-5">
              <p className="club-name" style={{ fontSize: "38px", color: "red" }}>
                Electronics System Design Club
              </p>

              <p className="club-description">
                ESD club brings together a set of key EDA topics, enhancing
                the core knowledge, methodologies and infrastructure required to
                synthesis, verification, and manufacturing test of functional
                & reliable integrated circuits. It also includes PCB Designing
                where students learn to design and simulate electrical systems,
                from simple circuits to complex electronics.
              </p>
              <div>
                <Link to="/clubs" className="club-know-more">
                  Know More
                </Link>
              </div>
            </div>
            <div className="col-7">
              <div className="row club-image-container" style={{ marginTop: "50px", padding: "25px" }}>
                <div className="col-7" id="club-img1">
                  <div className="imgcard row">
                    <img
                      src="/static_img/esd-img5.webp"
                      style={{
                        width: "50vw",
                        height: "60vh",
                        borderEndStartRadius: "30px 20px",
                        borderStartEndRadius: "30px 20px",
                        borderStartStartRadius: "30px 20px",
                        borderEndEndRadius: "30px 20px",
                      }}
                    />
                  </div>
                </div>
                <div className="col-5" id="club-img0">
                  <div className="imgcard row">
                    <img
                      src="/static_img/esd-img6.jpg"
                      style={{
                        width: "20vw",
                        height: "26vh",
                        borderRadius: "8%",
                      }}
                    />
                  </div>
                  <div className="imgcard row">
                    <img
                      src="/static_img/esd-img2.jpg"
                      style={{
                        width: "20vw",
                        height: "26vh",
                        marginTop: "5vh",
                        borderRadius: "8%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            toggleState === 2 ? "clubcontent active-content club-content" : "content"
          }
        >
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-5">
              <p className="club-name" style={{ fontSize: "38px", color: "deepskyblue" }}>
                Internet of Things Club
              </p>
              <p className="club-description">
                IoT club deals with IoT devices and embedded systems. IoT is
                a network of physical objects, vehicles, buildings, and other
                items with built-in sensors, actuators, and software designed to
                collect and exchange data.
                <br /><br />
                An embedded system is a combination of computer hardware
                and software designed for a specific function. Embedded systems
                may also function within a larger system. The systems can be
                programmable or have fixed functionality.
              </p>
              <div>
                <Link to="/clubs" className="club-know-more">
                  Know More
                </Link>
              </div>
            </div>

            <div className="col-7" id="club-img2">
              <div className="row club-image-container">
                <div className="imgcard col">
                  <img
                    src="/static_img/iot-img72.png"
                    style={{
                      width: "40vw",
                      height: "55vh",
                      marginTop: "10vh",
                      marginLeft: "4vw",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            toggleState === 3 ? "clubcontent active-content club-content" : "content"
          }
        >
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-5">
              <p className="club-name" style={{ fontSize: "38px", color: "#31E6B8" }}>
                Communication and Networking System Club
              </p>
              <p className="club-description">
                This club focuses on communication system design, which encompasses
                a collection of individual transmission systems, telecommunication
                networks, relay stations and terminal equipment capable of
                interconnection and interoperation. 
                <br /><br />
                We discuss and design Wireless Communication Systems including antennas,
                transmitters and receivers, signal types, strength and degradation analysis
                with the help of proper hardware and software tools.
              </p>
              <div>
                <Link to="/clubs" className="club-know-more">
                  Know More
                </Link>
              </div>
            </div>

            <div className="col-7" id="club-img3">
              <div className="row club-image-container">
                <div className="imgcard col">
                  <img
                    src="/static_img/cns-img52.png"
                    style={{
                      width: "45vw",
                      height: "60vh",
                      marginTop: "8vh",
                      marginLeft: "2vw",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homeclub;
