import { React, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import ProjectCard from "./ProjectCards";

function PracticeList() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    // Tab styles for a more professional look
    const tabContainerStyle = {
        background: '#f8f9fa',
        borderRadius: '8px',
        padding: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        marginBottom: '25px'
    };

    const tabStyle = {
        padding: '12px 15px',
        cursor: 'pointer',
        borderRadius: '6px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        fontSize: '0.9rem'
    };

    const activeTabStyle = {
        ...tabStyle,
        background: '#4a69bd',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    };

    const inactiveTabStyle = {
        ...tabStyle,
        background: 'white',
        color: '#333',
        '&:hover': {
            background: '#f1f2f6'
        }
    };

    return (
        <div>
            <div className="container py-4" >
                {/* <h2 className='subtitle' ><b>Practice Tests</b></h2> */}
                <div className="row" >
                    <div className="col-12" style={tabContainerStyle}>
                        <div className="row tabp">
                            <div className="col">
                                <div
                                    style={toggleState === 1 ? activeTabStyle : inactiveTabStyle}
                                    onClick={() => toggleTab(1)}
                                    className={toggleState === 1 ? "shadow-sm" : ""}
                                > VLSI Design</div>
                            </div>
                            <div className="col">
                                <div
                                    style={toggleState === 2 ? activeTabStyle : inactiveTabStyle}
                                    onClick={() => toggleTab(2)}
                                    className={toggleState === 2 ? "shadow-sm" : ""}
                                > Circuit Design </div>
                            </div>
                            <div className="col">
                                <div
                                    style={toggleState === 3 ? activeTabStyle : inactiveTabStyle}
                                    onClick={() => toggleTab(3)}
                                    className={toggleState === 3 ? "shadow-sm" : ""}
                                > AI Tech </div>
                            </div>
                            <div className="col">
                                <div
                                    style={toggleState === 4 ? activeTabStyle : inactiveTabStyle}
                                    onClick={() => toggleTab(4)}
                                    className={toggleState === 4 ? "shadow-sm" : ""}
                                > Embedded/IoT </div>
                            </div>
                            <div className="col">
                                <div
                                    style={toggleState === 5 ? activeTabStyle : inactiveTabStyle}
                                    onClick={() => toggleTab(5)}
                                    className={toggleState === 5 ? "shadow-sm" : ""}
                                > Signal Process. </div>
                            </div>
                            <div className="col">
                                <div
                                    style={toggleState === 6 ? activeTabStyle : inactiveTabStyle}
                                    onClick={() => toggleTab(6)}
                                    className={toggleState === 6 ? "shadow-sm" : ""}
                                > Antenna </div>
                            </div>
                            <div className="col">
                                <div
                                    style={toggleState === 7 ? activeTabStyle : inactiveTabStyle}
                                    onClick={() => toggleTab(7)}
                                    className={toggleState === 7 ? "shadow-sm" : ""}
                                > Mobile Comm. </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col d-flex" >
                    <div className={toggleState === 1 ? "pcontent active-content" : "content"}>
                        <div className='row' style={{ marginBottom: "40px" }}>
                            <div className='col imgcard'> <ProjectCard category="VLSI Design" icon="https://cdn.pixabay.com/photo/2018/03/26/06/32/processor-3262049_1280.jpg" heading="Beginners Quiz L1" text="Test your basic knowledge of VLSI design concepts including semiconductors, transistors, and basic circuit layouts." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="VLSI Design" icon="https://cdn.pixabay.com/photo/2017/12/15/13/51/circuit-board-3021810_1280.jpg" heading="Intermediate VLSI L2" text="Challenge yourself with intermediate VLSI concepts, including layout optimization, power distribution, and timing analysis." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="VLSI Design" icon="https://cdn.pixabay.com/photo/2021/01/09/08/00/processor-5902206_1280.jpg" heading="Advanced VLSI Design" text="Master complex VLSI design challenges including nanometer technologies, low power design, and high-performance architectures." />
                            </div>
                        </div>
                    </div>

                    <div className={toggleState === 2 ? "pcontent active-content" : "content"}>
                        <div className='row' style={{ marginBottom: "40px" }}>
                            <div className='col imgcard'> <ProjectCard category="Circuit Design" icon="https://cdn.pixabay.com/photo/2017/02/01/10/14/circuit-2029398_1280.png" heading="Basic Circuits Quiz" text="Test your understanding of fundamental circuit components, Ohm's law, and basic circuit analysis techniques." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Circuit Design" icon="https://cdn.pixabay.com/photo/2017/04/10/08/08/motherboard-2217695_1280.jpg" heading="Analog Circuit Design" text="Challenge your knowledge of analog electronics including op-amps, filters, and amplifier configurations." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Circuit Design" icon="https://cdn.pixabay.com/photo/2018/02/28/17/32/technology-3188484_1280.jpg" heading="Digital Circuit Design" text="Test your skills in digital circuit design including combinational logic, sequential circuits, and state machines." />
                            </div>
                        </div>
                    </div>

                    <div className={toggleState === 3 ? "pcontent active-content" : "content"}>
                        <div className='row' style={{ marginBottom: "40px" }}>
                            <div className='col imgcard'> <ProjectCard category="AI Tech" icon="https://cdn.pixabay.com/photo/2019/04/16/13/37/ai-4131541_1280.jpg" heading="AI Fundamentals" text="Test your understanding of artificial intelligence basics including machine learning concepts and neural network fundamentals." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="AI Tech" icon="https://cdn.pixabay.com/photo/2018/05/15/23/05/robot-3404068_1280.jpg" heading="Machine Learning Basics" text="Challenge your knowledge of machine learning algorithms, training approaches, and model evaluation techniques." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="AI Tech" icon="https://cdn.pixabay.com/photo/2020/01/22/10/18/deep-learning-4784907_1280.jpg" heading="Deep Learning Concepts" text="Test your understanding of deep learning architectures, optimization algorithms, and implementation approaches." />
                            </div>
                        </div>
                    </div>

                    <div className={toggleState === 4 ? "pcontent active-content" : "content"}>
                        <div className='row' style={{ marginBottom: "40px" }}>
                            <div className='col imgcard'> <ProjectCard category="Embedded/IoT" icon="https://cdn.pixabay.com/photo/2019/09/29/22/06/microcontroller-4514284_1280.jpg" heading="Embedded Systems Basics" text="Test your knowledge of embedded system principles including microcontrollers, programming interfaces, and real-time constraints." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Embedded/IoT" icon="https://cdn.pixabay.com/photo/2016/06/13/07/59/pi-1453893_1280.jpg" heading="IoT Architecture Quiz" text="Challenge your understanding of IoT system design including connectivity options, protocols, and data management." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Embedded/IoT" icon="https://cdn.pixabay.com/photo/2017/04/23/08/38/arduino-2253347_1280.jpg" heading="Microcontroller Programming" text="Test your skills in embedded programming concepts, peripheral interfaces, and system optimization techniques." />
                            </div>
                        </div>
                    </div>

                    <div className={toggleState === 5 ? "pcontent active-content" : "content"}>
                        <div className='row' style={{ marginBottom: "40px" }}>
                            <div className='col imgcard'> <ProjectCard category="Signal Processing" icon="https://cdn.pixabay.com/photo/2019/03/03/20/22/waveform-4032393_1280.png" heading="DSP Fundamentals" text="Test your knowledge of digital signal processing basics including sampling, filtering, and frequency analysis." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Signal Processing" icon="https://cdn.pixabay.com/photo/2017/01/31/15/33/sound-2025064_1280.png" heading="Signal Analysis" text="Challenge your skills in analyzing signals in time and frequency domains, including transform techniques." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Signal Processing" icon="https://cdn.pixabay.com/photo/2016/06/13/06/21/digital-1453548_1280.png" heading="Filter Design" text="Test your understanding of digital filter design, implementation strategies, and performance analysis." />
                            </div>
                        </div>
                    </div>

                    <div className={toggleState === 6 ? "pcontent active-content" : "content"}>
                        <div className='row' style={{ marginBottom: "40px" }}>
                            <div className='col imgcard'> <ProjectCard category="Antenna" icon="https://cdn.pixabay.com/photo/2017/04/23/08/41/satellite-dish-2253422_1280.jpg" heading="Antenna Basics" text="Test your understanding of antenna fundamentals including radiation patterns, polarization, and impedance matching." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Antenna" icon="https://cdn.pixabay.com/photo/2012/04/01/19/05/antenna-24169_1280.png" heading="RF Propagation" text="Challenge your knowledge of radio frequency propagation mechanisms, path loss models, and link budgets." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Antenna" icon="https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_1280.jpg" heading="Array Antennas" text="Test your skills in understanding and analyzing antenna arrays, beamforming techniques, and MIMO systems." />
                            </div>
                        </div>
                    </div>

                    <div className={toggleState === 7 ? "pcontent active-content" : "content"}>
                        <div className='row' style={{ marginBottom: "40px" }}>
                            <div className='col imgcard'> <ProjectCard category="Mobile Communication" icon="https://cdn.pixabay.com/photo/2016/03/27/18/27/technology-1283624_1280.jpg" heading="Mobile Comm Basics" text="Test your knowledge of cellular communication principles, modulation techniques, and multiple access methods." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Mobile Communication" icon="https://cdn.pixabay.com/photo/2017/08/24/03/41/mobile-phone-2675425_1280.png" heading="Wireless Standards" text="Challenge your understanding of wireless communication standards including WiFi, Bluetooth, and cellular technologies." />
                            </div>
                            <div className='col imgcard'> <ProjectCard category="Mobile Communication" icon="https://cdn.pixabay.com/photo/2015/10/17/14/52/network-992864_1280.jpg" heading="5G Technology" text="Test your understanding of 5G network architecture, technologies, and use cases in modern communication systems." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dash-pagination">
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
};

export default PracticeList;
